"use client";

import { useEffect, useState } from "react";
import NewsHero from "./NewsHero";
import NewsFeatured from "./NewsFeatured";
import NewsGrid from "./NewsGrid";
import NewsCta from "./NewsCta";
import {
  newsApi,
  CategoryResponse,
  ArticleSummaryResponse,
} from "@/shared/news";

interface NewsMainContainerProps {
  initialCategory?: string;
}

export default function NewsMainContainer({ initialCategory }: NewsMainContainerProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || "Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [articles, setArticles] = useState<ArticleSummaryResponse[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories & initial articles on mount (Không dùng fallback)
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const catRes = await newsApi.getCategories();
        if (isMounted && catRes.data) {
          setCategories(catRes.data);
        }

        const artRes = await newsApi.getArticles({ limit: 30 });
        if (isMounted && artRes.data) {
          setArticles(artRes.data);
        }
      } catch (err) {
        console.warn("Lỗi khi kết nối API tin tức:", err);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch articles when category or search changes
  useEffect(() => {
    if (selectedCategory === "Tất cả" && !searchQuery) {
      return;
    }

    let isMounted = true;
    async function filterFromApi() {
      setLoading(true);
      try {
        let res;
        const matchedCat = categories.find(
          (c) => c.name === selectedCategory || c.slug === selectedCategory
        );

        if (matchedCat && matchedCat.slug) {
          res = await newsApi.getArticlesByCategory(matchedCat.slug, {
            keyword: searchQuery || undefined,
            limit: 30,
          });
        } else {
          res = await newsApi.getArticles({
            keyword: searchQuery || undefined,
            limit: 30,
          });
        }

        if (isMounted && res.data) {
          setArticles(res.data);
        }
      } catch (err) {
        console.warn("Lỗi khi lọc bài viết từ API:", err);
        if (isMounted) {
          setArticles([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timer = setTimeout(filterFromApi, 300);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery, categories]);

  // Lấy bài viết có số lượt xem lớn nhất làm bài viết nổi bật
  const featuredArticle =
    articles.length > 0
      ? [...articles].reduce((max, art) =>
          (art.viewCount || 0) > (max.viewCount || 0) ? art : max,
          articles[0]
        )
      : null;

  return (
    <>
      <NewsHero
        categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      {featuredArticle && <NewsFeatured article={featuredArticle} />}
      <NewsGrid
        articles={articles}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        loading={loading}
      />
      <NewsCta />
    </>
  );
}
