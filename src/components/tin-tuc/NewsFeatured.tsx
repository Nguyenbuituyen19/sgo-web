import Link from "next/link";

export default function NewsFeatured() {
  const featuredArticle = {
    title: "Kiến trúc Lakehouse Thế Hệ Mới: Khai Phá Sức Mạnh Dữ Liệu Lớn Cho Doanh Nghiệp Việt",
    excerpt:
      "Khám phá cách SGODATA kết hợp khả năng lưu trữ linh hoạt của Data Lake và khả năng truy vấn ACID của Data Warehouse để giúp các doanh nghiệp sản xuất và tài chính tối ưu 40% chi phí hạ tầng.",
    category: "Dữ liệu & AI",
    date: "03 Tháng 9, 2026",
    readTime: "8 phút đọc",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwRcUCHxH3L4mQk1OTtD4V7UYvSZLbowHHV1G-QtJMXS7yTnnXnbSFZm0uX9C15tseBFlGQy_Ax0bS86BpMxK54rLbOtg39YFfplExBXlTYd8N8i_dyvT1g120Dbu1GDkLSVukXhfPgVZ72pdMLTME6AeyriwwlBdAvJkad9XKhTSLWZ6YFoLKmGGnta2iWWalvraJalYgvFTG-fRyzP3zt13GrKvjtGmB5z_o933_GJXsx5tnbv9Msg",
    slug: "kien-truc-lakehouse-the-he-moi-sgodata",
  };

  return (
    <section className="w-full py-10 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Column */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] overflow-hidden bg-slate-900">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden"></div>
              <div className="absolute top-4 left-4 bg-blue-600 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                BÀI VIẾT NỔI BẬT
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600">
                    {featuredArticle.category}
                  </span>
                  <span>·</span>
                  <span>{featuredArticle.date}</span>
                  <span>·</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors leading-tight">
                  <Link href={`#${featuredArticle.slug}`}>
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {featuredArticle.excerpt}
                </p>
              </div>

              {/* Author & Read More Footer */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between gap-4">
                <Link
                  href={`#${featuredArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group/link"
                >
                  <span>Đọc tiếp</span>
                  <span className="material-symbols-outlined text-[18px] group-hover/link:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
