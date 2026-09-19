"use client";

import { useProvisionPricing, parseFeatures } from "@/hooks/useProvisionPricing";

export default function EmailPricing() {
  const { services, loading, error } = useProvisionPricing("zns");

  return (
    <div id="pricing" className="mb-24">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
          Bảng giá tối ưu
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Lựa Chọn Gói Phù Hợp Với Quy Mô Doanh Nghiệp
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-amber-600"></i>
          <p className="mt-4 text-slate-500 text-sm">Đang tải bảng giá dịch vụ Email &amp; ZNS...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 text-sm">{error}</div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-sm">Đang cập nhật bảng giá dịch vụ.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => {
            const isPopular = index === 1;
            const features = parseFeatures(service.featuresIncluded);
            return (
              <div
                key={service.id}
                className={`rounded-3xl p-8 shadow-sm flex flex-col justify-between relative ${
                  isPopular
                    ? "bg-slate-900 text-white border-2 border-amber-500 shadow-xl transform md:-translate-y-2"
                    : "bg-white border border-slate-200/80"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow">
                    Lựa chọn phổ biến nhất
                  </div>
                )}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className={`text-xs font-bold uppercase tracking-wider ${isPopular ? "text-amber-400" : "text-slate-400"}`}>
                      Gói {index + 1}
                    </span>
                    <h3 className={`text-xl font-extrabold ${isPopular ? "text-white" : "text-slate-900"}`}>{service.name}</h3>
                  </div>
                  <div className={`py-4 border-y ${isPopular ? "border-slate-800" : "border-slate-100"}`}>
                    <span className={`text-3xl font-black ${isPopular ? "text-amber-400" : "text-slate-900"}`}>
                      {service.price > 0 ? service.price.toLocaleString("vi-VN") + "đ" : "Liên hệ"}
                    </span>
                    {service.price > 0 && <span className="text-xs text-slate-400"> / tháng</span>}
                  </div>
                  <ul className={`space-y-3 text-xs ${isPopular ? "text-slate-300" : "text-slate-600"}`}>
                    {features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <i className={`fa-solid fa-check ${isPopular ? "text-amber-400" : "text-emerald-500"}`}></i> {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4">
                  <a
                    href="#register-email"
                    className={`block w-full py-3 text-center font-semibold rounded-xl text-sm transition-colors ${
                      isPopular
                        ? "bg-amber-600 hover:bg-amber-500 text-white shadow-md"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    Đăng ký ngay
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
