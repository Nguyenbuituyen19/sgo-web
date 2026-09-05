"use client";

import { useState } from "react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  views: number;
}

interface NewsGridProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  searchQuery?: string;
}

export default function NewsGrid({
  selectedCategory: propCategory,
  onSelectCategory,
  searchQuery: propQuery,
}: NewsGridProps = {}) {
  const [internalCategory, setInternalCategory] = useState("Tất cả");
  const [internalQuery, setInternalQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const selectedCategory = propCategory !== undefined ? propCategory : internalCategory;
  const searchQuery = propQuery !== undefined ? propQuery : internalQuery;

  const articles: Article[] = [
    {
      id: "1",
      title: "Xu Hướng Chuyển Đổi Số Doanh Nghiệp 2026: Đột Phá Với Hạ Tầng Cloud Native",
      excerpt:
        "Tích hợp giải pháp Cloud Server hạ tầng phân tán giúp doanh nghiệp giảm thiểu nguy cơ quá tải hệ thống trong các mùa cao điểm mua sắm.",
      category: "Hạ tầng Cloud",
      date: "02 Tháng 9, 2026",
      readTime: "5 phút đọc",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
      views: 1420,
    },
    {
      id: "2",
      title: "Ứng Dụng AI Ops Trong Tự Động Hóa Vận Hành Hệ Thống Doanh Nghiệp Quy Mô Lớn",
      excerpt:
        "Công nghệ AI giúp phát hiện sự cố hệ thống sớm hơn 15 phút, tự động cân bằng tải và bảo vệ dữ liệu khách hàng theo thời gian thực.",
      category: "Dữ liệu & AI",
      date: "31 Tháng 8, 2026",
      readTime: "6 phút đọc",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      views: 1890,
    },
    {
      id: "3",
      title: "Tối Ưu Hóa Quản Trị Chuỗi Bán Lẻ Với Phần Mềm ERP & POS Kết Nối Đa Kênh",
      excerpt:
        "Đồng bộ hóa kho hàng, đơn hàng online và thanh toán mã VietQR tức thì giúp các chuỗi cửa hàng gia tăng 25% doanh thu hàng tháng.",
      category: "Quản trị ERP/CRM",
      date: "28 Tháng 8, 2026",
      readTime: "7 phút đọc",
      image:
        "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UXUlRTElQkElQTNuJTIwdHIlRTElQkIlOEIlMjBFUlAlMkZDUk18ZW58MHx8MHx8fDA%3D",
      views: 960,
    },
    {
      id: "4",
      title: "Tiêu Chuẩn Bảo Mật ISO 27001 & Mã Hóa AES-256 Trong Bảo Vệ Dữ Liệu Doanh Nghiệp",
      excerpt:
        "Tại sao bảo mật thông tin chuẩn Zero-Trust lại là điều kiện tiên quyết khi lưu trữ hợp đồng số và dữ liệu tài chính nội bộ.",
      category: "Bảo mật & Quy chuẩn",
      date: "25 Tháng 8, 2026",
      readTime: "6 phút đọc",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      views: 2150,
    },
    {
      id: "5",
      title: "Giải Pháp Chăm Sóc Khách Hàng Tự Động Qua Zalo ZNS: Tối Ưu Chi Phí Đơn Hàng",
      excerpt:
        "Gửi thông báo biến động số dư, mã xác nhận đơn và mã quà tặng với chi phí thấp hơn 70% so với SMS Brandname truyền thống.",
      category: "Chuyển đổi số",
      date: "22 Tháng 8, 2026",
      readTime: "4 phút đọc",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      views: 1640,
    },
    {
      id: "6",
      title: "Số Hóa Không Gian VR360: Đòn Bẩy Tăng Tỷ Lệ Đặt Phòng & Trải Nghiệm Khách Hàng",
      excerpt:
        "Ứng dụng công nghệ thực tế ảo 3D giúp các khách sạn, khu nghỉ dưỡng và bất động sản tương tác trực quan 360 độ với khách hàng.",
      category: "Xu hướng",
      date: "18 Tháng 8, 2026",
      readTime: "5 phút đọc",
      image:
        "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
      views: 1230,
    },
  ];

  // Category Counts
  const categoryCounts = [
    { name: "Tất cả", count: 35 },
    { name: "Hạ tầng Cloud", count: 18 },
    { name: "Dữ liệu & AI", count: 24 },
    { name: "Chuyển đổi số", count: 32 },
    { name: "Quản trị ERP/CRM", count: 15 },
    { name: "Bảo mật & Quy chuẩn", count: 12 },
    { name: "Xu hướng", count: 9 },
  ];

  // Filter Articles
  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === "Tất cả" || art.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Top Trending Articles
  const trendingArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput("");
    }
  };

  const handleCategoryClick = (catName: string) => {
    setInternalCategory(catName);
    onSelectCategory?.(catName);
  };

  return (
    <section className="w-full py-10 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* MAIN ARTICLES GRID COLUMN (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="text-base sm:text-lg font-bold text-slate-950 flex items-center gap-2">
                <span>Danh Sách Bài Viết</span>
                {selectedCategory !== "Tất cả" && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">
                    {selectedCategory}
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500">
                Hiển thị <span className="font-bold text-slate-900">{filteredArticles.length}</span> bài viết
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="py-16 text-center bg-slate-50 rounded-2xl border border-slate-200/80">
                <span className="material-symbols-outlined text-[48px] text-slate-300">
                  search_off
                </span>
                <p className="text-base font-bold text-slate-800 mt-2">
                  Không tìm thấy bài viết nào
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      {/* Image 16:9 */}
                      <div className="w-full h-48 overflow-hidden relative bg-slate-100">
                        <img
                          src={art.image}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-blue-700 text-[11px] font-bold shadow-xs">
                          {art.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-normal">
                          <span>{art.date}</span>
                          <span>·</span>
                          <span>{art.readTime}</span>
                        </div>

                        <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          <Link href={`#article-${art.id}`}>{art.title}</Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mt-1">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer Author */}
                    <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        href={`#article-${art.id}`}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-0.5"
                      >
                        <span>Đọc</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-100">
              <button
                disabled
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center cursor-not-allowed border border-slate-200 text-sm"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs">
                1
              </button>
              <button className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200 transition-colors">
                2
              </button>
              <button className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200 transition-colors">
                3
              </button>
              <button className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200 transition-colors">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* SIDEBAR WIDGETS COLUMN (4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* WIDGET 1: CATEGORIES LIST */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
              <h3 className="text-base font-bold text-slate-950 pb-3 border-b border-slate-200/80 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-blue-600">category</span>
                <span>Danh Mục Bài Viết</span>
              </h3>
              <ul className="flex flex-col divide-y divide-slate-200/60 mt-3 text-xs sm:text-sm">
                {categoryCounts.map((c) => {
                  const isCatActive = selectedCategory === c.name;
                  return (
                    <li key={c.name} className="py-2.5 flex items-center justify-between group">
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

            {/* WIDGET 2: TRENDING POSTS */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
              <h3 className="text-base font-bold text-slate-950 pb-3 border-b border-slate-200/80 flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-blue-600">trending_up</span>
                <span>Bài Viết Xem Nhiều</span>
              </h3>
              <div className="flex flex-col gap-4 mt-4">
                {trendingArticles.map((t, index) => (
                  <div key={t.id} className="flex items-start gap-3 group">
                    <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      0{index + 1}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={`#article-${t.id}`}>{t.title}</Link>
                      </h4>
                      <span className="text-[11px] text-slate-400">{t.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
