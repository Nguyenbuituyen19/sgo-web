"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_BLUE } from "@/components/shared/FaqAccordion";
import FaqJsonLd from "@/components/shared/FaqJsonLd";

export default function EmailFaq() {
  const { faqs, loading, error, isFallback } = useProvisionFaq("email");

  return (
    <>
      <FaqJsonLd
        provisionCode="email"
        baseUrl="https://sgodata.com/email-doanh-nghiep.html"
      />
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            <i className="fa-solid fa-circle-question text-amber-600 mr-2"></i>
            Câu hỏi thường gặp về Email Doanh Nghiệp
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
    </>
  );
}
