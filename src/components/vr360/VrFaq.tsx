"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_BLUE } from "@/components/shared/FaqAccordion";
import FaqJsonLd from "@/components/shared/FaqJsonLd";

export default function VrFaq() {
  const { faqs, loading, error, isFallback } = useProvisionFaq("vr360");

  return (
    <>
      <FaqJsonLd 
        provisionCode="vr360" 
        baseUrl="https://sgodata.com/vr360.html"
        pageId="faq"
      />
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Giải Đáp Thắc Mắc
          </h3>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-light">
            Những câu hỏi phổ biến từ các chủ doanh nghiệp khi triển khai Tour thực tế ảo VR360.
          </p>
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
    </>
  );
}
