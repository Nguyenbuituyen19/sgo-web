"use client";

import { useState } from "react";

export interface CartItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  regType: "new" | "renew";
  durationYears: number;
  durationLabel: string;
  location: string;
  osImage: string;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  config: {
    cpu: string;
    ram: string;
    storage: string;
    bandwidth: string;
    ip: string;
  };
  promoNote?: string;
}

const OS_OPTIONS = [
  { id: "CentOS-Stream-8", name: "CentOS-Stream-8", icon: "fa-centos text-purple-600" },
  { id: "Ubuntu-22.04-LTS", name: "Ubuntu-22.04-LTS", icon: "fa-ubuntu text-orange-600" },
  { id: "Debian-12", name: "Debian-12", icon: "fa-linux text-rose-600" },
  { id: "AlmaLinux-9", name: "AlmaLinux-9.3", icon: "fa-linux text-blue-600" },
  { id: "Windows-Server-2022", name: "Windows-Server-2022", icon: "fa-windows text-sky-600" },
];

const DURATION_OPTIONS = [
  { value: 1 / 12, label: "1 tháng", discount: 0 },
  { value: 0.5, label: "6 tháng", discount: 10 },
  { value: 1, label: "1 năm", discount: 15 },
  { value: 2, label: "2 năm", discount: 20 },
  { value: 3, label: "3 năm", discount: 25 },
  { value: 5, label: "5 năm", discount: 30 },
];

const LOCATION_OPTIONS = ["TP. Hồ Chí Minh", "Hà Nội"];

