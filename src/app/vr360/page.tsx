import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import VrHeader from "@/components/vr360/VrHeader";
import VrBenefits from "@/components/vr360/VrBenefits";
import VrFeatures from "@/components/vr360/VrFeatures";
import VrPricing from "@/components/vr360/VrPricing";
import VrForm from "@/components/vr360/VrForm";
import VrFaq from "@/components/vr360/VrFaq";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Giải Pháp VR360 Du Lịch & Lưu Trú - Nâng Tầm Trải Nghiệm Khách Hàng",
  description:
    "Dịch vụ số hóa không gian VR360 toàn diện cho Khách sạn, Resort, Khu du lịch. Giúp khách hàng tham quan thực tế ảo 3D, thúc đẩy tỷ lệ đặt phòng và bứt phá doanh thu.",
  keywords: [
    "VR360 du lịch",
    "sa bàn ảo resort",
    "thực tế ảo khách sạn",
    "tour 360 lưu trú",
    "số hóa không gian 3D",
    "VR tour du lịch",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/vr360.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/vr360.html",
    title: "Giải Pháp VR360 Du Lịch & Lưu Trú - Nâng Tầm Trải Nghiệm Khách Hàng",
    description:
      "Dịch vụ số hóa không gian VR360 toàn diện cho Khách sạn, Resort, Khu du lịch. Giúp khách hàng tham quan thực tế ảo 3D, thúc đẩy tỷ lệ đặt phòng và bứt phá doanh thu.",
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"],
  },
};

export default function Vr360Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sgodata.com/vr360.html#webpage",
        "url": "https://sgodata.com/vr360.html",
        "name": "Giải Pháp VR360 Du Lịch & Lưu Trú - Nâng Tầm Trải Nghiệm Khách Hàng",
        "description":
          "Dịch vụ số hóa không gian VR360 toàn diện cho Khách sạn, Resort, Khu du lịch. Giúp khách hàng tham quan thực tế ảo 3D, thúc đẩy tỷ lệ đặt phòng và bứt phá doanh thu.",
      },
      {
        "@type": "Service",
        "@id": "https://sgodata.com/vr360.html#service",
        "name": "Dịch vụ số hóa không gian VR360",
        "serviceType": "Virtual Reality Tour Solution",
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
        <VrHeader />
        <VrBenefits />
        <VrFeatures />
        <VrPricing />
        <VrForm />
        <VrFaq />
      </main>
      <Footer />
    </div>
  );
}
