"use client";

import { useProvisionPricing, parseFeatures } from "@/hooks/useProvisionPricing";

export default function ContractPricing() {
  const { services, loading, error } = useProvisionPricing("hop-dong");

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

        {loading ? (
          <div className="text-center py-12">
            <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
            <p className="mt-4 text-slate-500 text-sm">Đang tải bảng giá hợp đồng điện tử...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 text-sm">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">Đang cập nhật bảng giá Hợp đồng điện tử.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {services.map((service, index) => {
              const isPopular = index === 1;
              const features = parseFeatures(service.featuresIncluded);
              return (
                <div
                  key={service.id}
                  className={`price-card bg-white rounded-3xl p-8 border space-y-6 flex flex-col justify-between relative ${
                    isPopular ? "border-2 border-blue-500 shadow-xl" : "border-slate-200 shadow-sm"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                      Lựa chọn nhiều nhất
                    </div>
                  )}
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                      Gói {index + 1}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">{service.name}</h3>
                    <div className="py-2 border-y border-slate-100">
                      <span className="text-3xl font-black text-slate-900">
                        {service.price > 0 ? service.price.toLocaleString("vi-VN") + "đ" : "Liên hệ"}
                      </span>
                    </div>
                    <ul className="space-y-3 text-xs text-slate-600 font-light">
                      {features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex gap-2 items-center">
                          <i className="fa-solid fa-check text-emerald-500"></i> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#register-form"
                    className={`block text-center font-semibold py-3 rounded-xl text-xs transition-colors mt-6 ${
                      isPopular
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/10"
                        : "border border-blue-200 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {isPopular ? "Đăng Ký Gói" : "Liên Hệ Tư Vấn"}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
