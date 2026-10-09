"use client";

import Link from "next/link";
import { ProvisionServiceItem } from "@/shared/provision";

/**
 * Bảng giá dùng chung cho mọi trang dịch vụ.
 *
 * Phần được chia sẻ ở đây là *thân* bảng giá: xử lý 4 trạng thái
 * (loading / error / empty / có dữ liệu), lưới card, nhãn gói, định dạng giá và
 * cách render danh sách tính năng. Trước đây khối này bị copy nguyên bản vào
 * WebPricing, ContractPricing, VrPricing, EmailPricing, LicenseProducts...
 *
 * Phần *khung trang* (tiêu đề section, badge, banner đặc quyền...) vẫn thuộc về
 * từng trang vì đó là nội dung riêng của mỗi dịch vụ. Nhờ vậy component dùng chung
 * không ép mọi trang về cùng một tiêu đề.
 *
 * Khác biệt về màu sắc/thứ tự hiển thị được truyền qua `theme` — các preset bên
 * dưới tái tạo đúng class Tailwind mà từng trang đang dùng, nên việc chuyển sang
 * component chung không làm đổi giao diện.
 */
export interface PriceTableTheme {
  /** Lưới bao quanh các card. */
  grid: string;
  /** Class nền của mọi card. */
  card: string;
  /** Class thêm cho card nổi bật. */
  cardPopular: string;
  /** Class thêm cho card thường. */
  cardDefault: string;
  /** Nhãn "phổ biến nhất" ở mép trên card. */
  popularBadge: string;
  /** Nhãn "Gói N". */
  tier: string;
  /** Hậu tố sau giá (ví dụ " / Trọn gói"). Bỏ trống nếu không dùng. */
  priceSuffix?: string;
  featureList: string;
  featureItem: string;
  featureIcon: string;
  /** Class chung của nút CTA. */
  cta: string;
  ctaPopular: string;
  ctaDefault: string;
  ctaLabelPopular: string;
  ctaLabelDefault: string;
  /** Trạng thái loading/empty. */
  stateWrapper: string;
  stateIcon: string;
  stateText: string;
  errorText: string;
  emptyText: string;
}

/** Preset tím — dùng cho trang Thiết kế Website. */
export const PRICE_TABLE_THEME_PURPLE: PriceTableTheme = {
  grid: "grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-8 items-stretch",
  card:
    "price-card h-full bg-white rounded-3xl p-8 border shadow-sm space-y-6 flex flex-col justify-between relative",
  cardPopular: "border-2 border-purple-500 shadow-xl",
  cardDefault: "border-slate-200/80",
  popularBadge:
    "absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full",
  tier:
    "text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded-md inline-block",
  priceSuffix: "text-xs text-slate-400",
  featureList: "space-y-3 text-xs text-slate-600 font-light",
  featureItem: "flex gap-2 items-start",
  featureIcon: "fa-solid fa-check text-emerald-500 mt-0.5 shrink-0",
  cta: "block text-center font-semibold py-3 rounded-xl text-xs transition-colors mt-6",
  ctaPopular: "bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-500/10",
  ctaDefault: "border border-purple-200 text-purple-600 hover:bg-purple-50",
  ctaLabelPopular: "Chọn Gói Tiêu Chuẩn",
  ctaLabelDefault: "Liên Hệ Khảo Sát",
  stateWrapper: "text-center py-10",
  stateIcon: "fa-solid fa-spinner fa-spin text-3xl text-purple-600",
  stateText: "mt-4 text-slate-500",
  errorText: "text-center py-10 text-red-500",
  emptyText: "text-center py-10 text-slate-500",
};

