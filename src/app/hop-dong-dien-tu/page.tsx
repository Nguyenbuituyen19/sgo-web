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
