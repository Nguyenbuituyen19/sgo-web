import { request, ApiResponse } from "./client";
import { CACHE_TTL, cache, cacheKey } from "@/lib/cache";

export interface ProvisionItem {
  id: string;
  code: string;
  name: string;
  description?: string;
  status: string;
  type?: string;
  slug?: string;
  parentId?: string | null;
  displayOrder?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Kiểu provision thực tế có trong bảng platform.provisions:
 * - "category": nhóm dịch vụ (có thể chứa provision con).
 * - "service": provision lá — đây mới là nơi gắn bảng giá (provision_services).
 * - "service-filter": lá dùng làm bộ lọc lựa chọn; backend seed tạm ở trạng thái
 *   DRAFT. Với frontend nó không phải category nên được xử lý như "service".
 */
export type ProvisionType = "category" | "service" | "service-filter";

/**
 * Kiểm tra provision có phải nhóm dịch vụ (category) hay không.
 * So sánh không phân biệt hoa/thường. Giữ tương thích ngược:
 * nếu backend chưa trả về `type` thì coi như category để menu không rỗng.
 */
export function isCategoryProvision(item?: Pick<ProvisionItem, "type"> | null): boolean {
  if (!item || item.type == null || String(item.type).trim() === "") return true;
  return String(item.type).trim().toLowerCase() === "category";
}

export interface ProvisionDetailFaq {
  id: string;
  provisionId: string;
  question: string;
  answer: string;
  displayOrder?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProvisionDetail {
  id: string;
  provisionId: string;
  slug: string;
  htmlContent?: string;
  contentData?: unknown;
  seoMetadata?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
  };
  faqs?: ProvisionDetailFaq[];
}

/**
 * Danh sách 10 mã Provision chuẩn hóa trong database (bảng platform.provisions).
 */
export const DB_PROVISION_CODES = [
  "vr360",
  "pos",
  "erp",
  "web",
  "zns",
  "truy-xuat",
  "hop-dong",
  "ha-tang",
  "qr-code",
  "contact",
] as const;

export type DbProvisionCode = typeof DB_PROVISION_CODES[number];

/**
 * Bảng ánh xạ mã Provision (code trong platform.provisions) sang đường dẫn trang (route) trên sgo-web.
 * Khớp 100% với 10 mã dịch vụ được seed trong database.
 */
export const PROVISION_ROUTE_MAP: Record<string, string> = {
  "vr360": "/vr360",
  "pos": "/pos",
  "erp": "/erp",
  "web": "/web",
  "zns": "/zns",
  "truy-xuat": "/truy-xuat-nguon-goc",
  "hop-dong": "/hop-dong-dien-tu",
  "ha-tang": "/ha-tang",
  "qr-code": "/qr-code",
  "contact": "/lien-he",
};

/**
 * Nhãn hiển thị dịch vụ chuẩn hóa dùng chung toàn website, khớp với database.
 */
export const PROVISION_LABELS: Record<string, string> = {
  vr360: "Số hóa không gian VR360",
  pos: "Phần mềm Quản lý Bán hàng & POS",
  erp: "Hệ thống Quản trị CRM / ERP",
  web: "Thiết kế Website Theo Yêu Cầu",
  zns: "Chăm Sóc Khách Hàng OA - ZNS",
  "truy-xuat": "Giải Pháp Truy Xuất Nguồn Gốc",
  "hop-dong": "Giải Pháp Hợp Đồng Điện Tử",
  "ha-tang": "Hạ Tầng & Lưu Trữ Cloud",
  "qr-code": "Giải Pháp & Tạo Mã QR",
  contact: "Liên Hệ & Tư Vấn Chung",
};

/**
 * Lấy route của provision theo code hoặc slug trong database.
 * Ưu tiên slug nếu có, sau đó tìm trong PROVISION_ROUTE_MAP theo provision code,
 * và tự động fallback về `/${code}` cho mọi provision mới được thêm vào database.
 */
export function getProvisionRoute(code?: string, slug?: string): string {
  if (slug && slug.trim()) {
    return `/${slug.trim().replace(/^\/+/, "")}`;
  }
  if (!code) return "/";
  const normalized = code.trim().toLowerCase();
  return PROVISION_ROUTE_MAP[normalized] || `/${normalized}`;
}

/**
 * Xây dựng Route Map động từ danh sách Provision lấy trực tiếp từ database.
 */
export function buildProvisionRouteMap(
  provisions: ProvisionItem[]
): Record<string, string> {
  const map: Record<string, string> = { ...PROVISION_ROUTE_MAP };
  for (const item of provisions) {
    if (item.code) {
      const normalized = item.code.trim().toLowerCase();
      if (!map[normalized]) {
        map[normalized] = `/${normalized}`;
      }
    }
  }
  return map;
}


export const provisionApi = {
  /** GET /api/v1/provision — danh sách dịch vụ (công khai). */
  getProvisions(): Promise<ApiResponse<ProvisionItem[]>> {
    return request<ProvisionItem[]>({
      method: "GET",
      url: "/api/v1/provision",
    });
  },

  /** GET /api/v1/provision/active — danh sách dịch vụ active (công khai). */
  getActiveProvisions(): Promise<ApiResponse<ProvisionItem[]>> {
    return request<ProvisionItem[]>({
      method: "GET",
      url: "/api/v1/provision/active",
    });
  },

  /** GET /api/v1/provision-details/{provisionId} — chi tiết landing page và FAQs. */
  getProvisionDetail(provisionId: string): Promise<ApiResponse<ProvisionDetail>> {
    return request<ProvisionDetail>({
      method: "GET",
      url: `/api/v1/provision-details/${encodeURIComponent(provisionId)}`,
    });
  },

  /** GET /api/v1/provision-services — toàn bộ gói dịch vụ của mọi provision. */
  getProvisionServices(): Promise<ApiResponse<RawProvisionService[]>> {
    return request<RawProvisionService[]>({
      method: "GET",
      url: "/api/v1/provision-services",
    });
  },

  /**
   * GET /api/v1/provision-services/provision/{provisionId} — lấy bảng giá theo provision.
   * Backend tự động xử lý:
   * - Nếu provision là "category": trả về tất cả service từ subtree (con/cháu)
   * - Nếu provision là "service" hoặc "service-filter": chỉ trả service trực tiếp
   */
  getProvisionServicesByProvision(
    provisionId: string
  ): Promise<ApiResponse<RawProvisionService[]>> {
    return request<RawProvisionService[]>({
      method: "GET",
      url: `/api/v1/provision-services/provision/${encodeURIComponent(provisionId)}`,
    });
  },
};

export const {
  getProvisions,
  getActiveProvisions,
  getProvisionDetail,
  getProvisionServices,
  getProvisionServicesByProvision,
} = provisionApi;

/**
 * Cách DUY NHẤT để lấy danh sách provision: gọi API, sort theo displayOrder và
 * ghi cache với khoá dùng chung.
 *
 * Hook React, prefetch khi hover và server component của route động đều đi qua
 * hàm này, nên không nơi nào tự fetch rồi tự quyết định thứ tự sắp xếp riêng.
 * Ném lỗi khi không lấy được dữ liệu để caller tự quyết định cách xử lý.
 */
export async function loadProvisions(
  options: { activeOnly?: boolean; ttl?: number } = {}
): Promise<ProvisionItem[]> {
  const { activeOnly = false, ttl = CACHE_TTL.PROVISIONS } = options;
  const key = cacheKey.provisions(activeOnly);

  const cached = cache.get<ProvisionItem[]>(key);
  if (cached) return cached;

  const res = activeOnly ? await getActiveProvisions() : await getProvisions();
  if (!res.success || !res.data) {
    throw new Error(res.message || "Không thể tải danh sách dịch vụ");
  }

  const sorted = [...res.data].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );
  cache.set(key, sorted, ttl);

