"use client";

import { useCallback, useMemo } from "react";
import {
  ProvisionDetailFaq,
  findByCodeOrSlug,
  getProvisionDetail,
} from "@/shared/provision";
import { CACHE_TTL, cacheKey } from "@/lib/cache";
import { useAsyncData } from "./useAsyncData";
import { useProvisions } from "./useProvisions";

export interface FaqItem {
  id?: string;
  q: string;
  a: string;
  displayOrder?: number;
}

export interface ProvisionContent {
  htmlContent?: string;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
  faqs: FaqItem[];
  /** `false` khi backend chưa có nội dung cho provision này (204/404). */
  exists: boolean;
}

export interface UseProvisionContentResult {
  content: ProvisionContent | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/** Lọc FAQ đang hoạt động, sắp theo displayOrder rồi map sang dạng UI dùng. */
export function toFaqItems(faqs?: ProvisionDetailFaq[] | null): FaqItem[] {
  if (!faqs) return [];

  return faqs
    .filter((faq) => !faq.status || faq.status.toUpperCase() === "ACTIVE")
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((faq) => ({
      id: faq.id,
      q: faq.question,
      a: faq.answer,
      displayOrder: faq.displayOrder,
    }));
}

/**
 * Tải nội dung landing page của một provision.
 *
 * Hàm thuần async (không phải hook) để dùng lại được ở cả hook đơn, hook batch và
 * prefetch. Backend hiện trả 404 (hoặc 500 problem-json) khi provision chưa có
 * detail; `request()` đã chuẩn hoá hai trường hợp đó thành `data: null`.
 */
export async function loadProvisionContent(
  provisionId: string
): Promise<ProvisionContent> {
  const res = await getProvisionDetail(provisionId);

  if (!res.success) {
    throw new Error(res.message || "Không thể tải nội dung dịch vụ");
  }

  if (!res.data) {
    return { faqs: [], exists: false };
  }

  return {
    htmlContent: res.data.htmlContent,
    seoMetadata: res.data.seoMetadata,
    faqs: toFaqItems(res.data.faqs),
    exists: true,
  };
}

/**
 * Nội dung chi tiết của một provision, tra theo code HOẶC slug.
 *
 * Là lớp resolve code -> provisionId duy nhất, dùng chung cho ServiceContent và
 * useProvisionFaq, để logic tìm provision không bị lặp ở nhiều nơi.
 */
export function useProvisionContentByCode(identifier: string): UseProvisionContentResult {
  const {
    provisions,
    loading: provisionsLoading,
    error: provisionsError,
  } = useProvisions();

  const target = useMemo(
    () => (identifier ? findByCodeOrSlug(provisions, identifier) : undefined),
    [provisions, identifier]
  );

  const { content, loading, error, refresh } = useProvisionContent(target?.id ?? null);

  return {
    content,
    loading: provisionsLoading || loading,
    error: provisionsError ?? error,
    refresh,
  };
}

/** Nội dung chi tiết (HTML + SEO + FAQ) của một provision. */
export function useProvisionContent(
  provisionId: string | null
): UseProvisionContentResult {
  const loader = useCallback(() => loadProvisionContent(provisionId as string), [
    provisionId,
  ]);

  const key = provisionId ? cacheKey.content(provisionId) : null;

  const { data, loading, error, refresh } = useAsyncData<ProvisionContent>(
    key,
    loader,
    { ttl: CACHE_TTL.CONTENT, errorMessage: "Không thể tải nội dung dịch vụ" }
  );

  return { content: data, loading, error, refresh };
}

/**
 * Tải nhiều provision detail song song nhưng có giới hạn concurrency.
 *
 * Backend không có endpoint trả danh sách provision-details nên muốn lấy nhiều
 * nội dung buộc phải gọi từng id; giới hạn số request đồng thời để không dội API.
 */
export async function fetchMultipleContents(
  provisionIds: string[],
  concurrency: number = 3
): Promise<Map<string, ProvisionContent>> {
  const queue = [...new Set(provisionIds)];
  const results = new Map<string, ProvisionContent>();
  let cursor = 0;

  const worker = async () => {
    while (cursor < queue.length) {
      const id = queue[cursor++];
      try {
        results.set(id, await loadProvisionContent(id));
      } catch (err: unknown) {
        console.warn(`[fetchMultipleContents] Failed for ${id}:`, err);
        results.set(id, { faqs: [], exists: false });
      }
    }
  };

  const workerCount = Math.max(1, Math.min(concurrency, queue.length));
  await Promise.all(Array.from({ length: workerCount }, worker));

  return results;
}

/** Bản hook của `fetchMultipleContents`, dùng cho dashboard/admin. */
export function useMultipleContents(
  provisionIds: string[],
  concurrency: number = 3
) {
  const key = useMemo(
    () => (provisionIds.length > 0 ? `contents:${provisionIds.join(",")}` : null),
    [provisionIds]
  );

  const loader = useCallback(
    () => fetchMultipleContents(provisionIds, concurrency),
    [provisionIds, concurrency]
  );

  const { data, loading, error, refresh } = useAsyncData<
    Map<string, ProvisionContent>
  >(key, loader, {
    ttl: CACHE_TTL.CONTENT,
    errorMessage: "Không thể tải danh sách nội dung dịch vụ",
  });

  return { contents: data ?? new Map<string, ProvisionContent>(), loading, error, refresh };
}
