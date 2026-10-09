"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";
import { generateFaqJsonLd } from "@/lib/faq-jsonld";

interface FaqJsonLdProps {
  provisionCode: string;
  baseUrl?: string;
  pageId?: string;
}

/**
 * Component render JSON-LD cho FAQPage dựa trên dữ liệu thực tế đang hiển thị.
 * Đảm bảo SEO markup luôn đồng bộ với nội dung UI (kể cả khi dùng fallback).
 */
export default function FaqJsonLd({
  provisionCode,
  baseUrl = "https://sgodata.com",
  pageId = "faq",
}: FaqJsonLdProps) {
  const { faqs } = useProvisionFaq(provisionCode);

  if (faqs.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateFaqJsonLd(faqs, baseUrl, pageId)),
      }}
    />
  );
}
