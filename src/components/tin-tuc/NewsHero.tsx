"use client";

import { useState } from "react";
import Link from "next/link";

interface NewsHeroProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export default function NewsHero({
  selectedCategory: propCategory,
  onSelectCategory,
  searchQuery: propQuery,
  onSearchChange,
}: NewsHeroProps = {}) {
  const [internalCategory, setInternalCategory] = useState("Tất cả");
  const [internalQuery, setInternalQuery] = useState("");

  const selectedCategory = propCategory !== undefined ? propCategory : internalCategory;
  const searchQuery = propQuery !== undefined ? propQuery : internalQuery;

  const categories = [
    "Tất cả",
    "Hạ tầng Cloud",
    "Dữ liệu & AI",
    "Chuyển đổi số",
    "Quản trị ERP/CRM",
    "Bảo mật & Quy chuẩn",
    "Xu hướng",
  ];

  const handleCategoryClick = (cat: string) => {
    setInternalCategory(cat);
    onSelectCategory?.(cat);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInternalQuery(val);
    onSearchChange?.(val);
  };

  return (
    <>
      <section className="w-full min-h-[600px] bg-slate-50 py-12 lg:py-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 font-semibold text-xs shadow-xs border border-blue-200/60">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              TIN TỨC &amp; XU HƯỚNG CÔNG NGHỆ
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Khai phóng sức mạnh dữ liệu &amp; <span className="text-blue-600">Đột phá công nghệ</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Cập nhật các bài viết chuyên sâu về hạ tầng đám mây, trí tuệ nhân tạo, an toàn thông tin và giải pháp quản trị doanh nghiệp hiện đại cùng đội ngũ chuyên gia SGODATA.
            </p>

            {/* SEARCH INPUT BAR */}
            <div className="w-full max-w-xl mt-2 relative">
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-slate-400 text-[20px] pointer-events-none">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Tìm kiếm bài viết, chủ đề Cloud, AI, ERP..."
                  className="w-full h-12 pl-11 pr-20 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15 shadow-xs transition-all"
                />
              </div>
            </div>
            {/* CATEGORY PILLS */}
            <div className="flex flex-wrap max-w-2xl items-center justify-center gap-2 pt-4">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs border border-blue-600"
                        : "bg-white text-slate-600 hover:text-slate-950 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
