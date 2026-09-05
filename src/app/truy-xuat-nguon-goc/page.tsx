import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import TraceHeader from "@/components/truy-xuat-nguon-goc/TraceHeader";
import TraceWhy from "@/components/truy-xuat-nguon-goc/TraceWhy";
import TraceFeatures from "@/components/truy-xuat-nguon-goc/TraceFeatures";
import TraceBenefits from "@/components/truy-xuat-nguon-goc/TraceBenefits";
import TraceForm from "@/components/truy-xuat-nguon-goc/TraceForm";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Giải Pháp Truy Xuất Nguồn Gốc Sản Phẩm Toàn Diện - SGO Việt Nam",
  description:
    "Giải pháp truy xuất nguồn gốc sản phẩm bằng QR Code từ SGO Việt Nam. Số hóa nhật ký sản xuất, minh bạch chuỗi cung ứng, chống hàng giả và nâng tầm nông sản Việt.",
  keywords: [
    "truy xuất nguồn gốc",
    "phần mềm truy xuất nguồn gốc",
    "qr code chống hàng giả",
    "số hóa chuỗi cung ứng",
    "nhật ký sản xuất điện tử",
    "SGO Việt Nam",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/truy-xuat-nguon-goc.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/truy-xuat-nguon-goc.html",
    title: "Giải Pháp Truy Xuất Nguồn Gốc Sản Phẩm Toàn Diện - SGO Việt Nam",
    description:
      "Giải pháp truy xuất nguồn gốc sản phẩm bằng QR Code từ SGO Việt Nam. Số hóa nhật ký sản xuất, minh bạch chuỗi cung ứng, chống hàng giả và nâng tầm nông sản Việt.",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function TruyXuatNguonGocPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://sgodata.com/truy-xuat-nguon-goc.html#webpage",
        "url": "https://sgodata.com/truy-xuat-nguon-goc.html",
        "name": "Giải Pháp Truy Xuất Nguồn Gốc Sản Phẩm Toàn Diện - SGO Việt Nam",
        "description":
          "Giải pháp truy xuất nguồn gốc sản phẩm bằng QR Code từ SGO Việt Nam. Số hóa nhật ký sản xuất, minh bạch chuỗi cung ứng, chống hàng giả và nâng tầm nông sản Việt.",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Trang chủ SGO Việt Nam",
              "item": "https://sgodata.com/",
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Giải pháp truy xuất nguồn gốc",
              "item": "https://sgodata.com/truy-xuat-nguon-goc.html",
            },
          ],
        },
      },
      {
        "@type": "Service",
        "@id": "https://sgodata.com/truy-xuat-nguon-goc.html#service",
        "name": "Giải Pháp Truy Xuất Nguồn Gốc Sản Phẩm SGO Trace",
        "serviceType": "Traceability Solution",
        "description":
          "Ứng dụng số hóa nhật ký sản xuất, minh bạch chuỗi cung ứng bằng QR Code độc bản, chống hàng giả và hỗ trợ doanh nghiệp đáp ứng tiêu chuẩn xuất khẩu.",
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
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 20.998436,
          "longitude": 105.801041,
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
      <TraceHeader />
      <main className="max-w-7xl mx-auto px-4 py-16 flex-grow w-full">
        <TraceWhy />
        <TraceFeatures />
        <TraceBenefits />
        <TraceForm />
      </main>
      <Footer />
    </div>
  );
}
