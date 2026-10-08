"use client";

import { useCallback, useMemo } from "react";
import {
  ProvisionItem,
  buildProvisionTree,
  isCategoryProvision,
  loadProvisions,
} from "@/shared/provision";
import { CACHE_TTL, cacheKey } from "@/lib/cache";
import { useAsyncData } from "./useAsyncData";

export interface UseProvisionsOptions {
  /** Chỉ lấy provision đang ACTIVE (dùng cho menu/navbar). Mặc định: false. */
  activeOnly?: boolean;
}

export interface UseProvisionsResult {
  /** Toàn bộ provision đã sort theo displayOrder. */
  provisions: ProvisionItem[];
  /** Chỉ nhóm dịch vụ (type="category"). */
  categories: ProvisionItem[];
  /** Chỉ provision không phải nhóm (type="service" | "service-filter" | null). */
  services: ProvisionItem[];
  /** Map parentId -> provision con. */
  tree: Map<string, ProvisionItem[]>;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Nguồn dữ liệu provision duy nhất cho toàn bộ UI.
 *
 * NavBar, Services (trang chủ), mọi component bảng giá và FAQ đều đi qua hook này.
 * Nhờ dùng chung cache key nên dù có bao nhiêu component gọi, `/api/v1/provision`
 * chỉ được tải đúng một lần cho mỗi TTL.
 *
 * Việc phân loại category/service tái sử dụng `isCategoryProvision()` trong
 * shared/provision.ts — nơi đã xử lý tương thích ngược với dữ liệu thiếu `type`.
 */
export function useProvisions(
  options: UseProvisionsOptions = {}
): UseProvisionsResult {
  const { activeOnly = false } = options;
  const key = cacheKey.provisions(activeOnly);

  const loader = useCallback(() => loadProvisions({ activeOnly }), [activeOnly]);

  const { data, loading, error, refresh } = useAsyncData<ProvisionItem[]>(
    key,
    loader,
    { ttl: CACHE_TTL.PROVISIONS, errorMessage: "Không thể tải danh sách dịch vụ" }
  );

  const provisions = useMemo(() => data ?? [], [data]);
  const tree = useMemo(() => buildProvisionTree(provisions), [provisions]);

  const categories = useMemo(
    () => provisions.filter((item) => isCategoryProvision(item)),
    [provisions]
  );

  const services = useMemo(
    () => provisions.filter((item) => !isCategoryProvision(item)),
    [provisions]
  );

  return { provisions, categories, services, tree, loading, error, refresh };
}

// Helper thuần nằm ở shared/provision.ts (tầng dữ liệu, không phụ thuộc React);
// re-export tại đây để component có thể import cùng chỗ với hook.
export {
  buildProvisionTree,
  findByCode,
  findByCodeOrSlug,
  findBySlug,
  getChildren,
} from "@/shared/provision";
