"use client";

import { useState, FormEvent } from "react";
import { submitConsultation } from "@/shared/client";

export default function VrForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [brandName, setBrandName] = useState("");
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
      provisionCode: "vr360",
      customerName: fullname,
      phoneNumber: phone,
      extraFields: {
        brandName: brandName,
        requirements: requirements,
      },
    });

    if (res.success) {
      alert(
        "Gửi yêu cầu khảo sát thành công! Chuyên viên công nghệ VR360 của SGO Việt Nam sẽ liên hệ khảo sát và tư vấn cho bạn trong thời gian sớm nhất."
      );
      setFullname("");
      setPhone("");
      setBrandName("");
      setRequirements("");
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  return (
    <section id="tu-van" className="py-20 max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-3xl border border-slate-200/60 p-8 md:p-12 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-5 space-y-3 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
            Sẵn Sàng Nâng Tầm Trải Nghiệm Khách Hàng?
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed font-light">
            Để lại thông tin, chuyên viên công nghệ VR360 của chúng tôi sẽ liên hệ khảo sát địa hình và tư vấn phương án tối ưu chi phí nhất trong vòng 2 giờ làm việc.
          </p>
          <div className="hidden md:block pt-2 text-xs text-slate-400 space-y-1 font-light">
            <p>
              <i className="fa-solid fa-shield-halved text-blue-500 mr-2"></i>Bảo mật thông tin khách hàng
            </p>
            <p>
              <i className="fa-solid fa-bolt text-amber-500 mr-2"></i>Khảo sát nhanh toàn quốc
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Họ và tên của bạn *"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-900"
              />
              <input
                type="tel"
                placeholder="Số điện thoại di động *"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-900"
              />
            </div>
            <input
              type="text"
              placeholder="Tên Khách sạn / Resort / Thương hiệu lưu trú"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-900"
            />
            <textarea
              placeholder="Yêu cầu cụ thể của bạn (Ví dụ: Số lượng phòng, diện tích khuôn viên...)"
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-900"
            ></textarea>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl text-sm transition-colors shadow-lg shadow-blue-100 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i> Đang gửi yêu cầu...
                </>
              ) : (
                <>
                  Gửi Yêu Cầu Khảo Sát Miễn Phí <i className="fa-solid fa-paper-plane text-xs"></i>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
