import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import AboutHero from "@/components/gioi-thieu/AboutHero";
import AboutIntroduction from "@/components/gioi-thieu/AboutIntroduction";
import AboutOriginStory from "@/components/gioi-thieu/AboutOriginStory";
import AboutMissionValues from "@/components/gioi-thieu/AboutMissionValues";
import AboutStats from "@/components/gioi-thieu/AboutStats";
import AboutMilestones from "@/components/gioi-thieu/AboutMilestones";
import AboutTeam from "@/components/gioi-thieu/AboutTeam";
import AboutWhyChoose from "@/components/gioi-thieu/AboutWhyChoose";
import AboutCulture from "@/components/gioi-thieu/AboutCulture";
import AboutCta from "@/components/gioi-thieu/AboutCta";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Giới Thiệu SGODATA - Kiến Tạo Giải Pháp Công Nghệ Cho Tương Lai Số",
  description:
    "Tìm hiểu hành trình phát triển, sứ mệnh, giá trị cốt lõi, đội ngũ nhân sự và các giải pháp hạ tầng dữ liệu, điện toán đám mây & AI tiên phong từ SGODATA.",
  keywords: [
    "giới thiệu sgodata",
    "về chúng tôi sgodata",
    "đội ngũ sgodata",
    "hạ tầng cloud sgodata",
    "dữ liệu lớn sgodata",
    "giải pháp ai doanh nghiệp",
  ],
  authors: [{ name: "SGODATA" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sgodata.com/gioi-thieu.html",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/gioi-thieu.html",
    title: "Giới Thiệu SGODATA - Kiến Tạo Giải Pháp Công Nghệ Cho Tương Lai Số",
    description:
      "SGODATA đồng hành cùng doanh nghiệp trong hành trình ứng dụng công nghệ, tối ưu vận hành và bứt phá tăng trưởng bền vững.",
    images: ["https://sgodata.com/favicon-sgo.png"],
  },
};

export default function GioiThieuPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sgodata.com/#organization",
        "name": "Công ty Giải Pháp Công Nghệ & Truyền Thông SGODATA",
        "url": "https://sgodata.com",
        "logo": "https://sgodata.com/favicon-sgo.png",
        "foundingDate": "2021",
        "description":
          "Cung cấp hệ sinh thái giải pháp dữ liệu, điện toán đám mây và trí tuệ nhân tạo toàn diện cho doanh nghiệp.",
      },
      {
        "@type": "AboutPage",
        "@id": "https://sgodata.com/gioi-thieu.html#webpage",
        "url": "https://sgodata.com/gioi-thieu.html",
        "name": "Giới thiệu SGODATA",
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
        <AboutHero />
        <AboutIntroduction />
        <AboutOriginStory />
        <AboutMissionValues />
        <AboutMilestones />
        <AboutStats />
        <AboutWhyChoose />
        <AboutCulture />
        <AboutCta />
      </main>
      <Footer />
    </div>
  );
}
