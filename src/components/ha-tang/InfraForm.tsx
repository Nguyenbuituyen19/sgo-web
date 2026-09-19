"use client";

import { useState, FormEvent } from "react";
import { submitConsultation } from "@/shared/client";

export default function InfraForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Đăng ký Tên miền / Đăng ký Hosting mới");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await submitConsultation({
      provisionCode: "ha-tang",
      customerName: fullname,
      phoneNumber: phone,
      extraFields: {
        service: service,
        description: description,
      },
    });

    if (res.success) {
      alert(
        "Cảm ơn bạn đã gửi yêu cầu tư vấn hạ tầng! Chuyên viên giải pháp của SGO Việt Nam sẽ liên hệ lại trong thời gian sớm nhất."
      );
      setFullname("");
      setPhone("");
      setService("Đăng ký Tên miền / Đăng ký Hosting mới");
      setDescription("");
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  return (
    <section id="register" className="max-w-3xl mx-auto bg-white border border-slate-200/60 rounded-3xl p-8 md:p-10 shadow-md">
      <div className="text-center space-y-2 mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-slate-950">Yêu Cầu Khảo Sát &amp; Báo Giá Hạ Tầng</h3>
        <p className="text-slate-400 text-xs font-light">
          Vui lòng điền thông tin bài toán doanh nghiệp, chuyên viên hạ tầng SGO sẽ liên hệ tư vấn giải pháp tối ưu chi phí nhất.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Họ và tên của bạn *</label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Nguyễn Văn A"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50/50 text-slate-900 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Số điện thoại liên hệ *</label>
            <input
              type="tel"
              required
              placeholder="Ví dụ: 0912345xxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50/50 text-slate-900 transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Dịch vụ hạ tầng bạn đang quan tâm *</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50/50 text-slate-700 cursor-pointer transition-all"
          >
            <option value="Đăng ký Tên miền / Đăng ký Hosting mới">Đăng ký Tên miền / Đăng ký Hosting mới</option>
            <option value="Thuê máy chủ ảo Cloud Server (VPS)">Thuê máy chủ ảo Cloud Server (VPS)</option>
            <option value="Giải pháp Email Hosting / Email Server doanh nghiệp">Giải pháp Email Hosting / Email Server doanh nghiệp</option>
            <option value="Thuê máy chủ vật lý riêng biệt / Chỗ đặt máy chủ">Thuê máy chủ vật lý riêng biệt / Chỗ đặt máy chủ</option>
            <option value="Trọn gói Combo toàn bộ hệ sinh thái">Trọn gói Combo toàn bộ hệ sinh thái</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-700">Mô tả nhu cầu sử dụng hoặc cấu hình dự kiến (Nếu có)</label>
          <textarea
            rows={3}
            placeholder="Ví dụ: Cần gói email doanh nghiệp cho 50 nhân viên gửi nhận hợp đồng, hoặc cần server chạy hệ thống CRM..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 bg-slate-50/50 text-slate-900 transition-all"
          ></textarea>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i> Đang gửi...
              </>
            ) : (
              <>
                Gửi Yêu Cầu Tư Vấn Ngay <i className="fa-solid fa-paper-plane ml-1 text-xs"></i>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
