import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import NewsMainContainer from "@/components/tin-tuc/NewsMainContainer";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Tin Tức & Xu Hướng Công Nghệ - SGODATA",
  description:
    "Cập nhật các bài viết chuyên sâu về hạ tầng lưu trữ điện toán đám mây, kiến trúc dữ liệu lớn Lakehouse, trí tuệ nhân tạo AI Ops và giải pháp chuyển đổi số toàn diện từ SGODATA.",
  keywords: [
    "tin tức sgodata",
    "xu hướng công nghệ 2026",
    "bài viết cloud server",
    "trí tuệ nhân tạo ai ops",
    "chuyển đổi số doanh nghiệp",
    "bảo mật iso 27001",
    "quản trị erp pos",
  ],
  authors: [{ name: "SGODATA" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/tin-tuc",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/tin-tuc",
    title: "Tin Tức & Xu Hướng Công Nghệ - SGODATA",
    description:
      "Cập nhật thông tin công nghệ, bài viết chuyên sâu về Cloud, AI, ERP và an toàn thông tin cùng các chuyên gia hàng đầu từ SGODATA.",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function TinTucPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sgodata.com/#organization",
        "name": "Công ty Giải Pháp Công Nghệ SGODATA",
        "url": "https://sgodata.com",
        "logo": "https://sgodata.com/favicon-sgo.png",
      },
      {
        "@type": "CollectionPage",
        "@id": "https://sgodata.com/tin-tuc#webpage",
        "url": "https://sgodata.com/tin-tuc",
        "name": "Tin Tức & Xu Hướng Công Nghệ - SGODATA",
        "isPartOf": {
          "@id": "https://sgodata.com/#website",
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
        <NewsMainContainer />
      </main>
      <Footer />
    </div>
  );
}
