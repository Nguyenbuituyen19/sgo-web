"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArticleSummaryResponse,
  CategoryResponse,
} from "@/shared/news";

interface NewsGridProps {
  articles?: ArticleSummaryResponse[];
  categories?: CategoryResponse[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
  loading?: boolean;
}

export default function NewsGrid({
  articles: propArticles,
  categories: propCategories,
  selectedCategory: propCategory,
  onSelectCategory,
  searchQuery: propQuery,
  loading = false,
}: NewsGridProps = {}) {
  const [internalCategory, setInternalCategory] = useState("Tất cả");
  const [internalQuery, setInternalQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const selectedCategory = propCategory !== undefined ? propCategory : internalCategory;
  const searchQuery = propQuery !== undefined ? propQuery : internalQuery;

  // Dữ liệu thực tế từ API, không fallback mock
  const allArticles = propArticles || [];
  const allCategories = propCategories || [];

  // Compute dynamic category counts
  const categoryCounts = [
    { name: "Tất cả", slug: "", count: allArticles.length },
    ...allCategories.map((c) => ({
      name: c.name,
      slug: c.slug,
      count: allArticles.filter(
        (a) =>
          a.categoryId === c.id ||
          a.categorySlug === c.slug ||
          a.categoryName.toLowerCase() === c.name.toLowerCase()
      ).length,
    })),
  ];

  // Filter Articles based on category and search query
  const filteredArticles = allArticles.filter((art) => {
    const matchesCategory =
      selectedCategory === "Tất cả" ||
      art.categoryName === selectedCategory ||
      art.categorySlug === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.summary && art.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination (6 articles per page)
  const pageSize = 6;
  const totalPages = Math.ceil(filteredArticles.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + pageSize);

  // Top Trending Articles (sorted by viewCount)
  const trendingArticles = [...allArticles]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  const handleCategoryClick = (catName: string) => {
    setInternalCategory(catName);
    setCurrentPage(1);
    onSelectCategory?.(catName);
  };

  return (
    <section className="w-full py-10 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MAIN ARTICLES GRID COLUMN (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedCategory === "Tất cả" ? "Tất Cả Bài Viết" : selectedCategory}
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Hiển thị {filteredArticles.length} bài viết
              </span>
            </div>

            {/* LOADING STATE */}
            {loading && (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-medium text-slate-500">Đang tải bài viết...</span>
              </div>
            )}

            {/* EMPTY STATE (KHI KHÔNG CÓ DỮ LIỆU TỪ API) */}
            {!loading && filteredArticles.length === 0 ? (
              <div className="py-16 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="material-symbols-outlined text-[48px] text-slate-300">
                  search_off
                </span>
                <p className="text-base font-bold text-slate-800 mt-2">
                  Chưa có bài viết nào
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Hiện chưa có bài viết nào trong danh mục hoặc khớp với từ khóa tìm kiếm.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedArticles.map((art) => {
                  const articleUrl = `/tin-tuc/${art.categorySlug}/${art.slug}`;
                  const formattedDate = art.publishedAt
                    ? new Date(art.publishedAt).toLocaleDateString("vi-VN")
                    : "Mới cập nhật";

                  return (
                    <article
                      key={art.id}
                      className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div>
                        {/* Image 16:9 */}
                        <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                          <img
                            src={
                              art.thumbnail ||
                              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                            }
                            alt={art.thumbnailAlt || art.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-blue-700 text-[11px] font-bold shadow-xs">
                            {art.categoryName}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-normal">
                            <span>{formattedDate}</span>
                            <span>·</span>
                            <span>{art.readTime ? `${art.readTime} phút đọc` : "5 phút đọc"}</span>
                            {art.viewCount !== undefined && (
                              <>
                                <span>·</span>
                                <span className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[13px]">visibility</span>
                                  {art.viewCount}
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            <Link href={articleUrl}>{art.title}</Link>
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mt-1">
                            {art.summary}
                          </p>
                        </div>
                      </div>

                      {/* Footer Read Link */}
                      <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={articleUrl}
                          className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-0.5"
                        >
                          <span>Đọc tiếp</span>
                          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-100">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border text-sm transition-colors ${
                    currentPage <= 1
                      ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                      : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200 cursor-pointer"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isActive = p === currentPage;
                  return (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border text-sm transition-colors ${
                    currentPage >= totalPages
                      ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                      : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200 cursor-pointer"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR WIDGETS COLUMN (4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* WIDGET 1: CATEGORIES LIST */}
            {allCategories.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                <h3 className="text-base font-bold text-slate-950 pb-3 border-b border-slate-200/80 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-blue-600">category</span>
                  <span>Danh Mục Bài Viết</span>
                </h3>
                <ul className="flex flex-col divide-y divide-slate-200/60 mt-3 text-xs sm:text-sm">
                  {categoryCounts.map((c) => {
                    const isCatActive = selectedCategory === c.name || (c.slug && selectedCategory === c.slug);
                    return (
                      <li key={c.slug || c.name} className="py-2.5 flex items-center justify-between group">
                        <button
                          onClick={() => handleCategoryClick(c.name)}
                          className={`font-medium transition-colors text-left cursor-pointer ${
                            isCatActive ? "text-blue-600 font-bold" : "text-slate-700 hover:text-blue-600"
                          }`}
                        >
                          {c.name}
                        </button>
                        <span className="px-2 py-0.5 rounded-full bg-slate-200/60 text-slate-600 font-mono text-[11px] font-semibold">
                          {c.count}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* WIDGET 2: TRENDING POSTS */}
            {trendingArticles.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                <h3 className="text-base font-bold text-slate-950 pb-3 border-b border-slate-200/80 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-blue-600">trending_up</span>
                  <span>Bài Viết Xem Nhiều</span>
                </h3>
                <div className="flex flex-col gap-4 mt-4">
                  {trendingArticles.map((t, index) => {
                    const trendingUrl = `/tin-tuc/${t.categorySlug}/${t.slug}`;
                    const formattedDate = t.publishedAt
                      ? new Date(t.publishedAt).toLocaleDateString("vi-VN")
                      : "Mới cập nhật";

                    return (
                      <div key={t.id} className="flex items-start gap-3 group">
                        <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          0{index + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            <Link href={trendingUrl}>{t.title}</Link>
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <span>{formattedDate}</span>
                            {t.viewCount !== undefined && (
                              <>
                                <span>·</span>
                                <span>{t.viewCount} lượt xem</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* WIDGET 3: NEWSLETTER SUBSCRIBE BOX */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 text-white shadow-md relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-blue-600/30 blur-2xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">mail</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Đăng Ký Nhận Tin Công Nghệ
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  Nhận các bài phân tích kỹ thuật, cập nhật hạ tầng Cloud &amp; giải pháp AI hàng tuần trực tiếp vào hòm thư.
                </p>

                {subscribed ? (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-semibold flex items-center gap-2 mt-2">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Cảm ơn bạn đã đăng ký thành công!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-2">
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Nhập địa chỉ email của bạn..."
                      className="w-full h-10 px-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
                    >
                      Đăng ký ngay
                    </button>
                  </form>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