  return sorted;
}

/* ------------------------------------------------------------------ *
 * Bảng giá dịch vụ (provision_services)
 * ------------------------------------------------------------------ */

/**
 * Một gói dịch vụ đã chuẩn hoá về dạng frontend dùng trực tiếp được.
 *
 * Backend trả `price` là number|string|null, `featuresIncluded` là
 * array|JSON-string|object, và `billingCycle` không thống nhất hoa/thường
 * ("month", "ONE_TIME", "MONTHLY", "YEARLY"). `normalizeProvisionService()`
 * là nơi duy nhất chịu trách nhiệm đưa payload thô về dạng dưới đây — component
 * không bao giờ phải tự parse.
 */
export interface ProvisionServiceItem {
  id: string;
  provisionId: string;
  name: string;
  /** 0 nghĩa là "Liên hệ" (backend chưa niêm yết giá). */
  price: number;
  originalPrice?: number;
  featuresIncluded: string[];
  /** Đã hạ chữ thường, ví dụ "one_time" | "month" | "monthly" | "yearly". */
  billingCycle?: string;
  displayOrder?: number;
  status?: string;
  sku?: string;
  currency?: string;
  specifications?: Record<string, unknown>;
}

/** Payload thô của /api/v1/provision-services trước khi chuẩn hoá. */
export interface RawProvisionService {
  id: string;
  provisionId: string;
  name: string;
  price?: unknown;
  originalPrice?: unknown;
  featuresIncluded?: unknown;
  billingCycle?: unknown;
  displayOrder?: number;
  status?: string;
  sku?: string;
  currency?: string;
  specifications?: Record<string, unknown>;
}

