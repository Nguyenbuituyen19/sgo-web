import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import QrHeader from "@/components/qr-code/QrHeader";
import QrWarning from "@/components/qr-code/QrWarning";
import QrFeatures from "@/components/qr-code/QrFeatures";
import QrComparison from "@/components/qr-code/QrComparison";
import QrForm from "@/components/qr-code/QrForm";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Tạo Mã QR Miễn Phí - Sạch 100% Không Quảng Cáo | SGO VIỆT NAM",
  description:
    "Hệ thống tạo mã QR Code trực tuyến miễn phí trọn đời, không dính quảng cáo phiền toái. Tạo nhanh mã QR cho link Website, Fanpage, Zalo, thực đơn nhà hàng.",
  keywords: [
    "tạo mã qr miễn phí",
    "làm qr code online",
    "qr code không quảng cáo",
    "sgodata",
    "tạo qr link",
    "sgo việt nam",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/qr-code.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/qr-code.html",
    title: "Hệ Thống Tạo QR Code Trực Tuyến Tốc Độ Cao Miễn Phí - SGO",
    description:
      "QR Code sạch 100%, không bị chèn quảng cáo trung gian, không giới hạn lượt quét. Đăng ký tạo mã QR nhận ngay qua Email/Zalo.",
    images: ["https://sgodata.com/qr-code.html"],
    locale: "vi_VN",
    siteName: "SGO Việt Nam",
  },
};

export default function QrCodePage() {
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
        "priceRange": "0VND",
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
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          "opens": "08:00",
          "closes": "17:30",
        },
        "sameAs": [
          "https://www.facebook.com/sgodata",
          "https://www.youtube.com/@sgodata",
        ],
      },
      {
        "@type": "WebApplication",
        "@id": "https://sgodata.com/qr-code.html#webapp",
        "url": "https://sgodata.com/qr-code.html",
        "name": "Hệ thống Tạo Mã QR Miễn Phí SGO",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires HTML5 support",
        "description":
          "Hệ thống trực tuyến hỗ trợ khởi tạo mã QR Code tĩnh và động miễn phí trọn đời, định dạng tối ưu điểm ảnh, sạch 100% không chèn quảng cáo và không giới hạn số lượt quét dữ liệu.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "VND",
        },
        "provider": {
          "@id": "https://sgodata.com/#localbusiness",
        },
      },
    ],
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased bg-grid-pattern min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-grow w-full">
        <QrHeader />
        <QrWarning />
        <QrFeatures />
        <QrComparison />
        <QrForm />
      </main>
      <Footer />
    </div>
  );
}
