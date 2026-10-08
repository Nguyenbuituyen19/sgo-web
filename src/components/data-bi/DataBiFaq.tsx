"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_PURPLE } from "@/components/shared/FaqAccordion";

export default function DataBiFaq() {
  const { faqs, loading, error, isFallback } = useProvisionFaq("erp");

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            GIẢI ĐÁP THẮC MẮC
          </span>
          <h2 className="text-3xl font-bold text-slate-900">Câu Hỏi Thường Gặp</h2>
          <p className="text-slate-600 text-xs md:text-sm font-light">
            Những thắc mắc phổ biến của doanh nghiệp khi bắt đầu chuẩn hóa hạ tầng dữ liệu và ứng dụng BI.
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
      </div>
    </section>
  );
}
