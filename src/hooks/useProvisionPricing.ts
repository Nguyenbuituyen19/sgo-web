import { useState, useEffect } from "react";
import { request } from "@/shared/client";
import { getProvisions, ProvisionItem } from "@/shared/provision";

export interface ProvisionServiceItem {
  id: string;
  provisionId: string;
  name: string;
  price: number;
  featuresIncluded?: unknown;
  status?: string;
}

export function parseFeatures(featuresIncluded: unknown): string[] {
  if (!featuresIncluded) return [];

  if (Array.isArray(featuresIncluded)) {
    return featuresIncluded.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof featuresIncluded === "string") {
    try {
      const parsed = JSON.parse(featuresIncluded);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return featuresIncluded
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  if (typeof featuresIncluded === "object" && featuresIncluded !== null) {
    return Object.values(featuresIncluded)
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  return [];
}

export function useProvisionPricing(provisionCode: string) {
  const [services, setServices] = useState<ProvisionServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPricing() {
      setLoading(true);
      setError(null);

      try {
        // 1. Lấy danh sách provision để tìm ID của provision theo code
        const provisionsRes = await getProvisions();
        let targetProvisionId: string | undefined;

        if (provisionsRes.success && provisionsRes.data) {
          const matched = provisionsRes.data.find(
            (p: ProvisionItem) => p.code?.toLowerCase() === provisionCode.toLowerCase()
          );
          if (matched) {
            targetProvisionId = matched.id;
          }
        }

        let fetchedServices: ProvisionServiceItem[] = [];

        // 2. Tải dịch vụ theo provisionId nếu tìm thấy
        if (targetProvisionId) {
          const servicesRes = await request<ProvisionServiceItem[]>({
            method: "GET",
            url: `/api/v1/provision-services/provision/${targetProvisionId}`,
          });

          if (servicesRes.success && servicesRes.data) {
            fetchedServices = servicesRes.data;
          }
        }

        // 3. Fallback: Nếu chưa có dịch vụ theo provisionId, lấy toàn bộ danh sách dịch vụ
        if (fetchedServices.length === 0) {
          const allServicesRes = await request<ProvisionServiceItem[]>({
            method: "GET",
            url: "/api/v1/provision-services",
          });

          if (allServicesRes.success && allServicesRes.data) {
            if (targetProvisionId) {
              fetchedServices = allServicesRes.data.filter(
                (s) => s.provisionId === targetProvisionId
              );
            }
            if (fetchedServices.length === 0) {
              fetchedServices = allServicesRes.data;
            }
          }
        }

        if (isMounted) {
          setServices(fetchedServices);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Không thể tải danh sách bảng giá"
          );
          setLoading(false);
        }
      }
    }

    if (provisionCode) {
      fetchPricing();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [provisionCode]);

  return { services, loading, error };
}
