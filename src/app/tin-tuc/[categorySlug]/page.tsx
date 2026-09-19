import type { Metadata } from "next";
import Navbar from "@/components/layout/NavBar";
import NewsMainContainer from "@/components/tin-tuc/NewsMainContainer";
import Footer from "@/components/layout/Footer";
import { notFound } from "next/navigation";
import { newsApi } from "@/shared/news";

interface PageProps {
  params: Promise<{
    categorySlug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;

  // 1. Kiểm tra danh mục từ API backend
  const res = await newsApi.getCategoryByIdOrSlug(categorySlug);
  if (res.data) {
    const categoryName = res.data.name;
    const title = `${categoryName} - Tin Tức SGODATA`;
    const description = `Danh sách bài viết, phân tích chuyên sâu về ${categoryName} từ đội ngũ chuyên gia công nghệ SGODATA.`;

    return {
      title,
      description,
      alternates: {
        canonical: `https://sgodata.com/tin-tuc/${categorySlug}`,
      },
      openGraph: {
        type: "website",
        url: `https://sgodata.com/tin-tuc/${categorySlug}`,
        title,
        description,
        images: ["https://sgodata.com/favicon-sgo.png"],
      },
    };
  }

  return {
    title: "Không Tìm Thấy Chuyên Mục - SGODATA",
    robots: { index: false, follow: false },
  };
}

export default async function CategoryNewsPage({ params }: PageProps) {
  const { categorySlug } = await params;

  // Kiểm tra xem categorySlug có tồn tại trong backend không
  const res = await newsApi.getCategoryByIdOrSlug(categorySlug);
  if (!res.data) {
    // Không tìm thấy chuyên mục trong API backend -> Điều hướng 404 (Không dùng fallback mock)
    notFound();
  }
  const categoryName = res.data.name;

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">
        <NewsMainContainer initialCategory={categoryName} />
      </main>
      <Footer />
    </div>
  );
}
