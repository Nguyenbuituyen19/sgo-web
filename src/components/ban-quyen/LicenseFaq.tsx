"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_PURPLE } from "@/components/shared/FaqAccordion";
import FaqJsonLd from "@/components/shared/FaqJsonLd";

export default function LicenseFaq() {
  const { faqs, loading, error, isFallback } =
    useProvisionFaq("software-licensing");

  return (
    <>
      <FaqJsonLd
        provisionCode="software-licensing"
        baseUrl="https://sgodata.com/ban-quyen.html"
      />
      <section id="faq" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="mt-4 text-lg text-slate-600 font-light">
              Giải đáp thắc mắc về sản phẩm và chính sách bản quyền tại
              sgodata.com.
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
    </>
  );
}
