"use client";

import { useState, FormEvent } from "react";

export default function ZnsForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [oaStatus, setOaStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert(
        "Gửi yêu cầu nhận tư vấn Zalo ZNS thành công! Chuyên viên hạ tầng SGO sẽ liên hệ hỗ trợ bạn xác thực Zalo OA và cung cấp token thử nghiệm."
      );
      setFullname("");
      setPhone("");
      setCompany("");
      setOaStatus("");
      setLoading(false);
    }, 600);
  };

  return (
    <section id="register" className="py-20 max-w-xl mx-auto px-4">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
        <div className="text-center mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Liên Hệ Đăng Ký &amp; Nhận Luồng API Test
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-light">
            Vui lòng cung cấp thông tin, chuyên viên hạ tầng SGO sẽ liên hệ hỗ trợ bạn làm thủ tục xác thực Zalo OA và cấp token thử nghiệm hệ thống.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Họ và tên *
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Số điện thoại / Zalo *
            </label>
            <input
              type="tel"
              placeholder="09xxxxxxxx"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Doanh nghiệp / Thương hiệu *
            </label>
            <input
              type="text"
              placeholder="Công ty TNHH Giải pháp..."
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Tình trạng Zalo OA
            </label>
            <select
              value={oaStatus}
              onChange={(e) => setOaStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 bg-slate-50 text-slate-700 cursor-pointer transition-all"
            >
              <option value="">-- Chọn hiện trạng --</option>
              <option value="none">Chưa có trang Zalo OA</option>
              <option value="unverified">
                Đã tạo Zalo OA nhưng chưa xác thực (Tích vàng)
              </option>
              <option value="verified">Đã có Zalo OA tích vàng</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all text-center cursor-pointer flex items-center justify-center gap-1"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i> Đang gửi yêu cầu...
                </>
              ) : (
                <>
                  Nhận Tư Vấn Kết Nối Hệ Thống <i className="fa-solid fa-paper-plane text-xs"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