/** price nhận number | string | null | undefined -> number (0 nếu không đọc được). */
export function normalizePrice(price: unknown): number {
  if (typeof price === "number") return Number.isFinite(price) ? price : 0;
  if (typeof price === "string") {
    const parsed = parseFloat(price.replace(/[^\d.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

/**
 * featuresIncluded nhận array | JSON string | string phân tách | object -> string[].
 * Trả về mảng rỗng khi không có gì đọc được (backend để trống 85/123 gói).
 */
export function parseFeatures(featuresIncluded: unknown): string[] {
  if (!featuresIncluded) return [];

  if (Array.isArray(featuresIncluded)) {
    return featuresIncluded.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof featuresIncluded === "string") {
    try {
      const parsed: unknown = JSON.parse(featuresIncluded);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return featuresIncluded
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  }

  if (typeof featuresIncluded === "object" && featuresIncluded !== null) {
    return Object.values(featuresIncluded)
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  return [];
}

/** "ONE_TIME" | "month" | "MONTHLY" ... -> chữ thường, giữ nguyên giá trị gốc. */
export function normalizeBillingCycle(cycle: unknown): string | undefined {
  if (typeof cycle !== "string") return undefined;
  const normalized = cycle.trim().toLowerCase();
  return normalized === "" ? undefined : normalized;
}

/** Chuẩn hoá một gói dịch vụ thô từ backend. */
export function normalizeProvisionService(raw: RawProvisionService): ProvisionServiceItem {
  return {
    id: raw.id,
    provisionId: raw.provisionId,
    name: raw.name,
    price: normalizePrice(raw.price),
    originalPrice:
      raw.originalPrice === undefined || raw.originalPrice === null
        ? undefined
        : normalizePrice(raw.originalPrice),
    featuresIncluded: parseFeatures(raw.featuresIncluded),
    billingCycle: normalizeBillingCycle(raw.billingCycle),
    displayOrder: raw.displayOrder,
    status: raw.status,
    sku: raw.sku,
    currency: raw.currency,
    specifications: raw.specifications,
  };
}

/** Chuẩn hoá danh sách gói dịch vụ và sắp xếp ổn định theo displayOrder rồi giá. */
export function normalizeProvisionServices(
  raws: RawProvisionService[]
): ProvisionServiceItem[] {
  return raws
    .map(normalizeProvisionService)
    .sort(compareServices);
}

/** Thứ tự hiển thị bảng giá: displayOrder tăng dần, sau đó giá tăng dần, rồi tên. */
export function compareServices(a: ProvisionServiceItem, b: ProvisionServiceItem): number {
  const orderDiff = (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
  if (orderDiff !== 0) return orderDiff;
  const priceDiff = a.price - b.price;
  if (priceDiff !== 0) return priceDiff;
  return a.name.localeCompare(b.name, "vi");
}

/* ------------------------------------------------------------------ *
 * Cây provision
 * ------------------------------------------------------------------ */

/** Key gốc cho các provision không có parentId. */
export const PROVISION_TREE_ROOT = "root";

/** Map parentId -> danh sách provision con (đã sort theo displayOrder). */
export function buildProvisionTree(
  provisions: ProvisionItem[]
): Map<string, ProvisionItem[]> {
  const tree = new Map<string, ProvisionItem[]>();
  for (const item of provisions) {
    const key = item.parentId || PROVISION_TREE_ROOT;
    const bucket = tree.get(key);
    if (bucket) bucket.push(item);
    else tree.set(key, [item]);
  }
  return tree;
}

/** Các provision con trực tiếp của một provision. */
export function getChildren(
  tree: Map<string, ProvisionItem[]>,
  parentId: string | null
): ProvisionItem[] {
  return tree.get(parentId || PROVISION_TREE_ROOT) ?? [];
}

/** Tìm provision theo code (không phân biệt hoa/thường). */
export function findByCode(
  provisions: ProvisionItem[],
  code: string
): ProvisionItem | undefined {
  const target = code.trim().toLowerCase();
  return provisions.find((p) => (p.code || "").trim().toLowerCase() === target);
}

/** Tìm provision theo slug (không phân biệt hoa/thường). */
export function findBySlug(
  provisions: ProvisionItem[],
  slug: string
): ProvisionItem | undefined {
  const target = slug.trim().toLowerCase();
  return provisions.find((p) => (p.slug || "").trim().toLowerCase() === target);
}

/**
 * Tìm provision theo code, nếu không có thì thử theo slug.
 * Dùng cho route động: URL có thể là slug (/web-war-biz) hoặc code (/web).
 */
export function findByCodeOrSlug(
  provisions: ProvisionItem[],
  identifier: string
): ProvisionItem | undefined {
  return findByCode(provisions, identifier) ?? findBySlug(provisions, identifier);
}

/**
 * Tập id của provision gốc và toàn bộ provision con/cháu của nó.
 * Bảng giá không gắn vào category mà gắn vào các lá bên dưới (ví dụ category
 * `web` chứa `web-web-biz`, `web-web-ecom`, `web-web-custom`).
 * 
 * LƯU Ý: Hàm này vẫn được giữ để tương thích ngược, nhưng hiện tại backend đã
 * xử lý logic này trong endpoint `/api/v1/provision-services/provision/{id}`
 * bằng recursive CTE, nên frontend không cần tự gom nhóm nữa.
 */
export function collectProvisionSubtreeIds(
  provisions: ProvisionItem[],
  rootId: string
): string[] {
  const ids = new Set<string>([rootId]);
  const queue: string[] = [rootId];
  // `visited` chặn dữ liệu lỗi tạo vòng lặp cha-con vô hạn.
  const visited = new Set<string>([rootId]);

  while (queue.length > 0) {
    const current = queue.shift() as string;
    for (const child of provisions) {
      if (child.parentId !== current || visited.has(child.id)) continue;
      visited.add(child.id);
      ids.add(child.id);
      queue.push(child.id);
    }
  }

  return [...ids];
}

/**
 * Bảng giá của một provision = gói gắn vào chính nó + mọi gói gắn vào provision
 * con/cháu, đã chuẩn hoá và sắp xếp.
 * 
 * LƯU Ý: Hàm này vẫn được giữ để tương thích ngược, nhưng hiện tại backend đã
 * xử lý logic này trong endpoint `/api/v1/provision-services/provision/{id}`
 * bằng recursive CTE, nên frontend không cần tự gọi hàm này nữa.
 */
export function servicesForProvision(
  rawServices: RawProvisionService[],
  provisions: ProvisionItem[],
  rootId: string
): ProvisionServiceItem[] {
  const scope = new Set(collectProvisionSubtreeIds(provisions, rootId));
  return normalizeProvisionServices(
    rawServices.filter((service) => scope.has(service.provisionId))
  );
}
