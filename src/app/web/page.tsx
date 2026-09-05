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
      {
        "@type": "FAQPage",
        "@id": "https://sgodata.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name":
              "Chi phí thiết kế website tại SGO là trọn gói hay có phát sinh gì không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Báo giá tại SGO là chi phí trọn gói theo hợp đồng bao gồm thiết kế, lập trình, tặng kèm tên miền và hosting năm đầu tiên. Chúng tôi cam kết không phát sinh bất kỳ khoản phí ẩn nào trong suốt quá trình triển khai.",
            },
          },
          {
            "@type": "Question",
            "name": "SGO sử dụng mã nguồn gì để thiết kế website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Tùy thuộc vào nhu cầu của bạn, SGO tối ưu trên các nền tảng mã nguồn phổ biến tối ưu SEO như WordPress (may đo giao diện thuần tốc độ cao) hoặc lập trình hệ thống riêng biệt (Custom Code) cho các nền tảng thương mại điện tử phức tạp.",
            },
          },
          {
            "@type": "Question",
            "name": "Website sau khi bàn giao có được bảo hành bảo trì không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Tất cả website do SGO triển khai và sử dụng hạ tầng hosting/vps của chúng tôi đều được bảo hành, bảo trì trọn đời, hỗ trợ khắc phục các lỗi kỹ thuật và vận hành 24/7.",
            },
          },
          {
            "@type": "Question",
            "name": "Thời gian hoàn thiện một website mất bao lâu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Thời gian hoàn thành phụ thuộc vào quy mô dự án: Gói Landing Page thường từ 3 - 5 ngày làm việc. Gói Website Doanh nghiệp tiêu chuẩn từ 7 - 12 ngày. Gói Thương mại điện tử/Yêu cầu riêng từ 15 - 30 ngày.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Tôi có được sở hữu hoàn toàn mã nguồn (Source Code) sau khi bàn giao không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Sau khi nghiệm thu và thanh lý hợp đồng, SGO bàn giao 100% bản quyền và mã nguồn gốc của website cho khách hàng quản lý, không khóa mã, không giữ source.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Website được thiết kế đã tối ưu chuẩn SEO và Responsive trên điện thoại chưa?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Chắc chắn. 100% sản phẩm của SGO được cấu trúc chuẩn hóa schema dữ liệu, tối ưu điểm kiểm tra Google PageSpeed và tự động tương thích hoàn hảo (Responsive) trên tất cả màn hình thiết bị di động, iPad, Máy tính.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Sang năm thứ 2, tôi cần đóng những chi phí gì để duy trì website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Từ năm thứ 2 trở đi, bạn chỉ cần nộp phí gia hạn cố định cho Tên miền (Domain) và Không gian lưu trữ (Hosting) theo bảng giá nhà nước và biểu phí nhà mạng cấu hình ban đầu, hoàn toàn không mất thêm phí duy trì phần mềm.",
            },
          },
          {
            "@type": "Question",
            "name":
              "SGO có hỗ trợ hướng dẫn tôi tự quản trị website, up bài viết sản phẩm không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. SGO sẽ cung cấp tài liệu hướng dẫn chi tiết dạng văn bản kèm video quay sẵn, đồng thời có kỹ thuật viên hướng dẫn trực tiếp qua UltraView/Zalo để đảm bảo người không rành công nghệ vẫn quản trị dễ dàng.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Nếu tôi đã có sẵn Tên miền hoặc Hosting thì chi phí có được giảm trừ không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có, SGO sẽ khấu trừ trực tiếp giá trị tiền mặt tương ứng của gói quà tặng tên miền/hosting vào tổng giá trị hợp đồng thiết kế nếu bạn mong muốn sử dụng hạ tầng có sẵn của mình.",
            },
          },
          {
            "@type": "Question",
            "name":
              "SGO có hỗ trợ viết bài hay làm nội dung ban đầu cho website không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Trong các gói thiết kế, SGO hỗ trợ cấu hình khung dữ liệu, tối ưu banner cơ bản và cập nhật từ 5 - 10 bài viết/sản phẩm mẫu để định hình layout mẫu. Nếu bạn cần xây dựng nội dung fanpage/website số lượng lớn, chúng tôi có cung cấp gói Content Marketing bổ sung chuyên nghiệp.",
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
