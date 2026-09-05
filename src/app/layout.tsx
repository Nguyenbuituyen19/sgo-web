import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ScrollRestorationFix from '@/components/layout/ScrollRestorationFix';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "SGO Việt Nam - Hệ Sinh Thái Giải Pháp Doanh Nghiệp",
  description:
    "SGO Việt Nam cung cấp hệ sinh thái giải pháp số đột phá: Thiết kế website chuẩn SEO, công nghệ số hóa không gian VR360, giải pháp truy xuất nguồn gốc sản phẩm, phần mềm quản lý POS, giải pháp tin nhắn ZNS, ERP, hợp đồng điện tử và hạ tầng lưu trữ Cloud doanh nghiệp chuyên sâu.",
  keywords: [
    "SGO Việt Nam",
    "sgo data",
    "VR360 du lịch",
    "thực tế ảo 3D",
    "số hóa không gian",
    "truy xuất nguồn gốc",
    "qr code truy xuất",
    "thiết kế website chuẩn SEO",
    "phần mềm POS",
    "giải pháp ZNS",
    "hệ thống ERP",
    "hợp đồng điện tử",
    "e-contract",
    "đăng ký tên miền",
    "thuê hosting",
    "thuê server cloud",
    "chỗ đặt máy chủ",
    "số hóa doanh nghiệp",
    "chuyển đổi số",
  ],
  authors: [{ name: "SGO Việt Nam" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://sgodata.com",
  },
  icons: {
    icon: "https://sgodata.com/favicon-sgo.png",
    shortcut: "https://sgodata.com/favicon-sgo.png",
    apple: "https://sgodata.com/favicon-sgo.png",
  },
  openGraph: {
    type: "website",
    url: "https://sgodata.com/",
    title: "SGO Việt Nam - Hệ Sinh Thái Giải Pháp Số Toàn Diện",
    description:
      "Bứt phá doanh số với hệ sinh thái công nghệ may đo từ SGO Việt Nam: Thực tế ảo VR360, Thiết kế Web, phần mềm POS, ứng dụng truy xuất nguồn gốc sản phẩm, CSKH qua Zalo ZNS, hệ thống quản trị ERP, hợp đồng điện tử và hạ tầng Cloud tinh gọn.",
    images: ["https://sgodata.com/images/og-share-thumbnail.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-800 font-sans antialiased min-h-full flex flex-col">
        {children}
        <ScrollToTop />
        <ScrollRestorationFix />
      </body>
    </html>
  );
}

