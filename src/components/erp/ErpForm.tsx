"use client";

import { useState, FormEvent } from "react";
import { submitConsultation } from "@/shared/client";

export default function ErpForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      alert("Sai định dạng số điện thoại");
      return;
    }

    setLoading(true);

    const res = await submitConsultation({
      provisionCode: "erp",
      customerName: fullname,
      phoneNumber: phone,
      extraFields: {
        company: company,
        industry: industry,
        requirements: requirements,
      },
    });

    if (res.success) {
      alert(
        "Gửi yêu cầu nhận tư vấn giải pháp SGO ERP thành công! Chuyên viên ERP của SGO Việt Nam sẽ liên hệ lại trong thời gian sớm nhất để hỗ trợ bạn."
      );
      setFullname("");
      setPhone("");
      setCompany("");
      setIndustry("");
      setRequirements("");
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  return (
    <section id="register" className="py-20 max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Đăng Ký Khảo Sát &amp; Nhận Bản Demo
          </h2>
          <p className="text-slate-500 text-sm font-light">
            Điền thông tin bên dưới, chuyên viên ERP của SGO Việt Nam sẽ liên hệ lại trong vòng 15 phút để tư vấn giải pháp tối ưu nhất cho ngành nghề của bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Họ và tên *
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Số điện thoại *
              </label>
              <input
                type="tel"
                placeholder="0981xxxxxx"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Tên Doanh nghiệp / Công ty *
            </label>
            <input
              type="text"
              placeholder="Công ty TNHH sản xuất thương mại..."
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Ngành nghề/Lĩnh vực kinh doanh
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-700 cursor-pointer transition-all"
            >
              <option value="">-- Chọn lĩnh vực --</option>
              <option value="manufacturing">Sản xuất - Cơ khí / May mặc</option>
              <option value="retail">Bán lẻ - Phân phối / Chuỗi cửa hàng</option>
              <option value="construction">Xây dựng - Bất động sản</option>
              <option value="service">Dịch vụ / Thương mại điện tử</option>
              <option value="other">Lĩnh vực khác</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Nhu cầu cần giải quyết bài toán gì?
            </label>
            <textarea
              rows={3}
              placeholder="Ví dụ: Cần quản lý tồn kho vật tư sản xuất, tự động chấm công tính lương..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-center cursor-pointer flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i> Đang xử lý...
              </>
            ) : (
              <>
                Gửi Yêu Cầu Nhận Tư Vấn <i className="fa-solid fa-paper-plane text-xs"></i>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
