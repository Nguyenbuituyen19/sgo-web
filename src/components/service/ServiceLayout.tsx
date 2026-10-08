import { ReactNode } from "react";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

interface ServiceLayoutProps {
  children: ReactNode;
}

/**
 * Khung trang dùng chung cho trang dịch vụ sinh động.
 *
 * Chỉ sở hữu phần "vỏ" giống nhau ở mọi trang dịch vụ (nền, navbar, footer).
 * Hero là con đầu tiên trong `children` nên không cần thêm prop `heroSection`
 * riêng — bớt một lớp trung gian mà không mất gì.
 */
export default function ServiceLayout({ children }: ServiceLayoutProps) {
  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Footer />
    </div>
  );
}
