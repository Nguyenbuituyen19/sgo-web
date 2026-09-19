"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { provisionApi, ProvisionItem, getProvisionRoute } from "@/shared/provision";

const PROVISION_ICON_MAP: Record<string, string> = {
  "qr-code": "fa-solid fa-qrcode",
  "truy-xuat": "fa-solid fa-shield-halved",
  "vr360": "fa-solid fa-cube",
  "pos": "fa-solid fa-cash-register",
  "zns": "fa-solid fa-comment-sms",
  "web": "fa-solid fa-laptop-code",
  "erp": "fa-solid fa-chart-pie",
  "data-bi": "fa-solid fa-chart-line",
  "hop-dong": "fa-solid fa-file-signature",
  "ha-tang": "fa-solid fa-server",
  "ban-quyen": "fa-solid fa-key",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [provisions, setProvisions] = useState<ProvisionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    provisionApi
      .getActiveProvisions()
      .then((res) => {
        if (res.success && res.data) {
          setProvisions(res.data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch active provisions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const services = provisions.map((item) => {
    const code = (item.code || "").toLowerCase();
    return {
      id: item.id,
      title: item.name,
      desc: item.description || "Giải pháp công nghệ tối ưu cho doanh nghiệp.",
      icon: PROVISION_ICON_MAP[code] || "fa-solid fa-box",
      href: getProvisionRoute(item.code),
    };
  });

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
              {loading ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  <i className="fa-solid fa-spinner fa-spin mr-2 text-blue-600"></i> Đang tải dịch vụ...
                </div>
              ) : services.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  Đang cập nhật danh sách dịch vụ.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {services.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="block p-3 rounded-xl hover:bg-blue-50/60 border border-transparent hover:border-blue-100 transition-all group/item"
                    >
                      {item.icon && <i className={`${item.icon} text-blue-600 mr-2`}></i>}
                      <div className="text-xs font-semibold text-slate-900 group-hover/item:text-blue-600 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 leading-snug line-clamp-2">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
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
          {services.length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-2">
                Các Giải Pháp Nổi Bật
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                {services.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={closeMenu}
                    className="p-2.5 bg-blue-50/60 text-slate-800 rounded-xl hover:bg-blue-100/60 transition-colors flex items-center gap-2 truncate"
                  >
                    <i className={`${item.icon} text-blue-600 shrink-0`}></i>
                    <span className="truncate">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

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