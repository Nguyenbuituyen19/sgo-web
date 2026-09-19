"use client";

import { useState, FormEvent } from "react";
import { submitConsultation } from "@/shared/client";

export default function PosForm() {
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  const [industry, setIndustry] = useState("");
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
      provisionCode: "pos",
      customerName: ownerName,
      phoneNumber: phone,
      extraFields: {
        storeName: storeName,
        industry: industry,
      },
    });

    if (res.success) {
      alert(
        "Kích hoạt tài khoản dùng thử 07 ngày thành công! Đội ngũ tư vấn SGO POS sẽ liên hệ hướng dẫn bạn trải nghiệm phần mềm."
      );
      setOwnerName("");
      setPhone("");
      setStoreName("");
      setIndustry("");
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  return (
    <section id="trial-form" className="py-20 max-w-xl mx-auto px-4">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
        <div className="text-center mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Dùng Thử Miễn Phí 07 Ngày</h2>
          <p className="text-slate-500 text-xs md:text-sm font-light">
            Trải nghiệm đủ tất cả các tính năng cao cấp mà không cần cam kết thẻ tín dụng.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Tên chủ cửa hàng *
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              required
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Số điện thoại kích hoạt *
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
              Tên cửa hàng/Thương hiệu *
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Tạp Hóa SGO Mart"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Ngành hàng kinh doanh
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-700 cursor-pointer transition-all"
            >
              <option value="">-- Chọn ngành hàng --</option>
              <option value="retail">Tạp hóa, siêu thị, bán lẻ</option>
              <option value="fashion">Thời trang, phụ kiện, giày dép</option>
              <option value="fnb">Ẩm thực, Nhà hàng, Cafe</option>
              <option value="online">Chủ shop kinh doanh online</option>
              <option value="other">Ngành hàng khác</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all text-center cursor-pointer flex items-center justify-center gap-1"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i> Đang kích hoạt...
                </>
              ) : (
                <>
                  Kích Hoạt Tài Khoản Miễn Phí <i className="fa-solid fa-angle-right ml-1"></i>
                </>
              )}
            </button>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-2">
            <i className="fa-solid fa-lock mr-1 text-slate-300"></i> Thông tin của bạn được bảo mật tuyệt đối theo chính sách bảo mật SGO.
          </p>
        </form>
      </div>
    </section>
  );
}
