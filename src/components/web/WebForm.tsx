"use client";

import { useState, FormEvent } from "react";
import { submitConsultation } from "@/shared/client";

export default function WebForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [businessField, setBusinessField] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await submitConsultation({
      provisionCode: "web",
      customerName: fullname,
      phoneNumber: phone,
      extraFields: {
        businessField: businessField,
      },
    });

    if (res.success) {
      alert(
        "Gửi yêu cầu tư vấn thành công! Chuyên viên thiết kế của SGO Việt Nam sẽ liên hệ tổng hợp và gửi lại 3 mẫu giao diện đẹp nhất cho bạn."
      );
      setFullname("");
      setPhone("");
      setBusinessField("");
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  return (
    <section id="contact-form" className="py-20 max-w-xl mx-auto px-4">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
        <div className="text-center mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Yêu Cầu Tư Vấn Giao Diện Mẫu</h2>
          <p className="text-slate-500 text-xs md:text-sm font-light">
            Hãy gửi lĩnh vực kinh doanh của bạn, SGO Việt Nam sẽ tổng hợp và gửi lại 3 mẫu giao diện đẹp nhất phù hợp với ngành của bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Tên của bạn *
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 bg-slate-50 text-slate-900 transition-all"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Lĩnh vực cần làm web (Ví dụ: Bất động sản, Nội thất, Trà, Mỹ phẩm...)
            </label>
            <input
              type="text"
              placeholder="Ví dụ: Bán sản phẩm trà Shan Tuyết cổ thụ"
              value={businessField}
              onChange={(e) => setBusinessField(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-purple-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/20 transition-all text-center cursor-pointer flex items-center justify-center gap-1"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i> Đang xử lý...
                </>
              ) : (
                <>
                  Nhận Kho Mẫu Giao Diện Ngay <i className="fa-solid fa-paper-plane text-xs"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
