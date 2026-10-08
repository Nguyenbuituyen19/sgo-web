"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_BLUE } from "@/components/shared/FaqAccordion";

export default function InfraFaq() {
  const { faqs, loading, error, isFallback } = useProvisionFaq("ha-tang");

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          <i className="fa-solid fa-circle-question text-cyan-600 mr-2"></i>
          Giải đáp thắc mắc hạ tầng
        </h3>
      </div>

      <FaqAccordion
        faqs={faqs}
        loading={loading}
        error={error}
        theme={FAQ_THEME_BLUE}
        isFallback={isFallback}
        loadingText="Đang tải câu hỏi thường gặp..."
        emptyText="Đang cập nhật câu hỏi thường gặp."
      />
    </section>
  );
}
