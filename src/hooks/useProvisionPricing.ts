"use client";

import { useCallback, useMemo } from "react";
import {
  ProvisionServiceItem,
  RawProvisionService,
  findByCodeOrSlug,
  getProvisionServicesByProvision,
  normalizeProvisionServices,
  parseFeatures,
} from "@/shared/provision";
import { CACHE_TTL, cacheKey } from "@/lib/cache";
import { useAsyncData } from "./useAsyncData";
import { useProvisions } from "./useProvisions";

export type { ProvisionServiceItem };
export { parseFeatures };

export interface UseProvisionPricingResult {
  /** Bảng giá đã chuẩn hoá, sắp xếp theo displayOrder rồi giá tăng dần. */
  services: ProvisionServiceItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Bảng giá của một dịch vụ, tra theo code HOẶC slug.
 *
 * Sử dụng endpoint backend mới `/api/v1/provision-services/provision/{id}`:
 * - Backend tự động kiểm tra type của provision
 * - Nếu là "category": trả về tất cả service từ subtree (con/cháu) qua recursive CTE
 * - Nếu là "service" hoặc "service-filter": chỉ trả service trực tiếp
 *
 * Frontend chỉ cần gọi 1 endpoint duy nhất, không cần xử lý logic phức tạp ở client.
 */
export function useProvisionPricing(
  provisionCode: string
): UseProvisionPricingResult {
  const {
    provisions,
    loading: provisionsLoading,
    error: provisionsError,
  } = useProvisions();

  const target = useMemo(
    () => (provisionCode ? findByCodeOrSlug(provisions, provisionCode) : undefined),
    [provisions, provisionCode]
  );

  const loader = useCallback(async () => {
    if (!target) return [];

    const res = await getProvisionServicesByProvision(target.id);
    if (!res.success || !res.data) {
      throw new Error(res.message || "Không thể tải bảng giá dịch vụ");
    }

    // Chuẩn hóa và sắp xếp danh sách service
    return normalizeProvisionServices(res.data as RawProvisionService[]);
  }, [target]);

  // Chỉ gọi khi đã resolve được provision đích.
  const key = target ? cacheKey.pricing(provisionCode) : null;

  const {
    data,
    loading: servicesLoading,
    error: servicesError,
    refresh,
  } = useAsyncData<ProvisionServiceItem[]>(key, loader, {
    ttl: CACHE_TTL.SERVICES,
    errorMessage: "Không thể tải bảng giá dịch vụ",
  });

  return {
    services: data ?? [],
    loading: provisionsLoading || servicesLoading,
    error: provisionsError ?? servicesError,
    refresh,
  };
}
