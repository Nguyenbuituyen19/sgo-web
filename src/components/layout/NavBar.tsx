"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  const services = [
    { title: 'Tạo Mã QR Miễn Phí', desc: 'Tạo mã QR tĩnh/động chuyên nghiệp', icon: 'fa-solid fa-qrcode', href: '/qr-code' },
    { title: 'Giải Pháp Truy Xuất Nguồn Gốc', desc: 'Số hóa nhật ký chuỗi cung ứng, chống hàng giả và chuẩn hóa xuất khẩu.', icon: 'fa-solid fa-shield-halved', href: '/truy-xuat-nguon-goc' },
    { title: 'Giải Pháp Thực Tế Ảo VR360', desc: 'Số hóa không gian 360 độ trực quan, tăng uy tín và tỷ lệ đặt phòng.', icon: 'fa-solid fa-cube', href: '/vr360' },
    { title: 'Phần Mềm Quản Lý Bán Hàng', desc: 'Quản lý kho hàng, đơn hàng và doanh thu tập trung cho chuỗi bán lẻ', icon: 'fa-solid fa-cash-register', href: '/pos' },
    { title: 'Chăm Sóc Khách Hàng OA - ZNS', desc: 'Gửi tin nhắn Zalo tự động: xác nhận đơn, thông báo số dư tối ưu chi phí.', icon: 'fa-solid fa-comment-sms', href: '/zns' },
    { title: 'Thiết Kế Website Theo Yêu Cầu', desc: 'Website chuẩn SEO, giao diện độc quyền mượt mà và tối ưu chuyển đổi', icon: 'fa-solid fa-laptop-code', href: '/web' },
    { title: 'Hệ Thống Quản Trị CRM / ERP', desc: 'Số hóa toàn diện khách hàng, nhân sự và báo cáo tài chính nội bộ.', icon: 'fa-solid fa-chart-pie', href: '/erp' },
    { title: 'Hạ Tầng Dữ Liệu & BI', desc: 'Xây dựng Data Warehouse, Data Lake và Dashboard điều hành thông minh.', icon: 'fa-solid fa-chart-line', href: '/data-bi' },
    { title: 'Giải Pháp Hợp Đồng Điện Tử', desc: 'Ký số từ xa, lưu trữ hợp đồng không giấy tờ và tự động hóa duyệt.', icon: 'fa-solid fa-file-signature', href: '/hop-dong-dien-tu' },
    { title: 'Hạ Tầng & Lưu Trữ Cloud', desc: 'Lưu trữ an toàn, tốc độ cao và bảo mật tối đa cho website/ứng dụng.', icon: 'fa-solid fa-server', href: '/ha-tang' },
    { title: 'Bản Quyền Phần Mềm', desc: 'Cung cấp key bản quyền. Bảo hành 1 đổi 1, kích hoạt trực tiếp từ Microsoft. ', icon: 'fa-solid fa-key', href: '/ban-quyen' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        {/* LOGO BRAND */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-md shrink-0">
            S
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-wider block leading-none text-slate-900">
              SGODATA
            </span>
            <span className="text-blue-600 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest block mt-0.5 sm:mt-1">
              Giải pháp Công Nghệ
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-8 lg:gap-11 text-xs font-bold text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            TRANG CHỦ
          </Link>
          <Link href="/gioi-thieu" className="hover:text-blue-600 transition-colors">
            GIỚI THIỆU
          </Link>
          <div className="relative group py-4">
        {/* Nút bấm / Link tiêu đề */}
        <Link href="/#dich-vu" className="flex items-center hover:text-blue-600 transition-colors group-hover:text-blue-600">
          <span>DỊCH VỤ</span>
          {/* Mũi tên xoay nhẹ khi hover */}
          <svg
            className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>

        {/* Menu con sổ xuống 3 cột */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 hidden w-[680px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 group-hover:block transition-all">
          <div className="grid grid-cols-3 gap-2">
            {services.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block p-3 rounded-xl hover:bg-blue-50/60 border border-transparent hover:border-blue-100 transition-all group/item"
              >
                {item.icon && <i className={`${item.icon} text-blue-600 mr-2`}></i>}
                <div className="text-xs font-semibold text-slate-900 group-hover/item:text-blue-600 transition-colors">
                  {item.title}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 leading-snug">
                  {item.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
          <Link href="/tin-tuc" className="hover:text-blue-600 transition-colors">
            TIN TỨC
          </Link>
          <Link href="/hoi-dap" className="hover:text-blue-600 transition-colors">
            HỎI ĐÁP Q&A
          </Link>
          <Link href="/lien-he" className="hover:text-blue-600 transition-colors">
            LIÊN HỆ
          </Link>
        </div>
        

        {/* DESKTOP PHONE HOTLINE */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:02462927089"
            className="flex items-center gap-2 text-slate-700 font-bold text-xs sm:text-sm bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors"
          >
            <i className="fa-solid fa-phone text-blue-600"></i> 0246.29.27.089
          </a>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="tel:02462927089"
            aria-label="Gọi điện"
            className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl border border-blue-200 flex items-center justify-center text-sm shadow-sm"
          >
            <i className="fa-solid fa-phone"></i>
          </a>
          <button
            onClick={toggleMenu}
            aria-label="Menu"
            className="w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl flex items-center justify-center text-lg transition-all border border-slate-200 cursor-pointer"
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU DRAWER */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-5 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={closeMenu}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span>Trang Chủ</span>
              <i className="fa-solid fa-house text-xs text-slate-400"></i>
            </Link>

            <Link href="/gioi-thieu" onClick={closeMenu} className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between">
              <span>Giới Thiệu</span>
              <i className="fa-solid fa-user text-xs text-slate-400"></i>
            </Link>
            <a
              href="/#dich-vu"
              onClick={closeMenu}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span>Dịch Vụ</span>
              <i className="fa-solid fa-box text-xs text-slate-400"></i>
            </a>
            <Link
              href="/tin-tuc"
              onClick={closeMenu}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span>Tin Tức</span>
              <i className="fa-solid fa-newspaper text-xs text-slate-400"></i>
            </Link>
           <a
              href="/hoi-dap"
              onClick={closeMenu}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span>Hỏi Đáp Q&A</span>
              <i className="fa-solid fa-question text-xs text-slate-400"></i>
            </a>
            <a
              href="/lien-he"
              onClick={closeMenu}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
            >
              <span>Liên Hệ</span>
              <i className="fa-solid fa-address-book text-xs text-slate-400"></i>
            </a>
          </div>

         {/* DỊCH VỤ TRUY CẬP NHANH TRÊN MOBILE */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
              Các Giải Pháp Nổi Bật
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/qr-code"
                onClick={closeMenu}
                className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-qrcode text-emerald-600"></i> Tạo QR Miễn Phí
              </Link>
              <Link
                href="/truy-xuat-nguon-goc"
                onClick={closeMenu}
                className="p-2.5 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-shield-halved text-teal-600"></i> Truy Xuất Nguồn Gốc
              </Link>
              <Link
                href="/vr360"
                onClick={closeMenu}
                className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-cube text-indigo-600"></i> Thực Tế Ảo VR360
              </Link>
              <Link
                href="/pos"
                onClick={closeMenu}
                className="p-2.5 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-cash-register text-blue-600"></i> Phần Mềm POS
              </Link>
              <Link
                href="/zns"
                onClick={closeMenu}
                className="p-2.5 bg-sky-50 text-sky-700 rounded-xl hover:bg-sky-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-comment-sms text-sky-600"></i> Chăm Sóc ZNS
              </Link>
              <Link
                href="/web"
                onClick={closeMenu}
                className="p-2.5 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-laptop-code text-purple-600"></i> Thiết Kế Website
              </Link>
              <Link
                href="/erp"
                onClick={closeMenu}
                className="p-2.5 bg-amber-50 text-amber-700 rounded-xl hover:bg-amber-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-chart-pie text-amber-600"></i> Quản Trị ERP
              </Link>
              <Link
                href="/data-bi"
                onClick={closeMenu}
                className="p-2.5 bg-violet-50 text-violet-700 rounded-xl hover:bg-violet-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-chart-line text-violet-600"></i> Hạ Tầng Dữ Liệu & BI
              </Link>
              <Link
                href="/hop-dong-dien-tu"
                onClick={closeMenu}
                className="p-2.5 bg-rose-50 text-rose-700 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-file-signature text-rose-600"></i> Hợp Đồng Số
              </Link>
              <Link
                href="/cloud-server"
                onClick={closeMenu}
                className="p-2.5 bg-cyan-50 text-cyan-700 rounded-xl hover:bg-cyan-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-server text-cyan-600"></i> Cloud Server
              </Link>
              <Link
                href="/ban-quyen"
                onClick={closeMenu}
                className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-key text-indigo-600"></i> Bản Quyền Key
              </Link>
            </div>
          </div>

          {/* HOTLINE ACTION BUTTON FOR MOBILE */}
          <div className="pt-2">
            <a
              href="tel:02462927089"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <i className="fa-solid fa-phone"></i> Hotline: 0246.29.27.089
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}