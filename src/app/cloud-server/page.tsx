import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import CloudHero from "@/components/cloud-server/CloudHero";
import CloudPricingTable from "@/components/cloud-server/CloudPricingTable";
import CloudFeatures from "@/components/cloud-server/CloudFeatures";
import CloudFaq from "@/components/cloud-server/CloudFaq";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title:
    "Bảng Giá Cloud Server Linux & Turbo Cloud Server Giá Rẻ, Tốc Độ Cao - SGO Việt Nam",
  description:
    "Dịch vụ lưu trữ và quản lý máy chủ trên nền tảng đám mây Cloud Server Linux & Turbo Cloud Server NVMe ảo hóa KVM toàn phần. Tốc độ cao, băng thông 200Mbps - 1Gbps, khởi tạo nhanh, cam kết Uptime 99.99%. Xem bảng giá ngay!",
  keywords: [
    "cloud server linux",
    "turbo cloud server",
    "bảng giá vps giá rẻ",
    "thuê máy chủ cloud",
    "vps linux việt nam",
    "vps nvme tốc độ cao",
    "sgo cloud server",
    "sgo việt nam",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/cloud-server.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/cloud-server.html",
    title:
      "Bảng Giá Cloud Server Linux & Turbo Cloud Server Giá Rẻ - SGO Việt Nam",
    description:
      "Dịch vụ lưu trữ và quản lý máy chủ trên nền tảng đám mây (Cloud Computing) có hiệu suất vượt trội, tốc độ cao, cùng khả năng bảo mật tốt nhất trên nền tảng ảo hoá toàn phần KVM.",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function CloudServerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://sgodata.com/cloud-server.html#product",
        "name": "Cloud Server Linux & Turbo Cloud Server SGO",
        "image": "https://sgodata.com/favicon-sgo.png",
        "description":
          "Máy chủ đám mây ảo hóa toàn phần KVM, sử dụng ổ cứng SSD/NVMe Enterprise tốc độ cao, băng thông lớn.",
        "brand": {
          "@type": "Brand",
          "name": "SGO Việt Nam",
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "VND",
          "lowPrice": "57850",
          "highPrice": "1293500",
          "offerCount": "10",
          "priceStock": "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://sgodata.com/cloud-server.html#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Cloud Server tại SGO hỗ trợ những hệ điều hành nào?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "SGO Cloud Server hỗ trợ tất cả các phiên bản hệ điều hành phổ biến nhất hiện nay: Linux (CentOS, Ubuntu, Debian, AlmaLinux, Rocky Linux) và Windows Server (2016, 2019, 2022).",
            },
          },
          {
            "@type": "Question",
            "name":
              "Tôi có thể tự nâng cấp CPU, RAM, SSD khi nhu cầu sử dụng tăng lên không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Hoàn toàn được. Hệ thống Cloud của SGO hỗ trợ nâng cấp Hot-resize cực kỳ linh hoạt trong vòng 1-3 phút mà không phải di chuyển dữ liệu hay đổi địa chỉ IP.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Dữ liệu trên máy chủ có được sao lưu (Backup) an toàn không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Hệ thống tự động tạo bản sao lưu Snapshot/Backup định kỳ mỗi tuần. Ngoài ra khách hàng có thể chủ động tạo Snapshot tức thì.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Tôi có được toàn quyền quản trị máy chủ (Root / Administrator) không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. SGO bàn giao 100% quyền truy cập Root (đối với Linux qua SSH) hoặc Administrator (đối với Windows qua Remote Desktop RDP).",
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
        <CloudHero />
        <CloudPricingTable />
        <CloudFeatures />
        <CloudFaq />
      </main>
      <Footer />
    </div>
  );
}
