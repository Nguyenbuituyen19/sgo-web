"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { provisionApi } from "@/shared/provision";

interface ServiceItem {
  id: string;
  badge?: string;
  badgeColor?: string;
  topBadge?: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  desc: string;
  tags?: string[];
  link: string;
  linkText: string;
  btnBg: string;
  btnHover: string;
  extraInfo?: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "qr-code",
    badge: "Miễn phí trọn đời",
    badgeColor: "bg-emerald-50 text-emerald-600",
    icon: "fa-solid fa-qrcode",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    title: "Tạo Mã QR Miễn Phí",
    desc: "Tạo mã QR tĩnh/động chuyên nghiệp, không dính quảng cáo. Hỗ trợ QR thanh toán, QR sự kiện, định danh cá nhân dễ dàng.",
    link: "/qr-code",
    linkText: "Trải nghiệm ngay",
    btnBg: "bg-emerald-600",
    btnHover: "hover:bg-emerald-700",
  },
  {
    id: "truy-xuat",
    badge: "Minh bạch chuỗi cung ứng",
    badgeColor: "bg-teal-50 text-teal-600",
    icon: "fa-solid fa-shield-halved",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    title: "Giải Pháp Truy Xuất Nguồn Gốc",
    desc: "Ứng dụng số hóa nhật ký sản xuất và chuỗi cung ứng bằng QR Code. Chống hàng giả, bảo vệ thương hiệu vững chắc và đáp ứng trọn vẹn tiêu chuẩn xuất khẩu.",
    link: "/truy-xuat-nguon-goc",
    linkText: "Khám phá giải pháp",
    btnBg: "bg-teal-600",
    btnHover: "hover:bg-teal-700",
  },
  {
    id: "vr360",
    topBadge: "Xu hướng",
    badge: "Số hóa không gian 3D",
    badgeColor: "bg-indigo-50 text-indigo-600",
    icon: "fa-solid fa-cube",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "Giải Pháp Thực Tế Ảo VR360",
    desc: "Mang toàn bộ không gian Khách sạn, Resort, Khu du lịch lên internet với góc nhìn 360 độ trực quan, tích hợp sa bàn ảo, tăng uy tín và bứt phá tỷ lệ đặt phòng trực tiếp.",
    link: "/vr360",
    linkText: "Xem chi tiết giải pháp",
    btnBg: "bg-indigo-600",
    btnHover: "hover:bg-indigo-700",
  },
  {
    id: "pos",
    icon: "fa-solid fa-cash-register",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    title: "Phần Mềm Quản Lý Bán Hàng",
    desc: "Quản lý kho hàng, đơn hàng, doanh thu và nhân viên trên một nền tảng duy nhất. Phù hợp cho cả bán lẻ lẫn chuỗi cửa hàng.",
    link: "/pos",
    linkText: "Khám phá giải pháp",
    btnBg: "bg-blue-600",
    btnHover: "hover:bg-blue-700",
  },
  {
    id: "zns",
    icon: "fa-solid fa-comment-sms",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    title: "Chăm Sóc Khách Hàng OA - ZNS",
    desc: "Giải pháp gửi tin nhắn chủ động qua Zalo tự động: xác nhận đơn hàng, chúc mừng sinh nhật, thông báo số dư với chi phí tối ưu.",
    link: "/zns",
    linkText: "Xem báo giá",
    btnBg: "bg-sky-600",
    btnHover: "hover:bg-sky-700",
  },
  {
    id: "web",
    icon: "fa-solid fa-laptop-code",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    title: "Thiết Kế Website Theo Yêu Cầu",
    desc: "Sở hữu website chuẩn SEO, giao diện độc quyền mượt mà trên mobile. Tối ưu trải nghiệm người dùng nhằm thúc đẩy tỷ lệ chuyển đổi.",
    link: "/web",
    linkText: "Liên hệ tư vấn",
    btnBg: "bg-purple-600",
    btnHover: "hover:bg-purple-700",
  },
  {
    id: "erp",
    icon: "fa-solid fa-chart-pie",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    title: "Hệ Thống Quản Trị CRM / ERP",
    desc: "Số hóa toàn diện doanh nghiệp từ quản lý thông tin khách hàng, quy trình làm việc của nhân sự, đến báo cáo tài chính nội bộ. May đo chính xác theo đặc thù từng ngành nghề.",
    link: "/erp",
    linkText: "Yêu cầu Demo",
    btnBg: "bg-amber-600",
    btnHover: "hover:bg-amber-700",
    extraInfo: "Bảo mật chuẩn ISO",
  },
  {
    id: "data-bi",
    badge: "Báo cáo & Phân tích",
    badgeColor: "bg-violet-50 text-violet-600",
    icon: "fa-solid fa-chart-line",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    title: "Hạ Tầng Dữ Liệu & BI",
    desc: "Xây dựng Hạ tầng Dữ liệu, Data Warehouse, Data Lake, tự động hóa luồng thông tin ETL/ELT và tích hợp hệ thống Business Intelligence (Power BI, Looker Studio) toàn diện.",
    tags: ["Data Warehouse", "Power BI", "Looker Studio", "ETL/ELT"],
    link: "/data-bi",
    linkText: "Khám phá giải pháp",
    btnBg: "bg-violet-600",
    btnHover: "hover:bg-violet-700",
  },
  {
    id: "hop-dong",
    badge: "An toàn pháp lý",
    badgeColor: "bg-red-50 text-red-600",
    icon: "fa-solid fa-file-signature",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    title: "Giải Pháp Hợp Đồng Điện Tử",
    desc: "Ký số từ xa, quản lý và lưu trữ tài liệu, hợp đồng kinh tế không giấy tờ. Kết nối trực tiếp dữ liệu nhân sự, khách hàng từ CRM/ERP để tự động hóa quy trình trình duyệt.",
    link: "/hop-dong-dien-tu",
    linkText: "Xem chi tiết",
    btnBg: "bg-red-600",
    btnHover: "hover:bg-red-700",
  },
  {
    id: "cloud",
    badge: "Hạ tầng số vững chắc",
    badgeColor: "bg-cyan-50 text-cyan-600",
    icon: "fa-solid fa-server",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    title: "Hạ Tầng & Lưu Trữ Cloud",
    desc: "Nền tảng vận hành tối ưu cho mọi website và ứng dụng doanh nghiệp. Giải pháp lưu trữ dữ liệu an toàn, tốc độ cao và bảo mật tuyệt đối.",
    tags: ["Tên miền", "Hosting", "Cloud Server", "Chỗ đặt máy chủ"],
    link: "/ha-tang",
    linkText: "Khám phá hạ tầng số",
    btnBg: "bg-cyan-600",
    btnHover: "hover:bg-cyan-700",
  },
  {
    id: "ban-quyen",
    badge: "Bản quyền chính hãng",
    badgeColor: "bg-indigo-50 text-indigo-600",
    icon: "fa-solid fa-key",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    title: "Bản Quyền Phần Mềm",
    desc: "Cung cấp key bản quyền Windows 10/11 Pro, Office 2021/365, Windows Server chính hãng vĩnh viễn. Bảo hành 1 đổi 1, hỗ trợ kích hoạt trực tiếp từ Microsoft.",
    tags: ["Windows", "Office 365", "Win Server"],
    link: "/ban-quyen",
    linkText: "Xem bảng giá bản quyền",
    btnBg: "bg-indigo-600",
    btnHover: "hover:bg-indigo-700",
  },
];

