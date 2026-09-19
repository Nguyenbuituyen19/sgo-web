import Link from "next/link";
import { ArticleSummaryResponse } from "@/shared/news";

interface NewsFeaturedProps {
  article?: ArticleSummaryResponse | null;
  articles?: ArticleSummaryResponse[];
}

export default function NewsFeatured({ article, articles }: NewsFeaturedProps = {}) {
  // Lấy bài viết được truyền vào hoặc bài viết có lượt xem cao nhất từ danh sách articles
  const currentArticle =
    article ??
    (articles && articles.length > 0
      ? [...articles].reduce((max, cur) =>
          (cur.viewCount || 0) > (max.viewCount || 0) ? cur : max,
          articles[0]
        )
      : null);

  // Không fallback gì nếu không có dữ liệu bài viết
  if (!currentArticle) {
    return null;
  }

  const articleUrl = `/tin-tuc/${currentArticle.categorySlug}/${currentArticle.slug}`;

  return (
    <section className="w-full py-10 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Column */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] overflow-hidden bg-slate-900">
              <img
                src={
                  currentArticle.thumbnail ||
                  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                }
                alt={currentArticle.thumbnailAlt || currentArticle.title}
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
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600">
                    {currentArticle.categoryName}
                  </span>
                  <span>·</span>
                  <span>
                    {currentArticle.publishedAt
                      ? new Date(currentArticle.publishedAt).toLocaleDateString("vi-VN")
                      : "Mới nhất"}
                  </span>
                  <span>·</span>
                  <span>{currentArticle.readTime ? `${currentArticle.readTime} phút đọc` : "5 phút đọc"}</span>
                  {currentArticle.viewCount !== undefined && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <span className="material-symbols-outlined text-[15px]">visibility</span>
                        {currentArticle.viewCount.toLocaleString("vi-VN")} lượt xem
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors leading-tight">
                  <Link href={articleUrl}>
                    {currentArticle.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {currentArticle.summary}
                </p>
              </div>

              {/* Author & Read More Footer */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between gap-4">
                <Link
                  href={articleUrl}
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
