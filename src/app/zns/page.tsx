import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import ZnsHeader from "@/components/zns/ZnsHeader";
import ZnsWhy from "@/components/zns/ZnsWhy";
import ZnsUseCases from "@/components/zns/ZnsUseCases";
import ZnsForm from "@/components/zns/ZnsForm";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Giải Pháp Tin Nhắn Zalo ZNS & Chăm Sóc Khách Hàng OA - SGO Việt Nam",
  description:
    "Giải pháp gửi thông báo chăm sóc khách hàng chủ động qua số điện thoại bằng hạ tầng Zalo Notification Service (ZNS). Chi phí tối ưu, giao diện tin nhắn thương hiệu (Brandname) cực uy tín.",
  keywords: [
    "zalo zns",
    "tin nhắn zalo zns",
    "zalo notification service",
    "zalo oa",
    "chăm sóc khách hàng zalo",
    "sgo việt nam",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/zns.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/zns.html",
    title: "Giải Pháp Tin Nhắn Zalo ZNS & Chăm Sóc Khách Hàng OA - SGO Việt Nam",
    description:
      "Giải pháp gửi thông báo chăm sóc khách hàng chủ động qua số điện thoại bằng hạ tầng Zalo Notification Service (ZNS). Chi phí tối ưu, giao diện tin nhắn thương hiệu cực uy tín.",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function ZnsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sgodata.com/zns.html#webpage",
        "url": "https://sgodata.com/zns.html",
        "name": "Giải Pháp Tin Nhắn Zalo ZNS & Chăm Sóc Khách Hàng OA - SGO Việt Nam",
        "description":
          "Giải pháp gửi thông báo chăm sóc khách hàng chủ động qua số điện thoại bằng hạ tầng Zalo Notification Service (ZNS).",
      },
      {
        "@type": "Service",
        "@id": "https://sgodata.com/zns.html#service",
        "name": "Giải Pháp Tin Nhắn Zalo ZNS",
        "serviceType": "Zalo Notification Service Solution",
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
        "priceRange": "$$",
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
        <ZnsHeader />
        <ZnsWhy />
        <ZnsUseCases />
        <ZnsForm />
      </main>
      <Footer />
    </div>
  );
}
