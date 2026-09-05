"use client";

import { useState } from "react";

interface CartSummaryProps {
  subtotal: number;
  vat: number;
  discountAmount: number;
  grandTotal: number;
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
  onProceedToCheckout: () => void;
}

const AVAILABLE_COUPONS = [
  { code: "TURBOTRONDOI40%", label: "Giảm Giá Trọn Đời 40% Dịch vụ Cloud Server", discountPercent: 40 },
  { code: "SGO35OFF", label: "Ưu Đãi 35% Đơn Hàng Đầu Tiên", discountPercent: 35 },
  { code: "SGODOMAIN1K", label: "Giảm 50.000đ khi đăng ký Tên miền .VN", fixedDiscount: 50000 },
];

const CONSULTANTS = [
  { id: "auto", name: "Hệ thống phân bổ tự động" },
  { id: "sale-1", name: "Nguyễn Văn Nam - 0981.185.620" },
  { id: "sale-2", name: "Trần Thị Mai - 0982.334.567" },
  { id: "sale-3", name: "Lê Hoàng Anh - 0912.889.999" },
];

export default function CartSummary({
  subtotal,
  vat,
  discountAmount,
  grandTotal,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
}: CartSummaryProps) {
  const [couponInput, setCouponInput] = useState(appliedCoupon || "TURBOTRONDOI40%");
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [selectedConsultant, setSelectedConsultant] = useState(CONSULTANTS[0].id);

  const handleApply = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim().toUpperCase();
    if (!code) {
      setCouponError("Vui lòng nhập mã giảm giá");
      return;
    }
    setCouponError(null);
    setCouponSuccess(null);

    const success = onApplyCoupon(code);
    if (success) {
      setCouponSuccess(`Đã áp dụng thành công mã ${code}!`);
      setCouponInput(code);
    } else {
      setCouponError("Mã giảm giá không hợp lệ hoặc đã hết hạn");
    }
  };

  return (
    <div className="space-y-4 sticky top-24">
      {/* 1. Order Total Card */}
      <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200/80 shadow-xs space-y-4">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-700">
            <span>Tổng cộng (chưa VAT)</span>
            <span className="font-bold text-slate-900">{subtotal.toLocaleString("vi-VN")} đ</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between items-center text-emerald-700 font-medium">
              <span>Đã giảm giá ({appliedCoupon})</span>
              <span className="font-bold">-{discountAmount.toLocaleString("vi-VN")} đ</span>
            </div>
          )}

          <div className="flex justify-between items-center text-slate-700">
            <span>VAT (10%)</span>
            <span className="font-bold text-slate-900">{vat.toLocaleString("vi-VN")} đ</span>
          </div>

          <div className="border-t border-dashed border-amber-300 my-2 pt-2"></div>

          <div className="flex items-baseline justify-between">
            <span className="font-extrabold text-sm text-slate-900">Thanh toán</span>
            <span className="text-2xl font-black text-red-600 tracking-tight">
              {grandTotal.toLocaleString("vi-VN")} đ
            </span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={onProceedToCheckout}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Tiếp tục</span>
          <i className="fa-solid fa-chevron-right text-xs"></i>
        </button>

        {/* Sales Consultant Selector */}
        <div className="pt-1 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 font-semibold cursor-pointer">
            <i className="fa-solid fa-user-tie text-slate-500"></i>
            <span className="text-slate-600">Nhân viên tư vấn:</span>
            <select
              value={selectedConsultant}
              onChange={(e) => setSelectedConsultant(e.target.value)}
              className="bg-transparent border-0 font-bold text-slate-800 text-xs focus:outline-none cursor-pointer underline decoration-dotted"
            >
              {CONSULTANTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Coupon Card */}
      <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-200/80 shadow-xs space-y-3">
        <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wide">
          Mã giảm giá
        </h4>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
            placeholder="Nhập mã giảm giá..."
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 placeholder-slate-400 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
          />
          <button
            onClick={() => handleApply()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            Áp dụng
          </button>
        </div>

        {couponError && (
          <div className="text-[11px] font-bold text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 flex items-center gap-1">
            <i className="fa-solid fa-circle-exclamation"></i> {couponError}
          </div>
        )}

        {couponSuccess && (
          <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-circle-check"></i> {couponSuccess}
            </span>
            <button
              onClick={() => {
                onRemoveCoupon();
                setCouponSuccess(null);
              }}
              className="text-slate-400 hover:text-red-600 text-xs font-bold underline"
            >
              Gỡ
            </button>
          </div>
        )}

        {/* Default / Available Voucher Badges */}
        <div className="pt-2 border-t border-blue-100 space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 block">
            Mã giảm giá khả dụng:
          </span>
          <div className="space-y-2">
            {AVAILABLE_COUPONS.map((coupon) => (
              <div
                key={coupon.code}
                onClick={() => {
                  setCouponInput(coupon.code);
                  handleApply(coupon.code);
                }}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                  appliedCoupon === coupon.code
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs font-bold"
                    : "bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                }`}
              >
                <div>
                  <span className="font-extrabold uppercase tracking-wider block text-xs">
                    {coupon.code}
                  </span>
                  <span
                    className={`text-[10px] block leading-tight mt-0.5 ${
                      appliedCoupon === coupon.code ? "text-blue-100" : "text-slate-500"
                    }`}
                  >
                    {coupon.label}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-1 rounded shrink-0 ${
                    appliedCoupon === coupon.code
                      ? "bg-white text-blue-600"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {appliedCoupon === coupon.code ? "Đã dùng" : "Chọn"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