export default function Services() {
  const [showAll, setShowAll] = useState(false);
  const [servicesData, setServicesData] = useState<ServiceItem[]>(SERVICES_DATA);

  useEffect(() => {
    provisionApi.getProvisions().then((res) => {
      if (res.success && res.data) {
        // Merge API data with static UI definitions based on service ID / Code
        const apiMap = new Map(res.data.map((p) => [p.code, p]));
        const merged = SERVICES_DATA.map((item) => {
          const apiItem = apiMap.get(item.id);
          if (apiItem) {
            return {
              ...item,
              title: apiItem.name,
              desc: apiItem.description || item.desc,
            };
          }
          return item;
        });
        setServicesData(merged);
      }
    }).catch((err) => {
      console.warn("Failed to fetch provisions:", err);
    });
  }, []);

  const visibleServices = showAll ? servicesData : servicesData.slice(0, 6);

  return (
    <div className="mb-24">
      <div id="dich-vu" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleServices.map((service) => (
          <div
            key={service.id}
            className="service-card bg-white rounded-2xl p-8 border border-slate-100 flex flex-col justify-between shadow-sm relative overflow-hidden"
          >
            {service.topBadge && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                {service.topBadge}
              </span>
            )}

            <div>
              <div
                className={`w-14 h-14 ${service.iconBg} ${service.iconColor} rounded-xl flex items-center justify-center text-2xl mb-6`}
              >
                <i className={service.icon}></i>
              </div>

              {service.badge && (
                <span
                  className={`text-xs font-bold uppercase tracking-wide px-2 py-1 rounded ${service.badgeColor}`}
                >
                  {service.badge}
                </span>
              )}

              <h3 className={`text-xl font-bold ${service.badge ? "mt-3" : ""} mb-2`}>
                {service.title}
              </h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>

              {service.tags && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8">
              {service.extraInfo ? (
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <Link
                    href={service.link}
                    className={`inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 font-medium text-white ${service.btnBg} ${service.btnHover} rounded-xl transition-colors text-center text-sm shrink-0`}
                  >
                    {service.linkText}{" "}
                    <i className="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
                  </Link>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    <i className="fa-solid fa-shield-check mr-1 text-amber-500"></i>{" "}
                    {service.extraInfo}
                  </span>
                </div>
              ) : (
                <Link
                  href={service.link}
                  className={`inline-flex items-center justify-center w-full px-5 py-3 font-medium text-white ${service.btnBg} ${service.btnHover} rounded-xl transition-colors shadow-sm`}
                >
                  {service.linkText}{" "}
                  
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {SERVICES_DATA.length > 6 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-6 py-3 hover: font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>{showAll ? "Thu gọn" : `Xem thêm`}</span>
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