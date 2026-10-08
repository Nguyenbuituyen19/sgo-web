"use client";

import { useProvisionPricing } from "@/hooks/useProvisionPricing";
import PriceTable, {
  PRICE_TABLE_THEME_BLUE,
} from "@/components/shared/PriceTable";

interface ServicePricingProps {
  /** Code hoặc slug của provision (chính là segment trên URL). */
  code: string;
}

export default function ServicePricing({ code }: ServicePricingProps) {
  const { services, loading, error } = useProvisionPricing(code);

  return (
    <section id="pricing" className="py-20 bg-slate-100/60 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Bảng Giá Dịch Vụ
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-light">
            Lựa chọn gói phù hợp nhất với nhu cầu của doanh nghiệp bạn.
          </p>
        </div>

        <PriceTable
          services={services}
          loading={loading}
          error={error}
          theme={PRICE_TABLE_THEME_BLUE}
          ctaHref="#contact-form"
          loadingText="Đang tải bảng giá dịch vụ..."
          maxVisible={6}
          viewMoreHref={`/dich-vu/${code}`}
          viewMoreLabel="Xem thêm"
        />
      </div>
    </section>
  );
}
