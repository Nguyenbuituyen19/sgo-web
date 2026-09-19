"use client";

import { useProvisionPricing, parseFeatures } from "@/hooks/useProvisionPricing";

export default function VrPricing() {
  const { services, loading, error } = useProvisionPricing("vr360");

  return (
    <section id="bao-gia" className="py-20 bg-slate-100 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Tiêu đề section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                03
              </span>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                Báo giá dịch vụ
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Công Nghệ Tour Thực Tế Áo VR360
            </h2>
          </div>
          <div>
            <a
              href="https://vr.sgodata.com/demo-resort"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:text-blue-700 text-sm flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200/85 shadow-xs transition-all"
            >
              <i className="fa-solid fa-eye"></i> Xem VR360 mẫu tại đây
            </a>
          </div>
        </div>

        {/* Banner Đặc quyền trọn đời & Tặng website */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 bg-white rounded-2xl p-6 mb-12 shadow-sm border border-slate-200/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5">
              <i className="fa-solid fa-crown"></i>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm md:text-base">
                ĐẶC QUYỀN TRỌN ĐỜI: THU PHÍ 01 LẦN DỰNG – MIỄN PHÍ DUY TRÌ TRỌN ĐỜI
              </h4>
              <p className="text-xs text-slate-500 font-light">
                Áp dụng khi duy trì hợp tác bán phòng cùng hệ thống của chúng tôi.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs shrink-0">
            <i className="fa-solid fa-gift"></i> TẶNG MIỄN PHÍ 01 WEBSITE RIÊNG
          </div>
        </div>

        {/* Danh Sách Gói Dịch Vụ Thuần Động */}
        {loading ? (
          <div className="text-center py-12">
            <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
            <p className="mt-4 text-slate-500 text-sm">Đang tải bảng giá VR360...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 text-sm">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">Đang cập nhật bảng giá dịch vụ VR360.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const isPopular = index === 2;
              const features = parseFeatures(service.featuresIncluded);
              return (
                <div
                  key={service.id}
                  className={`hover-scale bg-white rounded-2xl p-8 border ${
                    isPopular
                      ? "border-2 border-blue-600 shadow-md relative flex flex-col justify-between transform md:-translate-y-2"
                      : "border-slate-200/60 shadow-sm flex flex-col justify-between"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute top-0 right-6 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                      Khuyên dùng
                    </span>
                  )}
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                        Gói {index + 1}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 pt-2">
                        {service.name}
                      </h4>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-slate-900">
                      {service.price > 0 ? service.price.toLocaleString("vi-VN") : "Liên hệ"}{" "}
                      {service.price > 0 && <span className="text-sm font-semibold text-blue-600">đ</span>}
                    </div>
                    <hr className="border-slate-100" />
                    <ul className="text-xs text-slate-600 space-y-2.5 font-light">
                      {features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <i className="fa-solid fa-check text-emerald-500 shrink-0"></i>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#tu-van"
                    className={`mt-8 block w-full text-center py-3 font-medium rounded-xl text-sm transition-all ${
                      isPopular
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200"
                        : "bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700"
                    }`}
                  >
                    Đăng ký dùng
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
