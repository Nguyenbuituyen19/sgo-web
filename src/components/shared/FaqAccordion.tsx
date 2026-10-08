"use client";

import { FaqItem } from "@/hooks/useProvisionContent";

/**
 * Accordion FAQ dùng chung.
 *
 * Chỉ sở hữu *thân* khối FAQ: 4 trạng thái (loading / error / empty / có dữ liệu)
 * và cấu trúc `<details>/<summary>`. Tiêu đề section vẫn nằm ở trang để mỗi dịch vụ
 * giữ được câu chữ riêng.
 *
 * Cấu trúc này trước đây bị lặp lại ở WebFaq, ContractFaq, VrFaq, LicenseFaq,
 * DataBiFaq, EmailFaq, CloudFaq, InfraFaq và FAQ trang chủ.
 */
export interface FaqAccordionTheme {
  /** Lưới/sắp xếp danh sách FAQ. */
  grid: string;
  /** Class của mỗi mục FAQ (bao gồm màu hover theo thương hiệu). */
  card: string;
  summary: string;
  /** Khối tròn chứa icon mở/đóng. */
  toggle: string;
  answer: string;
  stateWrapper: string;
  stateIcon: string;
  stateText: string;
  errorText: string;
  emptyText: string;
}

/** Preset tím, lưới 2 cột — dùng cho trang Thiết kế Website. */
export const FAQ_THEME_PURPLE: FaqAccordionTheme = {
  grid: "max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 items-start",
  card:
    "group bg-white rounded-2xl border border-slate-200 shadow-sm p-5 cursor-pointer transition-all hover:border-purple-300 [&_summary::-webkit-details-marker]:hidden",
  summary:
    "flex justify-between items-center gap-4 font-bold text-sm text-slate-900 list-none",
  toggle:
    "text-purple-600 shrink-0 bg-purple-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-purple-600 group-open:text-white transition-colors duration-200",
  answer:
    "mt-3 text-xs text-slate-500 leading-relaxed font-light pt-3 border-t border-slate-100",
  stateWrapper: "text-center py-10",
  stateIcon: "fa-solid fa-spinner fa-spin text-3xl text-purple-600",
  stateText: "mt-4 text-slate-500 text-sm",
  errorText: "text-center py-10 text-red-500 text-sm",
  emptyText: "text-center py-10 text-slate-500 text-sm",
};

/** Preset xanh dương, lưới 2 cột — dùng cho trang Hợp đồng điện tử. */
export const FAQ_THEME_BLUE: FaqAccordionTheme = {
  ...FAQ_THEME_PURPLE,
  card:
    "group bg-white rounded-2xl border border-slate-200 shadow-sm p-5 cursor-pointer transition-all hover:border-blue-300 [&_summary::-webkit-details-marker]:hidden",
  toggle:
    "text-blue-600 shrink-0 bg-blue-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-blue-600 group-open:text-white transition-colors duration-200",
  stateIcon: "fa-solid fa-spinner fa-spin text-3xl text-blue-600",
};

export interface FaqAccordionProps {
  faqs: FaqItem[];
  loading: boolean;
  error: string | null;
  theme?: FaqAccordionTheme;
  loadingText?: string;
  emptyText?: string;
  /** Hiển thị badge nhỏ khi đang dùng default FAQs. */
  isFallback?: boolean;
}

export default function FaqAccordion({
  faqs,
  loading,
  error,
  theme = FAQ_THEME_PURPLE,
  loadingText = "Đang tải câu hỏi thường gặp...",
  emptyText = "Đang cập nhật câu hỏi thường gặp.",
  isFallback = false,
}: FaqAccordionProps) {
  if (loading) {
    return (
      <div className={theme.stateWrapper}>
        <i className={theme.stateIcon}></i>
        <p className={theme.stateText}>{loadingText}</p>
      </div>
    );
  }

  if (error) {
    return <div className={theme.errorText}>{error}</div>;
  }

  if (faqs.length === 0) {
    return <div className={theme.emptyText}>{emptyText}</div>;
  }

  return (
    <div className={theme.grid}>
      {isFallback && (
        <div className="col-span-full text-center mb-4">
          <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium">
            Đang hiển thị nội dung mẫu
          </span>
        </div>
      )}
      {faqs.map((faq, index) => (
        <details key={faq.id || index} className={theme.card}>
          <summary className={theme.summary}>
            <span>{faq.q}</span>
            <span className={theme.toggle}>
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className={theme.answer}>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
