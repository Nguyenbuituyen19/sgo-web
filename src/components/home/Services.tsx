"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { provisionApi, ProvisionItem, getProvisionRoute } from "@/shared/provision";

interface ServiceMetadata {
  icon: string;
  iconBg: string;
  iconColor: string;
  btnBg: string;
  btnHover: string;
  badge?: string;
  badgeColor?: string;
  linkText: string;
}

const SERVICE_META_MAP: Record<string, ServiceMetadata> = {
  "qr-code": {
    icon: "fa-solid fa-qrcode",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    btnBg: "bg-emerald-600",
    btnHover: "hover:bg-emerald-700",
    badge: "Miễn phí trọn đời",
    badgeColor: "bg-emerald-50 text-emerald-600",
    linkText: "Trải nghiệm ngay",
  },
  "truy-xuat": {
    icon: "fa-solid fa-shield-halved",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    btnBg: "bg-teal-600",
    btnHover: "hover:bg-teal-700",
    badge: "Minh bạch chuỗi cung ứng",
    badgeColor: "bg-teal-50 text-teal-600",
    linkText: "Khám phá giải pháp",
  },
  vr360: {
    icon: "fa-solid fa-cube",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    btnBg: "bg-indigo-600",
    btnHover: "hover:bg-indigo-700",
    badge: "Số hóa không gian 3D",
    badgeColor: "bg-indigo-50 text-indigo-600",
    linkText: "Xem chi tiết giải pháp",
  },
  pos: {
    icon: "fa-solid fa-cash-register",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    btnBg: "bg-blue-600",
    btnHover: "hover:bg-blue-700",
    linkText: "Khám phá giải pháp",
  },
  zns: {
    icon: "fa-solid fa-comment-sms",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    btnBg: "bg-sky-600",
    btnHover: "hover:bg-sky-700",
    linkText: "Xem báo giá",
  },
  web: {
    icon: "fa-solid fa-laptop-code",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    btnBg: "bg-purple-600",
    btnHover: "hover:bg-purple-700",
    linkText: "Liên hệ tư vấn",
  },
  erp: {
    icon: "fa-solid fa-chart-pie",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    btnBg: "bg-amber-600",
    btnHover: "hover:bg-amber-700",
    linkText: "Yêu cầu Demo",
  },
  "hop-dong": {
    icon: "fa-solid fa-file-signature",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    btnBg: "bg-red-600",
    btnHover: "hover:bg-red-700",
    badge: "An toàn pháp lý",
    badgeColor: "bg-red-50 text-red-600",
    linkText: "Xem chi tiết",
  },
  "ha-tang": {
    icon: "fa-solid fa-server",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    btnBg: "bg-cyan-600",
    btnHover: "hover:bg-cyan-700",
    badge: "Hạ tầng số vững chắc",
    badgeColor: "bg-cyan-50 text-cyan-600",
    linkText: "Khám phá hạ tầng số",
  },
  "ban-quyen": {
    icon: "fa-solid fa-key",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    btnBg: "bg-indigo-600",
    btnHover: "hover:bg-indigo-700",
    badge: "Bản quyền chính hãng",
    badgeColor: "bg-indigo-50 text-indigo-600",
    linkText: "Xem bảng giá bản quyền",
  },
};

const DEFAULT_META: ServiceMetadata = {
  icon: "fa-solid fa-box",
  iconBg: "bg-blue-100",
  iconColor: "text-blue-600",
  btnBg: "bg-blue-600",
  btnHover: "hover:bg-blue-700",
  linkText: "Xem chi tiết",
};

export default function Services() {
  const [showAll, setShowAll] = useState(false);
  const [provisions, setProvisions] = useState<ProvisionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    provisionApi
      .getProvisions()
      .then((res) => {
        if (res.success && res.data) {
          setProvisions(res.data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch provisions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visibleProvisions = showAll ? provisions : provisions.slice(0, 6);

  if (loading) {
    return (
      <div className="text-center py-12">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
        <p className="mt-4 text-slate-500 text-sm">Đang tải danh sách dịch vụ...</p>
      </div>
    );
  }

  if (provisions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 text-sm">
        Đang cập nhật danh sách dịch vụ.
      </div>
    );
  }

  return (
    <div className="mb-24">
      <div id="dich-vu" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleProvisions.map((item) => {
          const code = (item.code || "").toLowerCase();
          const meta = SERVICE_META_MAP[code] || DEFAULT_META;
          const route = getProvisionRoute(item.code);

          return (
            <div
              key={item.id}
              className="hover-scale bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between group transition-all duration-300 hover:shadow-md"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-14 h-14 ${meta.iconBg} ${meta.iconColor} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}
                  >
                    <i className={meta.icon}></i>
                  </div>
                  {meta.badge && (
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                        meta.badgeColor || "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {meta.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {item.description || "Giải pháp công nghệ tối ưu cho doanh nghiệp."}
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={route}
                  className={`inline-flex items-center justify-center w-full px-5 py-3 font-medium text-white ${meta.btnBg} ${meta.btnHover} rounded-xl transition-colors shadow-sm`}
                >
                  {meta.linkText}{" "}
                  <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {provisions.length > 6 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>{showAll ? "Thu gọn" : "Xem thêm"}</span>
            <i
              className={`fa-solid fa-chevron-down text-sm transition-transform duration-200 ${
                showAll ? "rotate-180" : ""
              }`}
            ></i>
          </button>
        </div>
      )}
    </div>
  );
}