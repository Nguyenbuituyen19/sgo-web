import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import ContractHeader from "@/components/hop-dong-dien-tu/ContractHeader";
import ContractBenefits from "@/components/hop-dong-dien-tu/ContractBenefits";
import ContractPricing from "@/components/hop-dong-dien-tu/ContractPricing";
import ContractFaq from "@/components/hop-dong-dien-tu/ContractFaq";
import ContractForm from "@/components/hop-dong-dien-tu/ContractForm";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title:
    "Giải Pháp Hợp Đồng Điện Tử Chuyên Nghiệp Cho Doanh Nghiệp - SGO e-Contract",
  description:
    "Giải pháp hợp đồng điện tử e-Contract an toàn, bảo mật, đáp ứng đầy đủ tính pháp lý theo Luật Giao dịch điện tử. Tối ưu 90% chi phí và thời gian ký kết cho doanh nghiệp. Đăng ký nhận tư vấn và demo miễn phí ngay!",
  keywords: [
    "hợp đồng điện tử",
    "phần mềm econtract",
    "ký số từ xa",
    "giải pháp hợp đồng điện tử",
    "hợp đồng số doanh nghiệp",
    "e-contract việt nam",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/hop-dong-dien-tu.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/hop-dong-dien-tu.html",
    title:
      "Giải Pháp Hợp Đồng Điện Tử Chuyên Nghiệp Cho Doanh Nghiệp - SGO e-Contract",
    description:
      "Ký kết mọi lúc, mọi nơi trên mọi thiết bị. Tối ưu 90% thời gian và chi phí in ấn, chuyển phát. Đầy đủ tính pháp lý.",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function HopDongDienTuPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://sgodata.com/#localbusiness",
        "name": "CÔNG TY CP CÔNG NGHỆ VÀ TRUYỀN THÔNG SGO VIỆT NAM",
        "image": "https://sgodata.com/favicon-sgo.png",
        "url": "https://sgodata.com/",
        "telephone": "+842462927089",
        "address": {
          "@type": "PostalAddress",
          "streetAddress":
            "Tầng 12 Tòa nhà Licogi 13, số 164 Khuất Duy Tiến, P.Thanh Xuân",
          "addressLocality": "Thanh Xuân",
          "addressRegion": "Hà Nội",
          "addressCountry": "VN",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://sgodata.com/hop-dong-dien-tu.html",
        "name": "SGO e-Contract",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "description":
          "Phần mềm giải pháp hợp đồng điện tử thông minh, hỗ trợ ký số, ký điện tử từ xa an toàn pháp lý cho doanh nghiệp.",
        "offers": {
          "@type": "Offer",
          "price": "2000000",
          "priceCurrency": "VND",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://sgodata.com/hop-dong-dien-tu.html#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name":
              "Hợp đồng điện tử e-Contract có giá trị pháp lý tương đương hợp đồng giấy không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Theo Điều 14 Luật Giao dịch điện tử và Điều 119 Bộ luật Dân sự Việt Nam, hợp đồng điện tử được thừa nhận có giá trị pháp lý hoàn toàn tương đương với hợp đồng văn bản truyền thống nếu đáp ứng đủ điều kiện về tính toàn vẹn và xác thực.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Tôi có thể dùng những phương thức nào để ký kết trên hệ thống?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "SGO e-Contract hỗ trợ đa dạng phương thức ký: Ký số bằng USB Token, Ký số từ xa (Remote Signing), ký bằng SIM CA, hoặc ký điện tử xác thực qua mã OTP SMS/Email một cách nhanh chóng.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Khách hàng của tôi không có tài khoản SGO e-Contract thì có ký được không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Hoàn toàn ký được. Đối tác của bạn chỉ cần nhận được liên kết qua Email/SMS, truy cập trực tiếp bằng trình duyệt trên máy tính hoặc điện thoại để xác thực OTP và thực hiện ký số mà không cần tốn chi phí mua tài khoản phần mềm.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Hệ thống bảo mật dữ liệu hợp đồng của doanh nghiệp như thế nào?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Dữ liệu được mã hóa truyền tải qua giao thức mã hóa SSL/TLS, lưu trữ an toàn trên hạ tầng Cloud đạt chuẩn quốc tế. Mọi lịch sử tác động, thời gian ký đều được ghi lại tường minh chống giả mạo.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Phần mềm có tích hợp được vào hệ thống quản trị nội bộ CRM/ERP sẵn có không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. SGO e-Contract cung cấp hệ thống API mở chuyên nghiệp, cho phép dễ dàng tích hợp quy trình tạo và phê duyệt hợp đồng trực tiếp từ các phần mềm nhân sự, kế toán, CRM, ERP của doanh nghiệp.",
            },
          },
          {
            "@type": "Question",
            "name": "Quy trình triển khai cài đặt hệ thống mất bao lâu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Hệ thống hoạt động trên nền tảng Cloud, doanh nghiệp có thể khởi tạo tài khoản phân quyền và đưa vào vận hành ký kết ngay trong ngày sau khi cấu hình mẫu phôi hợp đồng.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Có giới hạn số lượng người ký hay phòng ban sử dụng không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Không. Phần mềm hỗ trợ tạo không giới hạn tài khoản người dùng và phòng ban (Kinh doanh, Nhân sự, Kế toán...). Chi phí chỉ tính dựa trên số lượng gói hợp đồng thực tế giao dịch.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Khi xảy ra tranh chấp, hợp đồng điện tử có dùng làm chứng cứ được không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Hợp đồng điện tử e-Contract xuất ra định dạng tệp tin đính kèm chứng thư số hợp lệ là chứng cứ pháp lý vững chắc trước Tòa án và các cơ quan Trọng tài thương mại.",
            },
          },
          {
            "@type": "Question",
            "name": "Hệ thống có cảnh báo khi hợp đồng sắp hết hạn hay không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Có. Tính năng quản trị thông minh sẽ tự động gửi thông báo nhắc nhở qua Email/Dashboard cho các bên liên quan khi hợp đồng kinh tế hoặc hợp đồng lao động sắp đến ngày đáo hạn.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Chi phí gia hạn phần mềm hàng năm được tính như thế nào?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Doanh nghiệp chỉ cần mua gói lượt ký theo nhu cầu thực tế, số lượng lượt ký chưa dùng hết trong năm sẽ được bảo lưu cộng dồn khi gia hạn gói mới, không phát sinh chi phí duy trì phần mềm vô lý.",
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
        <ContractHeader />
        <ContractBenefits />
        <ContractPricing />
        <ContractFaq />
        <ContractForm />
      </main>
      <Footer />
    </div>
  );
}
