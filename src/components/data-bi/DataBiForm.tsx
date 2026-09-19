"use client";

import { useState, FormEvent } from "react";
import { submitConsultation } from "@/shared/client";

export default function DataBiForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [requirement, setRequirement] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullname.trim() || !phone.trim()) {
      alert("Vui lòng nhập đầy đủ Họ tên và Số điện thoại!");
      return;
    }

    setLoading(true);

    const res = await submitConsultation({
      provisionCode: "erp",
      customerName: fullname,
      phoneNumber: phone,
      email: email,
      extraFields: {
        company: company,
        requirement: requirement,
      },
    });

    setLoading(false);

    if (res.success) {
      alert(
        "Cảm ơn bạn đã đăng ký! Chuyên viên SGO Data sẽ liên hệ tư vấn khảo sát hạ tầng dữ liệu cho doanh nghiệp của bạn trong thời gian sớm nhất."
      );
      setFullname("");
      setPhone("");
      setEmail("");
      setCompany("");
      setRequirement("");
    } else {
      alert(res.message || "Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  return (
    <section id="lien-he" className="py-20 lg:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl font-bold text-slate-900">Kết nối với SGO Data</h2>
          <p className="text-slate-600 text-xs md:text-sm font-light">
            Hãy để lại thông tin để nhận tài liệu giải pháp và tư vấn chi tiết cho doanh nghiệp.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 p-8 lg:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Họ và tên *</label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white text-slate-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Số điện thoại *</label>
              <input
                type="tel"
                required
                placeholder="0912 345 6xx"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white text-slate-900 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Email doanh nghiệp *</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white text-slate-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Tên công ty *</label>
              <input
                type="text"
                required
                placeholder="Công ty Cổ phần ..."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white text-slate-900 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Yêu cầu cụ thể / Bài toán dữ liệu
            </label>
            <textarea
              rows={4}
              placeholder="Mô tả ngắn gọn về hệ thống hiện tại hoặc nhu cầu xây dựng Dashboard, Data Warehouse..."
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-white text-slate-900 transition-all"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-md transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i> Đang gửi yêu cầu...
              </>
            ) : (
              <>
                Gửi yêu cầu tư vấn <i className="fa-solid fa-paper-plane text-xs"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
