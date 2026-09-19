import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import NewsCta from "@/components/tin-tuc/NewsCta";
import ShareArticleButton from "@/components/tin-tuc/ShareArticleButton";
import {
  newsApi,
  ArticleDetailResponse,
  ArticleSummaryResponse,
} from "@/shared/news";

interface PageProps {
  params: Promise<{
    categorySlug: string;
    articleSlug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug, articleSlug } = await params;

  const res = await newsApi.getArticleBySlugs(categorySlug, articleSlug);
  const article = res.data;

  if (!article) {
    return {
      title: "Bài Viết Không Tồn Tại - SGODATA",
      robots: { index: false, follow: false },
    };
  }

  const title = `${article.seoMetadata?.metaTitle || article.title} - SGODATA`;
  const description =
    article.seoMetadata?.metaDescription ||
    article.summary ||
    "Bài viết chuyên sâu từ đội ngũ chuyên gia SGODATA.";
  const canonicalUrl = `https://sgodata.com/tin-tuc/${categorySlug}/${articleSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      images: [
        article.thumbnail || "https://sgodata.com/favicon-sgo.png",
      ],
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { categorySlug, articleSlug } = await params;

  // 1. Call Backend API: GET /api/v1/news/{categorySlug}/{articleSlug} (TC #28)
  const res = await newsApi.getArticleBySlugs(categorySlug, articleSlug);
  const article: ArticleDetailResponse | null = res.data || null;

  // If article not found at all in Backend API -> Render 404 state (không dùng fallback mock)
  if (!article) {
    return (
      <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <div className="max-w-md text-center bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md">
            <span className="material-symbols-outlined text-[64px] text-amber-500 mb-4 inline-block">
              article_shortcut
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Không Tìm Thấy Bài Viết
            </h1>
            <p className="text-sm text-slate-600 mb-6">
              Bài viết với đường dẫn này không tồn tại hoặc đã được gỡ bỏ khỏi hệ thống.
            </p>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Quay lại trang Tin Tức</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Related articles from Backend API (cùng chuyên mục, loại trừ bài viết hiện tại)
  let relatedArticles: ArticleSummaryResponse[] = [];
  try {
    const relRes = await newsApi.getArticlesByCategory(categorySlug, { limit: 4 });
    const items = Array.isArray(relRes.data) ? relRes.data : [];
    relatedArticles = items.filter((a) => a.id !== article.id).slice(0, 3);
  } catch {
    relatedArticles = [];
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Mới cập nhật";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: article.thumbnail,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Organization",
      name: "SGODATA",
      url: "https://sgodata.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Công ty Giải Pháp Công Nghệ SGODATA",
      logo: {
        "@type": "ImageObject",
        url: "https://sgodata.com/favicon-sgo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://sgodata.com/tin-tuc/${article.categorySlug}/${article.slug}`,
    },
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-grow w-full py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/tin-tuc" className="hover:text-blue-600 transition-colors">
              Tin tức
            </Link>
            <span>/</span>
            <Link
              href={`/tin-tuc/${article.categorySlug}`}
              className="hover:text-blue-600 transition-colors font-medium text-slate-700"
            >
              {article.categoryName}
            </Link>
          </nav>

          {/* ARTICLE HEADER */}
          <header className="flex flex-col gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Link
                href={`/tin-tuc/${article.categorySlug}`}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold hover:bg-blue-200 transition-colors"
              >
                {article.categoryName}
              </Link>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Live API
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* METADATA BAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  SGO
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-none">SGODATA Research</p>
                  <span className="text-[11px] text-slate-400">Đội ngũ chuyên gia công nghệ</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span>{formattedDate}</span>
                <span>·</span>
                <span>{article.readTime ? `${article.readTime} phút đọc` : "5 phút đọc"}</span>
                {article.viewCount !== undefined && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">visibility</span>
                      <span>{article.viewCount} lượt xem</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* FEATURED IMAGE */}
          {article.thumbnail && (
            <div className="my-8 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md bg-slate-900">
              <img
                src={article.thumbnail}
                alt={article.thumbnailAlt || article.title}
                className="w-full max-h-[480px] object-cover"
              />
            </div>
          )}

          {/* SUMMARY CALLOUT */}
          {article.summary && (
            <div className="p-5 sm:p-6 mb-8 rounded-2xl bg-blue-50/70 border border-blue-100 text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              <p>{article.summary}</p>
            </div>
          )}

          {/* ARTICLE MAIN CONTENT */}
          {article.content ? (
            <div
              className="article-content prose max-w-none text-slate-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          ) : (
            <p className="text-slate-600 italic">Bài viết chưa có nội dung chi tiết.</p>
          )}

          {/* ARTICLE FOOTER / SHARE */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Chuyên mục:{" "}
              <Link
                href={`/tin-tuc/${article.categorySlug}`}
                className="font-bold text-blue-600 hover:underline"
              >
                {article.categoryName}
              </Link>
            </div>

            <ShareArticleButton />
          </div>

          {/* RELATED ARTICLES */}
          {relatedArticles.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-950 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">auto_stories</span>
                <span>Bài Viết Liên Quan</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => {
                  const relUrl = `/tin-tuc/${rel.categorySlug}/${rel.slug}`;
                  return (
                    <Link
                      key={rel.id}
                      href={relUrl}
                      className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div className="h-36 overflow-hidden relative bg-slate-100">
                        <img
                          src={
                            rel.thumbnail ||
                            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
                          }
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex flex-col gap-2">
                        <span className="text-[11px] font-bold text-blue-600">
                          {rel.categoryName}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 leading-snug">
                          {rel.title}
                        </h4>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <NewsCta />
      <Footer />
    </div>
  );
}
