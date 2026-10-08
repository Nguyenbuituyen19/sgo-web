"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/layout/NavBar";
import FaqHeader from "@/components/hoi-dap/FaqHeader";
import FaqApiContainer from "@/components/hoi-dap/FaqApiContainer";
import FaqContactSupport from "@/components/hoi-dap/FaqContactSupport";
import Footer from "@/components/layout/Footer";
import { useProvisions } from "@/hooks/useProvisions";
import { useMultipleContents } from "@/hooks/useProvisionContent";
import { generateFaqJsonLd } from "@/lib/faq-jsonld";

export default function HoiDapPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Lấy tất cả FAQs để tạo JSON-LD động
  const { provisions } = useProvisions();
  const provisionIds = useMemo(() => provisions.map((p) => p.id), [provisions]);
  const { contents } = useMultipleContents(provisionIds, 5);

  // Gom tất cả FAQs từ các provisions
  const allFaqs = useMemo(() => {
    const faqs = [];
    for (const content of contents.values()) {
      if (content?.faqs) {
        faqs.push(...content.faqs);
      }
    }
    return faqs;
  }, [contents]);

  // Tạo JSON-LD động từ FAQs thực tế
  const jsonLd = useMemo(() => {
    if (allFaqs.length === 0) return null;
    return generateFaqJsonLd(allFaqs, "https://sgodata.com/hoi-dap.html", "faq");
  }, [allFaqs]);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Navbar />
      <main className="flex-grow w-full">
        <FaqHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FaqApiContainer searchTerm={searchTerm} />
        <FaqContactSupport />
      </main>
      <Footer />
    </div>
  );
}