/** Preset xanh dương — dùng cho trang Hợp đồng điện tử. */
export const PRICE_TABLE_THEME_BLUE: PriceTableTheme = {
  grid: "grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-8 items-stretch",
  card:
    "price-card h-full bg-white rounded-3xl p-8 border space-y-6 flex flex-col justify-between relative",
  cardPopular: "border-2 border-blue-500 shadow-xl",
  cardDefault: "border-slate-200 shadow-sm",
  popularBadge:
    "absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full",
  tier:
    "text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md inline-block",
  featureList: "space-y-3 text-xs text-slate-600 font-light",
  featureItem: "flex gap-2 items-center",
  featureIcon: "fa-solid fa-check text-emerald-500",
  cta: "block text-center font-semibold py-3 rounded-xl text-xs transition-colors mt-6",
  ctaPopular: "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/10",
  ctaDefault: "border border-blue-200 text-blue-600 hover:bg-blue-50",
  ctaLabelPopular: "Đăng Ký Gói",
  ctaLabelDefault: "Liên Hệ Tư Vấn",
  stateWrapper: "text-center py-12",
  stateIcon: "fa-solid fa-spinner fa-spin text-3xl text-blue-600",
  stateText: "mt-4 text-slate-500 text-sm",
  errorText: "text-center py-12 text-red-500 text-sm",
  emptyText: "text-center py-12 text-slate-500 text-sm",
};

export interface PriceTableProps {
  services: ProvisionServiceItem[];
  loading: boolean;
  error: string | null;
  theme: PriceTableTheme;
  /** Vị trí card được làm nổi bật. Mặc định 1 (thẻ giữa). */
  highlightIndex?: number;
  /** Nhãn hiển thị trên card nổi bật. */
  popularLabel?: string;
  /** Đích đến của nút CTA. */
  ctaHref?: string;
  loadingText?: string;
  emptyText?: string;
  /** Số lượng dịch vụ tối đa hiển thị ban đầu. Nếu không đặt, hiển thị tất cả. */
  maxVisible?: number;
  /** Mã/slug provision để chọn sẵn danh mục tương ứng trong trang danh mục. */
  catalogCategory?: string;
  /** Nhãn cho nút "Xem thêm". Mặc định là "Xem thêm". */
  viewMoreLabel?: string;
}

export default function PriceTable({
  services,
  loading,
  error,
  theme,
  highlightIndex = 1,
  popularLabel = "Phổ biến nhất",
  ctaHref = "#contact-form",
  loadingText = "Đang tải bảng giá...",
  emptyText = "Đang cập nhật bảng giá.",
  maxVisible,
  catalogCategory,
  viewMoreLabel = "Xem thêm",
}: PriceTableProps) {
  if (loading) {
    return (
      <div className={theme.stateWrapper}>
        <i className={theme.stateIcon}></i>
        <p className={theme.stateText}>{loadingText}</p>
      </div>
    );
  }

  if (error) {
    return <div className={theme.errorText}>{error}</div>;
  }

  if (services.length === 0) {
    return <div className={theme.emptyText}>{emptyText}</div>;
  }

  const visibleServices = maxVisible ? services.slice(0, maxVisible) : services;
  const hasMore = maxVisible ? services.length > maxVisible : false;

  return (
    <>
      <div className={theme.grid}>
        {visibleServices.map((service, index) => {
          const isPopular = index === highlightIndex;
          const hasPrice = service.price > 0;

          return (
            <div
              key={service.id}
              className={`${theme.card} ${isPopular ? theme.cardPopular : theme.cardDefault}`}
            >
              {isPopular && <div className={theme.popularBadge}>{popularLabel}</div>}

              <div className="space-y-4">
                <span className={theme.tier}>Gói {index + 1}</span>
                <h3 className="text-2xl font-black text-slate-900">{service.name}</h3>

                <div className="py-2 border-y border-slate-100">
                  <span className="text-3xl font-black text-slate-900">
                    {hasPrice ? service.price.toLocaleString("vi-VN") + "đ" : "Liên hệ"}
                  </span>
                  {hasPrice && theme.priceSuffix && (
                    <span className={theme.priceSuffix}> / Trọn gói</span>
                  )}
                </div>

                <ul className={theme.featureList}>
                  {service.featuresIncluded.map((feature, featureIndex) => (
                    <li key={featureIndex} className={theme.featureItem}>
                      <i className={theme.featureIcon}></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={ctaHref}
                className={`${theme.cta} ${isPopular ? theme.ctaPopular : theme.ctaDefault}`}
              >
                {isPopular ? theme.ctaLabelPopular : theme.ctaLabelDefault}
              </a>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <Link
            href={
              catalogCategory
                ? `/danh-muc-dich-vu?category=${encodeURIComponent(catalogCategory)}`
                : "/danh-muc-dich-vu"
            }
            className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors shadow-md shadow-purple-500/10"
          >
            {viewMoreLabel}
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      )}
    </>
  );
}
