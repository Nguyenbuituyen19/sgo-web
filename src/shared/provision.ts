import { request, ApiResponse } from "./client";

export interface ProvisionItem {
  id: string;
  code: string;
  name: string;
  description?: string;
  status: string;
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
  /** GET /api/v1/provision — danh sách dịch vụ active (công khai). */
  getProvisions(): Promise<ApiResponse<ProvisionItem[]>> {
    return request<ProvisionItem[]>({
      method: "GET",
      url: "/api/v1/provision",
    });
  },

  /** GET /api/v1/provision-details/{provisionId} — chi tiết landing page và FAQs. */
  getProvisionDetail(provisionId: string): Promise<ApiResponse<ProvisionDetail>> {
    return request<ProvisionDetail>({
      method: "GET",
      url: `/api/v1/provision-details/${encodeURIComponent(provisionId)}`,
    });
  },
};

export const { getProvisions, getProvisionDetail } = provisionApi;
