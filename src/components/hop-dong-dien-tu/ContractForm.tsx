"use client";

import { useState, FormEvent } from "react";
import { submitConsultation } from "@/shared/client";

export default function ContractForm() {
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [demand, setDemand] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await submitConsultation({
      provisionCode: "hop-dong",
      customerName: companyName,
      phoneNumber: phone,
      extraFields: {
        demand: demand,
      },
    });

    if (res.success) {
      alert(
        "Đăng ký dùng thử SGO e-Contract thành công! Chuyên viên giải pháp của SGO Việt Nam sẽ liên hệ để tạo môi trường test hệ thống cho bạn."
      );
      setCompanyName("");
      setPhone("");
      setDemand("");
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  return (
    <section id="register-form" className="py-20 max-w-xl mx-auto px-4">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
        <div className="text-center mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Đăng Ký Tư Vấn &amp; Nhận Demo</h2>
          <p className="text-slate-500 text-xs md:text-sm font-light">
            Hãy gửi thông tin của bạn, SGO Việt Nam sẽ liên hệ hỗ trợ tạo môi trường test hệ thống và tư vấn gói chi phí phù hợp nhất.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Tên doanh nghiệp / Người liên hệ *
            </label>
            <input
              type="text"
              placeholder="Công ty TNHH Giải Pháp Số A"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Số điện thoại / Zalo nhận OTP nhận mẫu *
            </label>
            <input
              type="tel"
              placeholder="09xxxxxxxx"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Nhu cầu sử dụng ký kết (Ví dụ: Ký HĐ lao động, ký đại lý nhà phân phối, kết nối API...)
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Cần tích hợp luồng ký số nhân sự nội bộ"
              value={demand}
              onChange={(e) => setDemand(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-center cursor-pointer flex items-center justify-center gap-1 text-sm"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i> Đang xử lý...
                </>
              ) : (
                <>
                  Kích Hoạt Tài Khoản Dùng Thử Ngay <i className="fa-solid fa-paper-plane text-xs"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
