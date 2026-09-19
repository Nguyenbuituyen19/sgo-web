"use client";

import { useProvisionPricing, parseFeatures } from "@/hooks/useProvisionPricing";

export default function LicenseProducts() {
  const { services, loading, error } = useProvisionPricing("ban-quyen");

  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Danh Mục Sản Phẩm Phổ Biến
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-light">
            Lựa chọn giải pháp tối ưu cho máy tính cá nhân và hệ thống máy chủ của bạn.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-600"></i>
            <p className="mt-4 text-slate-500 text-sm">Đang tải danh mục bản quyền...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 text-sm">{error}</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-sm">Đang cập nhật danh mục bản quyền.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const isPopular = index === 1;
              const features = parseFeatures(service.featuresIncluded);
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-2xl shadow-sm border p-6 flex flex-col justify-between relative transition-all ${
                    isPopular ? "border-2 border-indigo-600 hover:shadow-md" : "border-slate-200 hover:border-2 hover:border-indigo-600"
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3 right-6 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Bán Chạy
                    </span>
                  )}
                  <div>
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-4 font-bold">
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                    <ul className="mt-6 space-y-3 text-sm text-slate-600 font-light">
                      {features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center">
                          <i className="fa-solid fa-check text-emerald-500 mr-2"></i> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-xs text-slate-400 uppercase font-semibold">Giá từ</span>
                      <span className="text-2xl font-extrabold text-indigo-600">
                        {service.price > 0 ? service.price.toLocaleString("vi-VN") + "đ" : "Liên hệ"}
                      </span>
                    </div>
                    <a
                      href="https://zalo.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full block text-center font-medium py-2.5 rounded-lg transition-colors text-sm ${
                        isPopular
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                          : "bg-slate-900 hover:bg-indigo-600 text-white"
                      }`}
                    >
                      Đặt Mua Ngay
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
