import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import WebHeader from "@/components/web/WebHeader";
import WebPricing from "@/components/web/WebPricing";
import WebWorkflow from "@/components/web/WebWorkflow";
import WebFaq from "@/components/web/WebFaq";
import WebForm from "@/components/web/WebForm";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Thiết Kế Website Chuyên Nghiệp Chuẩn SEO - SGO Web",
  description:
    "Dịch vụ thiết kế website chuyên nghiệp, may đo theo yêu cầu chuẩn SEO tại SGO Việt Nam. Giao diện Responsive tối ưu Mobile, tốc độ tải trang dưới 2 giây, cam kết bảo mật cao, tặng tên miền và hosting tốc độ cao. Xem bảng giá và kho mẫu ngay!",
  keywords: [
    "thiết kế website chuyên nghiệp",
    "làm web chuẩn seo",
    "dịch vụ thiết kế web",
    "sgo web",
    "sgo việt nam",
    "thiết kế website theo yêu cầu",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/web.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/web.html",
    title: "Thiết Kế Website Chuyên Nghiệp Chuẩn SEO - SGO Web",
    description:
      "Dịch vụ thiết kế website chuyên nghiệp, may đo theo yêu cầu chuẩn SEO tại SGO Việt Nam. Giao diện Responsive tối ưu Mobile, tốc độ tải trang dưới 2 giây...",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function WebPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://sgodata.com/#localbusiness",
        "name": "CÔNG TY CP CÔNG NGHỆ VÀ TRUYỀN THÔNG SGO VIỆT NAM",
        "alternateName": "SGO Việt Nam",
        "image": "https://sgodata.com/favicon-sgo.png",
        "url": "https://sgodata.com/",
        "telephone": "+842462927089",
        "priceRange": "VND",
        "taxID": "0108806638",
        "address": {
          "@type": "PostalAddress",
          "streetAddress":
            "Tầng 12 Tòa nhà Licogi 13, số 164 Khuất Duy Tiến, P.Thanh Xuân",
          "addressLocality": "Thanh Xuân",
          "addressRegion": "Hà Nội",
          "postalCode": "100000",
          "addressCountry": "VN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 20.998436,
          "longitude": 105.801041,
        },
      },
      {
        "@type": "Service",
        "@id": "https://sgodata.com/#sgoweb-service",
        "name": "Dịch vụ Thiết kế Website Chuyên nghiệp Chuẩn SEO",
        "provider": {
          "@id": "https://sgodata.com/#localbusiness",
        },
        "areaServed": "VN",
        "description":
          "SGO Việt Nam cung cấp dịch vụ thiết kế website may đo chuyên nghiệp, chuẩn cấu trúc SEO của Google, tối ưu UI/UX trên mọi thiết bị và cam kết bảo hành kỹ thuật trọn đời.",
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
        <WebHeader />
        <WebPricing />
        <WebWorkflow />
        <WebFaq />
        <WebForm />
      </main>
      <Footer />
    </div>
  );
}
