"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_BLUE } from "@/components/shared/FaqAccordion";
import FaqJsonLd from "@/components/shared/FaqJsonLd";

export default function CloudFaq() {
  const { faqs, loading, error, isFallback } = useProvisionFaq("ha-tang");

  return (
    <>
      <FaqJsonLd
        provisionCode="ha-tang"
        baseUrl="https://sgodata.com/cloud-server.html"
      />
      <section id="faq" className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Câu Hỏi Thường Gặp Về Cloud Server
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-light">
            Giải đáp các thắc mắc phổ biến trước khi đăng ký khởi tạo máy chủ
            tại SGO Việt Nam
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
