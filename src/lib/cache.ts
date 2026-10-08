/**
 * Cache trong bộ nhớ (in-memory) dùng chung cho toàn bộ data layer.
 *
 * Module này chỉ giữ state của tiến trình hiện tại: trên browser là tab hiện tại,
 * trên server là tiến trình Node của Next.js. Vì vậy cache chỉ mang tính tăng tốc —
 * mọi hook đều phải chịu được việc cache trống (không có cache thì fetch bình thường).
 */

interface CacheEntry<T> {
  data: T;
  /** Thời điểm ghi cache (epoch ms). */
  timestamp: number;
  /** Thời gian sống tính bằng ms. */
  ttl: number;
}

export class SimpleCache {
  private store = new Map<string, CacheEntry<unknown>>();

  /** Đọc dữ liệu còn hạn. Trả về `null` nếu chưa có hoặc đã hết hạn. */
  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.store.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /** Ghi dữ liệu kèm TTL (ms). */
  set<T>(key: string, data: T, ttl: number): void {
    this.store.set(key, { data, timestamp: Date.now(), ttl });
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /** Xoá mọi entry có prefix — dùng để invalidate theo nhóm. */
  deleteByPrefix(prefix: string): void {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) this.store.delete(key);
    }
  }
}

export const cache = new SimpleCache();

/** TTL chuẩn hoá cho từng loại dữ liệu (ms). */
export const CACHE_TTL = {
  /** Danh sách provision: ít thay đổi. */
  PROVISIONS: 5 * 60 * 1000,
  /** Bảng giá: thay đổi thường xuyên hơn. */
  SERVICES: 60 * 1000,
  /** Nội dung landing page + FAQ. */
  CONTENT: 10 * 60 * 1000,
} as const;

/** Key cache tập trung một chỗ để tránh gõ sai ở nhiều hook. */
export const cacheKey = {
  provisions: (activeOnly: boolean) => (activeOnly ? "provisions:active" : "provisions:all"),
  pricing: (provisionCode: string) => `pricing:${provisionCode.toLowerCase()}`,
  content: (provisionId: string) => `content:${provisionId}`,
} as const;
