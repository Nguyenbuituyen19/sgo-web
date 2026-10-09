"use client";

import { FaqItem, useProvisionContentByCode } from "./useProvisionContent";

export type { FaqItem };

export interface UseProvisionFaqResult {
  faqs: FaqItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  /** Retained for compatibility; FAQs are now sourced only from the backend. */
  isFallback: boolean;
}

/**
 * FAQ của một dịch vụ lấy từ API backend, tra theo code HOẶC slug.
 * Khi backend chưa có FAQs, giao diện hiển thị trạng thái cập nhật.
 */
export function useProvisionFaq(provisionCode: string): UseProvisionFaqResult {
  const { content, loading, error, refresh } =
    useProvisionContentByCode(provisionCode);

  return {
    faqs: content?.faqs ?? [],
    loading,
    error,
    refresh,
    isFallback: false,
  };
}
