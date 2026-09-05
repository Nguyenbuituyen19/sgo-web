import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import ErpHeader from "@/components/erp/ErpHeader";
import ErpModules from "@/components/erp/ErpModules";
import ErpWhy from "@/components/erp/ErpWhy";
import ErpForm from "@/components/erp/ErpForm";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Giải Pháp Quản Trị Doanh Nghiệp Toàn Diện ERP - SGO Việt Nam",
  description:
    "Hệ thống phần mềm quản trị doanh nghiệp SGO ERP hợp nhất mọi quy trình vận hành từ Tài chính, Nhân sự, Kho vận đến Kinh doanh trên một nền tảng duy nhất. May đo theo từng ngành nghề.",
  keywords: [
    "phần mềm erp",
    "giải pháp erp doanh nghiệp",
    "quản trị doanh nghiệp erp",
    "phần mềm quản lý tổng thể",
    "sgo erp",
    "sgo việt nam",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/erp.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/erp.html",
    title: "Giải Pháp Quản Trị Doanh Nghiệp Toàn Diện ERP - SGO Việt Nam",
    description:
      "Hệ thống phần mềm quản trị doanh nghiệp SGO ERP hợp nhất mọi quy trình vận hành từ Tài chính, Nhân sự, Kho vận đến Kinh doanh...",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function ErpPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sgodata.com/erp.html#webpage",
        "url": "https://sgodata.com/erp.html",
        "name": "Giải Pháp Quản Trị Doanh Nghiệp Toàn Diện ERP - SGO Việt Nam",
        "description":
          "Hệ thống phần mềm quản trị doanh nghiệp SGO ERP hợp nhất mọi quy trình vận hành.",
      },
      {
        "@type": "Service",
        "@id": "https://sgodata.com/erp.html#service",
        "name": "Giải Pháp Quản Trị Doanh Nghiệp SGO ERP",
        "serviceType": "Enterprise Resource Planning Solution",
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://sgodata.com/#localbusiness",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://sgodata.com/#localbusiness",
        "name": "CÔNG TY CP CÔNG NGHỆ VÀ TRUYỀN THÔNG SGO VIỆT NAM",
        "alternateName": "SGO Việt Nam",
        "image": "https://sgodata.com/favicon-sgo.png",
        "url": "https://sgodata.com/",
        "telephone": "+842462927089",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress":
            "Tầng 12 Tòa nhà Licogi 13, số 164 Khuất Duy Tiến, P.Thanh Xuân",
          "addressLocality": "Thanh Xuân",
          "addressRegion": "Hà Nội",
          "postalCode": "100000",
          "addressCountry": "VN",
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
        <ErpHeader />
        <ErpModules />
        <ErpWhy />
        <ErpForm />
      </main>
      <Footer />
    </div>
  );
}
