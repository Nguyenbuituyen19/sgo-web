"use client";

import { useProvisionPricing, parseFeatures } from "@/hooks/useProvisionPricing";

export default function WebPricing() {
  const { services, loading, error } = useProvisionPricing("web");

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

      {loading ? (
        <div className="text-center py-10">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-purple-600"></i>
          <p className="mt-4 text-slate-500">Đang tải bảng giá...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : services.length === 0 ? (
        <div className="text-center py-10 text-slate-500">Đang cập nhật bảng giá.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {services.map((service, index) => {
            const isPopular = index === 1; // Highlight thẻ ở giữa
            const features = parseFeatures(service.featuresIncluded);

            return (
              <div
                key={service.id}
                className={`price-card bg-white rounded-3xl p-8 border shadow-sm space-y-6 flex flex-col justify-between relative ${isPopular ? "max-w-sm border-2 border-purple-500 shadow-xl" : "border-slate-200/80"
                  }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                    Phổ biến nhất
                  </div>
                )}

                <div className="space-y-4">
                  <div className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded-md inline-block">
                    Gói {index + 1}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">{service.name}</h3>
                  <div className="py-2 border-y border-slate-100">
                    <span className="text-3xl font-black text-slate-900">
                      {service.price > 0 ? service.price.toLocaleString("vi-VN") + "đ" : "Liên hệ"}
                    </span>
                    {service.price > 0 && <span className="text-xs text-slate-400"> / Trọn gói</span>}
                  </div>
                  <ul className="space-y-3 text-xs text-slate-600 font-light">
                    {features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex gap-2 items-start">
                        <i className="fa-solid fa-check text-emerald-500 mt-0.5 shrink-0"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact-form"
                  className={`block text-center font-semibold py-3 rounded-xl text-xs transition-colors mt-6 ${isPopular
                      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-500/10"
                      : "border border-purple-200 text-purple-600 hover:bg-purple-50"
                    }`}
                >
                  {isPopular ? "Chọn Gói Tiêu Chuẩn" : "Liên Hệ Khảo Sát"}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
