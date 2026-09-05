"use client";

import { useState } from "react";
import Navbar from "@/components/layout/NavBar";
import FaqHeader from "@/components/hoi-dap/FaqHeader";
import FaqMainContainer from "@/components/hoi-dap/FaqMainContainer";
import FaqContactSupport from "@/components/hoi-dap/FaqContactSupport";
import Footer from "@/components/layout/Footer";

export default function HoiDapPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://sgodata.com/hoi-dap.html#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Cloud Server tại SGO Việt Nam sử dụng hạ tầng ảo hóa gì? Có cam kết Uptime không?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "SGO Cloud Server hoạt động trên nền tảng ảo hóa toàn phần KVM tiên tiến nhất hiện nay, cam kết 100% tài nguyên CPU, RAM và SSD NVMe được cấp phát độc lập. Chúng tôi cam kết chỉ số Uptime 99.99% bằng hợp đồng SLA.",
        },
      },
      {
        "@type": "Question",
        "name": "Hệ thống CRM / ERP của SGO có thể tùy chỉnh theo ngành nghề đặc thù không?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Có. Hệ thống CRM / ERP SGO được xây dựng theo mô hình Module hóa linh hoạt, may đo chính xác các phân hệ kế toán, kho bãi, nhân sự, bán hàng phù hợp với quy trình vận hành của doanh nghiệp.",
        },
      },
      {
        "@type": "Question",
        "name": "Key bản quyền Windows, Office tại sgodata.com là loại gì? Có bị mất khi Reinstall Win không?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Tất cả sản phẩm key tại SGO là bản quyền chính hãng chuẩn Digital/Retail/MAK kích hoạt trực tiếp từ Server Microsoft, bảo hành 1 đổi 1 và hỗ trợ tái sử dụng khi cài lại Win.",
        },
      },
    ],
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-grow w-full">
        <FaqHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FaqMainContainer searchTerm={searchTerm} />
        <FaqContactSupport />
      </main>
      <Footer />
    </div>
  );
}
