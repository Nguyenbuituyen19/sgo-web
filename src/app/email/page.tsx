import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import EmailHeader from "@/components/email/EmailHeader";
import EmailFeatures from "@/components/email/EmailFeatures";
import EmailPricing from "@/components/email/EmailPricing";
import EmailForm from "@/components/email/EmailForm";
import EmailFaq from "@/components/email/EmailFaq";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Email Hosting & Email Server Doanh Nghiệp Bảo Mật Cao - SGO Việt Nam",
  description:
    "Giải pháp Email Hosting và Email Server doanh nghiệp chuyên nghiệp từ SGO Việt Nam. Tên miền riêng, IP sạch độc lập, chống spam tối ưu, bảo mật SPF, DKIM, DMARC.",
  keywords: [
    "email doanh nghiệp",
    "email hosting",
    "email server riêng",
    "email theo tên miền",
    "chống spam email",
    "sgo việt nam",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/email-doanh-nghiep.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/email-doanh-nghiep.html",
    title: "Email Hosting & Email Server Doanh Nghiệp - SGO Việt Nam",
    description:
      "Tối ưu tỷ lệ thư vào Inbox lên 99%, chống spam thông minh, sử dụng tên miền riêng bảo mật cao từ SGO Việt Nam.",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function EmailDoanhNghiepPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://sgodata.com/email-doanh-nghiep.html#product",
        "name": "Dịch vụ Email Hosting & Email Server Doanh Nghiệp SGO",
        "image": "https://sgodata.com/favicon-sgo.png",
        "description":
          "Giải pháp Email tên miền công ty chuyên nghiệp sử dụng dải IP sạch, bộ lọc Spam AI đa tầng và bảo mật SPF/DKIM/DMARC.",
        "brand": {
          "@type": "Brand",
          "name": "SGO Việt Nam",
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "VND",
          "lowPrice": "99000",
          "highPrice": "299000",
          "priceStock": "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://sgodata.com/email-doanh-nghiep.html#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Làm sao để email gửi đi không bị rơi vào hộp thư rác (Spam)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "SGO Việt Nam cấu hình đầy đủ các bản ghi xác thực uy tín gồm SPF, DKIM và DMARC. Kết hợp với dải IP sạch độc lập giúp email luôn vào thẳng Inbox.",
            },
          },
          {
            "@type": "Question",
            "name": "Tôi có thể cấu hình email trên điện thoại và phần mềm Outlook không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Hoàn toàn được. Dịch vụ Email của SGO hỗ trợ đầy đủ các giao thức IMAP/POP3 tiêu chuẩn đồng bộ mượt mà trên Outlook, Apple Mail và điện thoại.",
            },
          },
          {
            "@type": "Question",
            "name": "SGO có hỗ trợ chuyển toàn bộ dữ liệu email từ nhà cung cấp cũ không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Đội ngũ kỹ thuật sẽ hỗ trợ trọn gói việc di chuyển toàn bộ hòm thư và dữ liệu cũ sang hạ tầng mới miễn phí.",
            },
          },
        ],
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
        <EmailHeader />
        <main className="max-w-7xl mx-auto px-4 py-16 flex-grow w-full">
        <EmailFeatures />
        <EmailPricing />
        <EmailForm />
        <EmailFaq />
      </main>
      <Footer />
    </div>
  );
}
