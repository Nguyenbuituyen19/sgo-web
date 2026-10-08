"use client";

import { useState, FormEvent } from "react";
import { submitConsultation } from "@/shared/client";

interface ServiceFormProps {
  /** Code provision được gửi kèm yêu cầu tư vấn. */
  code: string;
  /** Tên dịch vụ, dùng trong lời nhắc gửi thành công. */
  label: string;
}

/**
 * Form nhận tư vấn dùng chung cho trang dịch vụ.
 *
 * Theo đúng quy ước của các form khác trong dự án (WebForm, PosForm, ErpForm...):
 * validate số điện thoại bằng regex rồi phản hồi qua `alert`, và gửi `provisionCode`
 * để backend gắn yêu cầu với đúng dịch vụ.
 */
export default function ServiceForm({ code, label }: ServiceFormProps) {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
      provisionCode: code,
      customerName: fullname,
      phoneNumber: phone,
      email: email || undefined,
    });

    if (res.success) {
      alert(
        `Gửi yêu cầu tư vấn ${label} thành công! Chuyên viên của SGO Việt Nam sẽ liên hệ lại trong vòng 24 giờ.`
      );
      setFullname("");
      setPhone("");
      setEmail("");
    } else {
      alert(res.message);
    }

    setLoading(false);
  };

  return (
    <section id="contact-form" className="py-20 max-w-xl mx-auto px-4">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl">
        <div className="text-center mb-6 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            Nhận Tư Vấn Miễn Phí
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-light">
            Để lại thông tin, chúng tôi sẽ liên hệ trong vòng 24 giờ.
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase">
              Email (không bắt buộc)
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-50 text-slate-900 transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i> Đang xử lý...
                </>
              ) : (
                <>
                  Gửi Yêu Cầu Tư Vấn{" "}
                  <i className="fa-solid fa-paper-plane text-xs"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
