"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cache } from "@/lib/cache";

/**
 * Trạng thái async chuẩn dùng chung cho mọi hook đọc dữ liệu provision.
 *
 * Trước đây mỗi hook tự viết lại vòng `useState(loading) + useEffect + isMounted`,
 * dẫn tới 4 bản sao của cùng một state machine và cùng một lỗi rò rỉ (setState sau
 * khi unmount). Hook này là nơi duy nhất sở hữu vòng đời đó.
 */
export interface AsyncResource<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  /** Bỏ qua cache và gọi lại API. */
  refresh: () => void;
}

export interface UseAsyncDataOptions {
  /** Thời gian sống của cache (ms). */
  ttl: number;
  /** Thông báo lỗi hiển thị cho người dùng khi loader ném lỗi. */
  errorMessage?: string;
}

/**
 * Đọc dữ liệu bất đồng bộ có cache.
 *
 * - `null` cho `key` hoặc `loader` nghĩa là "chưa đủ dữ kiện để gọi" — hook ở trạng
 *   thái nghỉ, không phát sinh request (ví dụ chưa resolve được provisionId).
 * - Cache được đọc trong effect (không đọc lúc khởi tạo state) để HTML render trên
 *   server luôn khớp với lần render đầu ở client, tránh lệch hydration.
 * - Trong thời gian TTL, lần mount sau không gọi lại API.
 * - Kết quả của một lần chạy cũ không bao giờ ghi đè lần chạy mới hơn.
 */
export function useAsyncData<T>(
  key: string | null,
  loader: (() => Promise<T>) | null,
  options: UseAsyncDataOptions
): AsyncResource<T> {
  const { ttl, errorMessage } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  // Giữ loader trong ref để effect chỉ phụ thuộc `key`, không phụ thuộc danh tính
  // của closure (tránh fetch lại vô ích mỗi lần component cha render).
  const loaderRef = useRef(loader);
  useEffect(() => {
    loaderRef.current = loader;
  });

  const requestIdRef = useRef(0);

  useEffect(() => {
    const activeLoader = loaderRef.current;
    if (key === null || activeLoader === null) return;

    // Lần chạy mới nhất thắng: bỏ qua kết quả đến muộn của key/nonce cũ.
    const requestId = ++requestIdRef.current;
    const isCurrent = () => requestIdRef.current === requestId;

    // Toàn bộ setState nằm trong callback bất đồng bộ (không gọi đồng bộ trong
    // thân effect) để tránh cascading render.
    void (async () => {
      const cached = cache.get<T>(key);

      if (cached !== null) {
        if (!isCurrent()) return;
        setData(cached);
        setError(null);
        setLoading(false);
        return;
      }

      if (!isCurrent()) return;
      setLoading(true);
      setError(null);

      try {
        const result = await activeLoader();
        if (!isCurrent()) return;
        cache.set(key, result, ttl);
        setData(result);
      } catch (err: unknown) {
        if (!isCurrent()) return;
        setError(
          err instanceof Error ? err.message : errorMessage ?? "Lỗi không xác định"
        );
      } finally {
        if (isCurrent()) setLoading(false);
      }
    })();
  }, [key, nonce, ttl, errorMessage]);

  const refresh = useCallback(() => {
    if (key !== null) cache.delete(key);
    setNonce((n) => n + 1);
  }, [key]);

  // Chưa đủ dữ kiện để gọi thì trạng thái nghỉ được suy ra ngay khi render, thay vì
  // setState trong effect.
  const isIdle = key === null || loader === null;

  return {
    data: isIdle ? null : data,
    loading: isIdle ? false : loading,
    error: isIdle ? null : error,
    refresh,
  };
}
