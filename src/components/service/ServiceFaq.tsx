"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_BLUE } from "@/components/shared/FaqAccordion";

interface ServiceFaqProps {
  /** Code hoặc slug của provision (chính là segment trên URL). */
  code: string;
}

export default function ServiceFaq({ code }: ServiceFaqProps) {
  const { faqs, loading, error, isFallback } = useProvisionFaq(code);

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Câu Hỏi Thường Gặp
        </h2>
        <p className="text-slate-500 text-xs md:text-sm mt-2 font-light">
          Giải đáp những thắc mắc phổ biến trước khi bắt đầu triển khai dịch vụ.
        </p>
      </div>

      <FaqAccordion
        faqs={faqs}
        loading={loading}
        error={error}
        theme={FAQ_THEME_BLUE}
        isFallback={isFallback}
      />
    </section>
  );
}
