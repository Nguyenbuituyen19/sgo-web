"use client";

import { useState } from "react";
import Link from "next/link";

export default function QrNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl font-bold shadow-md shrink-0">
            S
          </div>
          <div>
            <span className="font-black text-base sm:text-lg tracking-wider block leading-none text-slate-900">
              SGO QR
            </span>
            <span className="text-emerald-600 text-[9px] sm:text-[10px] uppercase font-bold tracking-widest block mt-0.5 sm:mt-1">
              Tạo mã QR miễn phí
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Trang Chủ
          </Link>
          <a href="#canh-bao" className="hover:text-emerald-600 transition-colors">
            Bẫy QR Hiện Nay
          </a>
          <a href="#uu-diem" className="hover:text-emerald-600 transition-colors">
            Điểm Vượt Trội
          </a>
          <a href="#so-sanh" className="hover:text-emerald-600 transition-colors">
            Bảng So Sánh
          </a>
          <a href="#tao-form" className="hover:text-emerald-600 transition-colors">
            Tạo Mã Ngay
          </a>
        </div>

        {/* DESKTOP PHONE */}
        <div className="hidden sm:block">
          <a
            href="tel:02462927089"
            className="flex items-center gap-2 text-slate-700 font-bold text-xs sm:text-sm bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors"
          >
            <i className="fa-solid fa-phone text-emerald-600"></i> 0246.29.27.089
          </a>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#tao-form"
            className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-sm"
          >
            Tạo Mã
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center text-base border border-slate-200"
          >
            <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-2 text-xs font-bold">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-700"
          >
            <i className="fa-solid fa-house mr-2 text-emerald-600"></i> Trang Chủ SGO
          </Link>
          <a
            href="#canh-bao"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-700"
          >
            <i className="fa-solid fa-triangle-exclamation mr-2 text-amber-500"></i> Bẫy QR Hiện Nay
          </a>
          <a
            href="#uu-diem"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-700"
          >
            <i className="fa-solid fa-wand-magic-sparkles mr-2 text-emerald-500"></i> Điểm Vượt Trội
          </a>
          <a
            href="#so-sanh"
            onClick={() => setIsOpen(false)}
            className="block py-2 px-3 rounded-lg hover:bg-slate-50 text-slate-700"
          >
            <i className="fa-solid fa-scale-balanced mr-2 text-blue-500"></i> Bảng So Sánh
          </a>
          <a
            href="#tao-form"
            onClick={() => setIsOpen(false)}
            className="block py-2.5 px-3 bg-emerald-600 text-white text-center rounded-xl font-bold mt-2"
          >
            Tạo Mã QR Ngay Tức Thì
          </a>
        </div>
      )}
    </nav>
  );
}
