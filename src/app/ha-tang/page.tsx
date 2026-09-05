import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import InfraHeader from "@/components/ha-tang/InfraHeader";
import InfraServices from "@/components/ha-tang/InfraServices";
import InfraAdvantages from "@/components/ha-tang/InfraAdvantages";
import InfraForm from "@/components/ha-tang/InfraForm";
import InfraFaq from "@/components/ha-tang/InfraFaq";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title:
    "Hạ Tầng, Lưu Trữ Cloud & Email Doanh Nghiệp Toàn Diện - SGO Việt Nam",
  description:
    "SGO Việt Nam cung cấp dịch vụ hạ tầng số toàn diện: Đăng ký tên miền, Hosting tốc độ cao, Cloud Server, cho thuê chỗ đặt máy chủ và giải pháp Email Hosting/Email Server doanh nghiệp bảo mật, chống spam hiệu quả.",
  keywords: [
    "đăng ký tên miền",
    "mua tên miền",
    "thuê hosting giá rẻ",
    "hosting tốc độ cao",
    "cloud server việt nam",
    "thuê vps",
    "chỗ đặt máy chủ",
    "colocation",
    "email hosting",
    "email doanh nghiệp",
    "email server riêng",
    "hạ tầng cloud sgo việt nam",
    "bảo mật dữ liệu",
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
    title: "Hạ Tầng, Lưu Trữ Cloud & Email Doanh Nghiệp - SGO Việt Nam",
    description:
      "Tối ưu hiệu suất vận hành với hệ thống lưu trữ Cloud, Server, Tên miền và Email doanh nghiệp chuyên nghiệp từ SGO Việt Nam. Tốc độ vượt trội, chống spam, hỗ trợ 24/7.",
    images: ["https://sgodata.com/images/og-cloud-thumbnail.jpg"],
  },
};

export default function HaTangPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": "https://sgodata.com/cloud-server.html#product",
        "name": "Dịch vụ Hạ tầng, Lưu trữ Cloud & Email Doanh Nghiệp SGO",
        "image": "https://sgodata.com/favicon-sgo.png",
        "description":
          "Giải pháp hạ tầng công nghệ toàn diện bao gồm Tên miền, Hosting, Cloud Server, Chỗ đặt máy chủ và Email Hosting/Email Server doanh nghiệp chuẩn mã hóa.",
        "brand": {
          "@type": "Brand",
          "name": "SGO Việt Nam",
        },
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "VND",
          "lowPrice": "100000",
          "priceStock": "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://sgodata.com/cloud-server.html#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name":
              "Dữ liệu trên Cloud Server của SGO có được sao lưu định kỳ không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Hệ thống của SGO Việt Nam tích hợp cơ chế tự động sao lưu (Backup) định kỳ hàng tuần. Đảm bảo doanh nghiệp luôn có điểm khôi phục dữ liệu nhanh chóng trong mọi tình huống khẩn cấp.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Tôi có thể nâng cấp cấu hình Cloud Server trong quá trình sử dụng không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Hoàn toàn được. Hệ thống Cloud của SGO hỗ trợ nâng cấp linh hoạt (Hot-resize) các thông số như CPU, RAM, dung lượng SSD ngay lập tức mà không làm gián đoạn hay dừng hoạt động của website/hệ thống.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Dịch vụ Email doanh nghiệp của SGO có giúp giảm tình trạng thư rơi vào hộp thư rác (Spam) không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Hệ thống Email Hosting và Email Server của SGO sử dụng dải IP sạch, độ tin cậy cao và cấu hình đầy đủ các bản ghi định danh nghiêm ngặt như SPF, DKIM, DMARC. Kết hợp với bộ lọc thông minh, giải pháp giúp tối ưu hóa tỷ lệ thư vào Inbox lên đến 99% và ngăn chặn tối đa thư rác, thư độc hại gửi đến.",
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
      <InfraHeader />
      <main className="max-w-7xl mx-auto px-4 py-16 flex-grow w-full">
        <InfraServices />
        <InfraAdvantages />
        <InfraForm />
        <InfraFaq />
      </main>
      <Footer />
    </div>
  );
}
