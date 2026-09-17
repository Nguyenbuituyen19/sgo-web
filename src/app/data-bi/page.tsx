import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import DataBiHeader from "@/components/data-bi/DataBiHeader";
import DataBiStats from "@/components/data-bi/DataBiStats";
import DataBiSolutions from "@/components/data-bi/DataBiSolutions";
import DataBiBenefits from "@/components/data-bi/DataBiBenefits";
import DataBiFaq from "@/components/data-bi/DataBiFaq";
import DataBiForm from "@/components/data-bi/DataBiForm";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Hạ Tầng Dữ Liệu & Business Intelligence (BI) - SGO Data",
  description:
    "Xây dựng Hạ tầng Dữ liệu vững chắc, Data Warehouse, Data Lake, tự động hóa luồng thông tin ETL/ELT và tích hợp hệ thống Business Intelligence (Power BI, Looker Studio, Tableau) toàn diện cho doanh nghiệp.",
  keywords: [
    "hạ tầng dữ liệu",
    "business intelligence",
    "bi dashboard",
    "data warehouse",
    "data lake",
    "power bi",
    "looker studio",
    "sgo data",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/data-bi.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/data-bi.html",
    title: "Hạ Tầng Dữ Liệu & BI Chuyên Sâu - SGO Data",
    description:
      "Biến dữ liệu thô thành quyết định chiến lược. Trực quan hóa báo cáo điều hành thời gian thực.",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function DataBiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://sgodata.com/data-bi.html#service",
        "name": "Dịch vụ Hạ tầng Dữ liệu & Business Intelligence (BI) SGO Data",
        "image": "https://sgodata.com/favicon-sgo.png",
        "description":
          "Tư vấn thiết kế Data Warehouse, Data Lake, xây dựng đường ống dữ liệu tự động và Dashboard điều hành thông minh.",
        "provider": {
          "@type": "Organization",
          "name": "SGO Việt Nam",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://sgodata.com/data-bi.html#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name":
              "Doanh nghiệp nhỏ hoặc mới bắt đầu có cần xây dựng Hạ tầng Dữ liệu và BI không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Hoàn toàn có. Việc xây dựng nền tảng dữ liệu chuẩn từ sớm giúp doanh nghiệp tránh tình trạng phân mảnh khi quy mô phát triển.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Thời gian triển khai một hệ thống Data Warehouse và Dashboard BI mất bao lâu?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Thông thường, một dự án cơ bản từ khảo sát, xây dựng đường ống dữ liệu (ETL) đến khi hoàn thiện Dashboard điều hành kéo dài từ 2 đến 6 tuần.",
            },
          },
          {
            "@type": "Question",
            "name":
              "Dữ liệu của công ty chúng tôi có được bảo mật an toàn không?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Toàn bộ hạ tầng dữ liệu được thiết lập với các tiêu chuẩn mã hóa cao, phân quyền truy cập chặt chẽ. Dữ liệu hoàn toàn thuộc quyền sở hữu độc lập của doanh nghiệp.",
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
        <DataBiHeader />
        <DataBiStats />
        <DataBiSolutions />
        <DataBiBenefits />
        <DataBiFaq />
        <DataBiForm />
      </main>
      <Footer />
    </div>
  );
}
