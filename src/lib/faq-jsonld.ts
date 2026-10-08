import { FaqItem } from "@/hooks/useProvisionContent";

/**
 * Sinh JSON-LD cho FAQPage từ danh sách câu hỏi.
 * Dùng chung cho cả UI và SEO markup để đảm bảo đồng bộ.
 */
export function generateFaqJsonLd(
  faqs: FaqItem[],
  baseUrl: string,
  pageId = "faq"
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}#${pageId}`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