interface CartItemListProps {
  items: CartItem[];
  onUpdateDuration: (id: string, durationYears: number, durationLabel: string, discount: number) => void;
  onUpdateOs: (id: string, osName: string) => void;
  onUpdateLocation: (id: string, location: string) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartItemList({
  items,
  onUpdateDuration,
  onUpdateOs,
  onUpdateLocation,
  onRemoveItem,
  onClearCart,
}: CartItemListProps) {
  const [activeConfigItem, setActiveConfigItem] = useState<CartItem | null>(null);
  const [osDropdownOpenId, setOsDropdownOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Table Header Bar (Dark Slate / Charcoal) */}
      <div className="bg-slate-800 text-white rounded-t-xl px-4 py-3 text-xs font-bold flex items-center justify-between shadow-xs">
        <div className="w-1/2 md:w-3/5">Tên dịch vụ</div>
        <div className="w-1/4 md:w-1/5 text-center">Thời gian</div>
        <div className="w-1/4 md:w-1/5 text-right">Thành tiền</div>
      </div>

      {/* Cart Items List */}
      {items.length === 0 ? (
        <div className="bg-white rounded-b-xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 text-3xl mb-4">
            <i className="fa-solid fa-cart-flatbed-suitcases"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">Giỏ hàng của bạn đang trống</h3>
          <p className="text-xs text-slate-500 mb-6">
            Hãy khám phá các gói Cloud Server, Hosting, Tên miền chất lượng cao từ SGO Việt Nam!
          </p>
          <a
            href="/cloud-server#pricing-table"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md"
          >
            <i className="fa-solid fa-plus"></i> Khám phá dịch vụ ngay
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs transition-all hover:border-slate-300 relative"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Left Info Column */}
                <div className="w-full md:w-3/5 space-y-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <span className="font-bold text-xs text-slate-700">
                      {item.subtitle}
                    </span>

                    {/* Registration Tag */}
                    <span className="inline-flex items-center text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded cursor-default">
                      {item.regType === "new" ? "Đăng ký mới" : "Gia hạn"}
                    </span>
                  </div>

                  {/* Config detail button & Location */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                    <button
                      onClick={() => setActiveConfigItem(item)}
                      className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <i className="fa-solid fa-magnifying-glass text-[10px]"></i> Chi tiết cấu hình
                    </button>

                    {/* Location Badge Dropdown */}
                    <div className="flex items-center gap-1 text-slate-600 font-medium">
                      <i className="fa-solid fa-location-dot text-rose-500"></i>
                      <select
                        value={item.location}
                        onChange={(e) => onUpdateLocation(item.id, e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        {LOCATION_OPTIONS.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Image OS Badge / Dropdown */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="relative inline-block">
                      <button
                        onClick={() =>
                          setOsDropdownOpenId(osDropdownOpenId === item.id ? null : item.id)
                        }
                        className="inline-flex items-center gap-2 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-blue-900 transition-colors cursor-pointer"
                      >
                        <span>Image: <strong>{item.osImage}</strong></span>
                        <i className="fa-solid fa-rotate text-[10px] text-blue-600"></i>
                      </button>

                      {/* OS Dropdown */}
                      {osDropdownOpenId === item.id && (
                        <div className="absolute left-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-30 animate-in fade-in duration-150">
                          <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Chọn Hệ điều hành
                          </div>
                          {OS_OPTIONS.map((os) => (
                            <button
                              key={os.id}
                              onClick={() => {
                                onUpdateOs(item.id, os.name);
                                setOsDropdownOpenId(null);
                              }}
                              className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-blue-50 transition-colors ${
                                item.osImage === os.name ? "text-blue-600 bg-blue-50/50 font-bold" : "text-slate-700"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <i className={`fa-brands ${os.icon}`}></i> {os.name}
                              </span>
                              {item.osImage === os.name && (
                                <i className="fa-solid fa-check text-blue-600 text-xs"></i>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Promo Subtext */}
                  {item.promoNote && (
                    <div className="text-[11px] text-blue-700 bg-blue-50/60 rounded-lg px-2.5 py-1.5 border border-blue-100 flex items-start gap-1.5">
                      <span className="shrink-0 text-sm">🎁</span>
                      <span className="leading-snug">{item.promoNote}</span>
                    </div>
                  )}
                </div>

                {/* Duration Column */}
                <div className="w-full md:w-1/5 flex items-center justify-start md:justify-center">
                  <div className="flex flex-col items-start md:items-center">
                    <span className="text-[10px] text-slate-400 font-semibold mb-1 md:hidden">
                      Thời gian:
                    </span>
                    <select
                      value={item.durationYears}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        const matched = DURATION_OPTIONS.find((opt) => Math.abs(opt.value - val) < 0.001);
                        if (matched) {
                          onUpdateDuration(item.id, matched.value, matched.label, matched.discount);
                        }
                      }}
                      className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {DURATION_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label} {opt.discount > 0 ? `(-${opt.discount}%)` : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price & Remove Column */}
                <div className="w-full md:w-1/5 flex items-center justify-between md:justify-end gap-3">
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-black text-slate-900 leading-none">
                      {item.finalPrice.toLocaleString("vi-VN")} đ
                    </div>
                    {item.originalPrice > item.finalPrice && (
                      <div className="text-xs text-slate-400 line-through mt-0.5">
                        {item.originalPrice.toLocaleString("vi-VN")} đ
                      </div>
                    )}
                    {item.discountPercentage > 0 && (
                      <div className="inline-block bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded mt-1">
                        Tiết kiệm {item.discountPercentage}%
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="w-7 h-7 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0"
                    title="Xóa khỏi giỏ hàng"
                  >
                    <i className="fa-solid fa-xmark text-base"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Action: Clear Cart */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClearCart}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 px-4 py-2 rounded-lg transition-all shadow-xs cursor-pointer"
            >
              <i className="fa-regular fa-trash-can text-sm"></i>
              <span>Làm trống giỏ hàng</span>
            </button>
          </div>
        </div>
      )}

      {/* Configuration Detail Modal */}
      {activeConfigItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setActiveConfigItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-lg">
                <i className="fa-solid fa-server"></i>
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Chi tiết cấu hình</h3>
                <p className="text-xs text-slate-500">{activeConfigItem.title}</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200/80 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-500">Vi xử lý (CPU):</span>
                <span className="font-bold text-slate-900">{activeConfigItem.config.cpu}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-500">Bộ nhớ (RAM):</span>
                <span className="font-bold text-slate-900">{activeConfigItem.config.ram}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-500">Dung lượng ổ cứng:</span>
                <span className="font-bold text-slate-900">{activeConfigItem.config.storage}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-500">Băng thông:</span>
                <span className="font-bold text-slate-900">{activeConfigItem.config.bandwidth}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200/60">
                <span className="text-slate-500">Địa chỉ IPv4:</span>
                <span className="font-bold text-slate-900">{activeConfigItem.config.ip}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Hệ điều hành:</span>
                <span className="font-bold text-blue-600">{activeConfigItem.osImage}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveConfigItem(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
