"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, {
  FAQ_THEME_PURPLE,
} from "@/components/shared/FaqAccordion";
import FaqJsonLd from "@/components/shared/FaqJsonLd";

interface WebFaqProps {
  /** Mã (hoặc slug) provision cần hiển thị FAQ. */
  provisionCode?: string;
}

export default function WebFaq({ provisionCode = "web" }: WebFaqProps) {
  const { faqs, loading, error, isFallback } = useProvisionFaq(provisionCode);

  return (
    <>
      <FaqJsonLd 
        provisionCode={provisionCode} 
        baseUrl="https://sgodata.com/web.html"
        pageId="faq"
      />
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Giải Đáp Câu Hỏi Thường Gặp
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-light">
            Tổng hợp những thắc mắc phổ biến của đối tác trước khi bắt đầu thiết kế web tại SGO
          </p>
        </div>

        <FaqAccordion
          faqs={faqs}
          loading={loading}
          error={error}
          theme={FAQ_THEME_PURPLE}
          isFallback={isFallback}
        />
      </section>
    </>
  );
}
