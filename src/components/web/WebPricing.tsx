"use client";

import { useProvisionPricing } from "@/hooks/useProvisionPricing";
import PriceTable, {
  PRICE_TABLE_THEME_PURPLE,
} from "@/components/shared/PriceTable";

interface WebPricingProps {
  /** Mã (hoặc slug) provision cần hiển thị bảng giá. */
  provisionCode?: string;
}

export default function WebPricing({ provisionCode = "web" }: WebPricingProps) {
  const { services, loading, error } = useProvisionPricing(provisionCode);

  return (
    <section id="pricing" className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Bảng Giá Dịch Vụ Thiết Kế Web Minh Bạch
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-light">
          Không phát sinh chi phí ẩn. Lựa chọn gói tối ưu nhất cho chặng đường phát triển của doanh nghiệp.
        </p>
      </div>

      <PriceTable
        services={services}
        loading={loading}
        error={error}
        theme={PRICE_TABLE_THEME_PURPLE}
        ctaHref="#contact-form"
        maxVisible={6}
        viewMoreHref="/dich-vu-thiet-ke-web"
        viewMoreLabel="Xem thêm"
      />
    </section>
  );
}
