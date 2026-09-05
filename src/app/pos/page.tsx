import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import PosHeader from "@/components/pos/PosHeader";
import PosFeatures from "@/components/pos/PosFeatures";
import PosIndustries from "@/components/pos/PosIndustries";
import PosForm from "@/components/pos/PosForm";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Phần Mềm Quản Lý Bán Hàng SGO POS - Đơn Giản, Tốc Độ, Hiệu Quả",
  description:
    "Phần mềm quản lý bán hàng SGO POS trực tuyến tốt nhất năm 2026. Tính tiền siêu tốc 3 giây, tự động hóa quản lý kho thông minh, báo cáo thu chi, doanh thu trực quan ngay trên điện thoại và máy tính. Đăng ký dùng thử miễn phí 7 ngày!",
  keywords: [
    "phần mềm quản lý bán hàng",
    "sgo pos",
    "phần mềm tính tiền",
    "quản lý kho thông minh",
    "báo cáo doanh thu",
    "sgo việt nam",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/pos.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/pos.html",
    title: "Phần Mềm Quản Lý Bán Hàng SGO POS - Đơn Giản, Tốc Độ, Hiệu Quả",
    description:
      "Phần mềm quản lý bán hàng SGO POS trực tuyến tốt nhất năm 2026. Tính tiền siêu tốc 3 giây, tự động hóa quản lý kho thông minh, báo cáo thu chi...",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function PosPage() {
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
        "@type": "WebApplication",
        "@id": "https://sgodata.com/#sgopos",
        "name": "SGO POS - Phần Mềm Quản Lý Bán Hàng",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires HTML5 support",
        "description":
          "Phần mềm quản lý bán hàng trực tuyến hỗ trợ tính tiền siêu tốc, quản lý tồn kho thông minh, tự động hóa báo cáo doanh thu thu chi, đồng bộ sàn TMĐT và quản lý cửa hàng từ xa linh hoạt.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
          "description": "Dùng thử miễn phí 07 ngày không giới hạn tính năng",
        },
        "provider": {
          "@id": "https://sgodata.com/#localbusiness",
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
        <PosHeader />
        <PosFeatures />
        <PosIndustries />
        <PosForm />
      </main>
      <Footer />
    </div>
  );
}
