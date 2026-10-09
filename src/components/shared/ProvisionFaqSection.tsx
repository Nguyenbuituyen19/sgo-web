"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import FaqAccordion, { FAQ_THEME_BLUE } from "@/components/shared/FaqAccordion";
import FaqJsonLd from "@/components/shared/FaqJsonLd";

interface ProvisionFaqSectionProps {
  provisionCode: string;
  title: string;
  pageUrl: string;
}

export default function ProvisionFaqSection({
  provisionCode,
  title,
  pageUrl,
}: ProvisionFaqSectionProps) {
  const { faqs, loading, error } = useProvisionFaq(provisionCode);

  return (
    <>
      <FaqJsonLd
        provisionCode={provisionCode}
        baseUrl={pageUrl}
        pageId="faq"
      />
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>
        <FaqAccordion
          faqs={faqs}
          loading={loading}
          error={error}
          theme={FAQ_THEME_BLUE}
          emptyText="Đang cập nhật câu hỏi thường gặp."
        />
      </section>
    </>
  );
}
