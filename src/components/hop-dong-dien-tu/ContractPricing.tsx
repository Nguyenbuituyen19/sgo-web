"use client";

import { useProvisionPricing } from "@/hooks/useProvisionPricing";
import PriceTable, {
  PRICE_TABLE_THEME_BLUE,
} from "@/components/shared/PriceTable";

interface ContractPricingProps {
  /** Mã (hoặc slug) provision cần hiển thị bảng giá. */
  provisionCode?: string;
}

export default function ContractPricing({
  provisionCode = "hop-dong",
}: ContractPricingProps) {
  const { services, loading, error } = useProvisionPricing(provisionCode);

  return (
    <section id="pricing" className="py-20 bg-slate-100/60 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Chi Phí Linh Hoạt Theo Nhu Cầu Giao Dịch
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-light">
            Mua gói lượt ký bảo lưu vô thời hạn, không giới hạn tính năng và số lượng người dùng.
          </p>
        </div>

        <PriceTable
          services={services}
          loading={loading}
          error={error}
          theme={PRICE_TABLE_THEME_BLUE}
          popularLabel="Lựa chọn nhiều nhất"
          ctaHref="#register-form"
          loadingText="Đang tải bảng giá hợp đồng điện tử..."
          emptyText="Đang cập nhật bảng giá Hợp đồng điện tử."
          maxVisible={6}
          catalogCategory={provisionCode}
          viewMoreLabel="Xem thêm"
        />
      </div>
    </section>
  );
}
