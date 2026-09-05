import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import LicenseHeader from "@/components/ban-quyen/LicenseHeader";
import LicenseProducts from "@/components/ban-quyen/LicenseProducts";
import LicenseFeatures from "@/components/ban-quyen/LicenseFeatures";
import LicenseSteps from "@/components/ban-quyen/LicenseSteps";
import LicenseFaq from "@/components/ban-quyen/LicenseFaq";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sgodata.com - Bản Quyền Phần Mềm Chính Hãng Giá Tốt Nhất",
  description:
    "Cung cấp key bản quyền Windows 10/11 Pro, Office 2021/365, Windows Server chính hãng vĩnh viễn, bảo hành suốt quá trình sử dụng, hỗ trợ kỹ thuật 24/7 tại sgodata.com.",
  keywords: [
    "bản quyền windows",
    "key office 2021",
    "office 365 chính hãng",
    "windows server key",
    "bản quyền phần mềm",
    "sgodata",
    "sgo việt nam",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/ban-quyen.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/ban-quyen.html",
    title: "Sgodata.com - Bản Quyền Phần Mềm Chính Hãng Giá Tốt Nhất",
    description:
      "Bản Quyền Windows, Office & Server Giá Tốt Nhất Cho Doanh Nghiệp & Cá Nhân. Kích hoạt trực tiếp từ Microsoft.",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function BanQuyenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://sgodata.com/ban-quyen.html#product",
        "name": "Phần Mềm Bản Quyền Windows & Office SGO",
        "image": "https://sgodata.com/favicon-sgo.png",
        "description":
          "Cung cấp key bản quyền chính hãng vĩnh viễn, bảo hành suốt quá trình sử dụng.",
        "brand": {
          "@type": "Brand",
          "name": "SGO Việt Nam",
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "VND",
          "lowPrice": "250000",
          "highPrice": "890000",
          "priceStock": "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://sgodata.com/ban-quyen.html#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Key bản quyền này là loại gì? Có update được không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Tất cả key tại sgodata.com là key bản quyền chính hãng dạng điện tử (Digital/Retail/MAK). Quý khách có thể thoải mái cập nhật (update) các bản vá bảo mật trực tiếp từ Microsoft.",
            },
          },
          {
            "@type": "Question",
            "name": "Nếu cài lại máy thì key còn sử dụng được không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Đối với các dòng key Retail hoặc gắn liền với tài khoản Microsoft (như Office), bạn hoàn toàn có thể tái sử dụng khi cài lại máy tính.",
            },
          },
          {
            "@type": "Question",
            "name": "Thời gian nhận được key sau khi thanh toán là bao lâu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Thời gian xử lý và giao key tự động hoặc qua nhân viên chăm sóc khách hàng diễn ra từ 3 đến 5 phút kể từ khi nhận được xác nhận thanh toán.",
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
      <main className="flex-grow w-full">
        <LicenseHeader />
        <LicenseProducts />
        <LicenseFeatures />
        <LicenseSteps />
        <LicenseFaq />
      </main>
      <Footer />
    </div>
  );
}
