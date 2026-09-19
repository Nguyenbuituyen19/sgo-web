import { request, ApiResponse } from "@/shared/client";

export interface CategoryResponse {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder?: number;
  status?: string;
  articleCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticleSummaryResponse {
  id: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  title: string;
  slug: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  summary?: string;
  readTime?: number;
  viewCount?: number;
  status?: string;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SeoMetadata {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

export interface ArticleDetailResponse extends ArticleSummaryResponse {
  content?: string;
  seoMetadata?: SeoMetadata;
}

interface ArticleQuery {
  keyword?: string;
  limit?: number;
  offset?: number;
}

const PUBLIC_ONLY = { publicOnly: true } as const;

export const newsApi = {
  /** GET /api/v1/news — danh sách chuyên mục */
  getCategories(limit = 100): Promise<ApiResponse<CategoryResponse[]>> {
    return request<CategoryResponse[]>({
      method: "GET",
      url: "/api/v1/news",
      params: { limit },
    });
  },

  /**
   * Backend không có endpoint tra cứu chuyên mục theo slug riêng,
   * nên ta lấy toàn bộ danh sách (ít) rồi tìm theo slug hoặc id.
   */
  async getCategoryByIdOrSlug(
    slugOrId: string
  ): Promise<ApiResponse<CategoryResponse | null>> {
    const res = await this.getCategories();
    const found =
      res.data?.find((c) => c.slug === slugOrId || c.id === slugOrId) ?? null;
    return { ...res, data: found };
  },

  /** GET /api/v1/news/articles — tất cả bài viết, có filter */
  getArticles(query: ArticleQuery = {}): Promise<ApiResponse<ArticleSummaryResponse[]>> {
    return request<ArticleSummaryResponse[]>({
      method: "GET",
      url: "/api/v1/news/articles",
      params: { ...PUBLIC_ONLY, ...query },
    });
  },

  /** GET /api/v1/news/{categorySlug} — bài viết theo chuyên mục */
  getArticlesByCategory(
    categorySlug: string,
    query: ArticleQuery = {}
  ): Promise<ApiResponse<ArticleSummaryResponse[]>> {
    return request<ArticleSummaryResponse[]>({
      method: "GET",
      url: `/api/v1/news/${encodeURIComponent(categorySlug)}`,
      params: { ...PUBLIC_ONLY, ...query },
    });
  },

  /** GET /api/v1/news/{categorySlug}/{slug} — chi tiết bài viết */
  getArticleBySlugs(
    categorySlug: string,
    slug: string
  ): Promise<ApiResponse<ArticleDetailResponse | null>> {
    return request<ArticleDetailResponse | null>({
      method: "GET",
      url: `/api/v1/news/${encodeURIComponent(categorySlug)}/${encodeURIComponent(slug)}`,
      params: PUBLIC_ONLY,
    });
  },
};
