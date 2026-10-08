"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_PURPLE } from "@/components/shared/FaqAccordion";

export default function FAQ() {
  const { faqs, loading, error, isFallback } = useProvisionFaq("contact");

  return (
    <section id="ho-tro" className="max-w-4xl mx-auto space-y-8 mb-8">
      <div className="text-center space-y-3">
        <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
          Hỗ trợ khách hàng
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Câu Hỏi Thường Gặp
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed font-light">
          Tổng hợp những thắc mắc phổ biến của các chủ doanh nghiệp khi tìm hiểu
          và ứng dụng hệ sinh thái số của SGO Việt Nam.
        </p>
      </div>

      <FaqAccordion
        faqs={faqs}
        loading={loading}
        error={error}
        theme={FAQ_THEME_PURPLE}
        isFallback={isFallback}
        loadingText="Đang tải câu hỏi thường gặp..."
        emptyText="Đang cập nhật câu hỏi thường gặp."
      />
    </section>
  );
}
