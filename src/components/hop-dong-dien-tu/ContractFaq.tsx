"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_BLUE } from "@/components/shared/FaqAccordion";
import FaqJsonLd from "@/components/shared/FaqJsonLd";

interface ContractFaqProps {
  /** Mã (hoặc slug) provision cần hiển thị FAQ. */
  provisionCode?: string;
}

export default function ContractFaq({
  provisionCode = "hop-dong",
}: ContractFaqProps) {
  const { faqs, loading, error, isFallback } = useProvisionFaq(provisionCode);

  return (
    <>
      <FaqJsonLd 
        provisionCode={provisionCode} 
        baseUrl="https://sgodata.com/hop-dong-dien-tu.html"
        pageId="faq"
      />
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Giải Đáp Câu Hỏi Thường Gặp (FAQ)
          </h2>
          <p className="text-slate-500 text-xs md:text-sm mt-2 font-light">
            Tổng hợp thắc mắc hàng đầu về tính pháp lý và vận hành hệ thống hợp đồng điện tử
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
    </>
  );
}
