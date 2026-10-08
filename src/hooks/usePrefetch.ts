"use client";

import { useCallback } from "react";
import {
  ProvisionItem,
  RawProvisionService,
  findByCodeOrSlug,
  getProvisionServicesByProvision,
  loadProvisions,
  normalizeProvisionServices,
} from "@/shared/provision";
import { CACHE_TTL, cache, cacheKey } from "@/lib/cache";

/**
 * Làm nóng cache trước khi người dùng thực sự mở trang.
 *
 * Dùng khi hover/focus vào link dịch vụ: dữ liệu đã nằm sẵn trong cache nên trang
 * đích render gần như tức thì. Mọi lỗi đều bị nuốt (chỉ log) vì prefetch là tối ưu
 * hoá — thất bại không được ảnh hưởng tới luồng chính.
 *
 * Sử dụng endpoint backend mới `/api/v1/provision-services/provision/{id}`:
 * Backend tự động xử lý logic lấy service từ subtree cho category.
 */
export function usePrefetch() {
  const prefetchProvisions = useCallback(async (): Promise<ProvisionItem[] | null> => {
    try {
      return await loadProvisions();
    } catch (err: unknown) {
      console.warn("[prefetch] provisions failed:", err);
      return null;
    }
  }, []);

  const prefetchPricing = useCallback(
    async (provisionCode: string): Promise<void> => {
      if (!provisionCode) return;

      const key = cacheKey.pricing(provisionCode);
      if (cache.has(key)) return;

      const provisions = await prefetchProvisions();
      if (!provisions) return;

      const target = findByCodeOrSlug(provisions, provisionCode);
      if (!target) return;

      try {
        const res = await getProvisionServicesByProvision(target.id);
        if (!res.success || !res.data) return;

        // Chuẩn hóa và sắp xếp danh sách service
        const normalized = normalizeProvisionServices(res.data as RawProvisionService[]);
        cache.set(key, normalized, CACHE_TTL.SERVICES);
      } catch (err: unknown) {
        console.warn(`[prefetch] pricing for ${provisionCode} failed:`, err);
      }
    },
    [prefetchProvisions]
  );

  return { prefetchProvisions, prefetchPricing };
}
