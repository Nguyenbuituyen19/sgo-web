"use client";

import { useEffect, useState } from "react";
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
  const [jsonLd, setJsonLd] = useState<string | null>(null);

  useEffect(() => {
    if (faqs.length > 0) {
      const data = generateFaqJsonLd(faqs, baseUrl, pageId);
      setJsonLd(JSON.stringify(data));
    }
  }, [faqs, baseUrl, pageId]);

  if (!jsonLd) return null;

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
  );
}
