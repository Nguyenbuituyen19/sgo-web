"use client";

import { FaqItem, useProvisionContentByCode } from "./useProvisionContent";
import { getDefaultFaqs } from "@/data/default-faqs";

export type { FaqItem };

export interface UseProvisionFaqResult {
  faqs: FaqItem[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
  /** True nếu đang dùng default FAQs (backend chưa có dữ liệu). */
  isFallback: boolean;
}

/**
 * FAQ của một dịch vụ, tra theo code HOẶC slug.
 *
 * Ưu tiên lấy từ API backend (`provision_details`). Nếu backend chưa có dữ liệu
 * (mảng rỗng hoặc lỗi), tự động fallback về danh sách FAQ mặc định được định nghĩa
 * trong `src/data/default-faqs.ts` để đảm bảo UI luôn có nội dung hiển thị.
 */
export function useProvisionFaq(provisionCode: string): UseProvisionFaqResult {
  const { content, loading, error, refresh } =
    useProvisionContentByCode(provisionCode);

  const apiFaqs = content?.faqs ?? [];
  const defaultFaqs = getDefaultFaqs(provisionCode);
  const isFallback = apiFaqs.length === 0 && defaultFaqs.length > 0;
  const faqs = isFallback ? defaultFaqs : apiFaqs;

  return {
    faqs,
    loading,
    error: isFallback ? null : error,
    refresh,
    isFallback,
  };
}
