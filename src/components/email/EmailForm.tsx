"use client";

import { useState, FormEvent } from "react";

export default function EmailForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [domain, setDomain] = useState("");
  const [userRange, setUserRange] = useState("Dưới 10 nhân sự (Gói Basic)");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert(
        "Cảm ơn quý khách! Chuyên viên Email SGO Việt Nam sẽ liên hệ hỗ trợ cấu hình bản ghi và cấp tài khoản dùng thử ngay."
      );
      setFullname("");
      setPhone("");
      setDomain("");
      setUserRange("Dưới 10 nhân sự (Gói Basic)");
      setNote("");
      setLoading(false);
    }, 600);
  };

  return (
    <section id="register-email" className="max-w-3xl mx-auto bg-white border border-slate-200/60 rounded-3xl p-8 md:p-10 shadow-md">
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-slate-950">
          Đăng Ký Tư Vấn &amp; Cấu Hình Email Doanh Nghiệp
        </h3>
        <p className="text-slate-400 text-xs font-light">
          Điền thông tin bên dưới để chuyên viên SGO hỗ trợ thiết lập bản ghi định danh và cấp tài khoản dùng thử.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Họ và tên người liên hệ *</label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Trần Văn B"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 bg-slate-50/50 text-slate-900 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Số điện thoại / Zalo *</label>
            <input
              type="tel"
              required
              placeholder="Ví dụ: 0988xxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 bg-slate-50/50 text-slate-900 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Tên miền doanh nghiệp của bạn *</label>
            <input
              type="text"
              required
              placeholder="Ví dụ: congtyabc.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 bg-slate-50/50 text-slate-900 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Số lượng hòm thư (Users) cần dùng *</label>
            <select
              value={userRange}
              onChange={(e) => setUserRange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 bg-slate-50/50 text-slate-700 cursor-pointer transition-all"
            >
              <option value="Dưới 10 nhân sự (Gói Basic)">Dưới 10 nhân sự (Gói Basic)</option>
              <option value="Từ 10 đến 50 nhân sự (Gói Professional)">Từ 10 đến 50 nhân sự (Gói Professional)</option>
              <option value="Trên 50 nhân sự (Email Server Riêng)">Trên 50 nhân sự (Email Server Riêng)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Ghi chú yêu cầu thêm (Nếu có)</label>
          <textarea
            rows={3}
            placeholder="Ví dụ: Cần chuyển dữ liệu từ Google Workspace / Microsoft 365 cũ sang..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 bg-slate-50/50 text-slate-900 transition-all"
          ></textarea>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i> Đang gửi...
              </>
            ) : (
              <>
                Gửi Yêu Cầu Kích Hoạt Email <i className="fa-solid fa-paper-plane text-xs"></i>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
