"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { submitConsultation } from "@/shared/client";

export default function QrForm() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbx_TVCcS_lUkDNdLtJG4dK3EZTDyIp2KvGMbIqAlFHs7uZTF649C9SUp3UC56A80qBTOw/exec";

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setPhone(onlyNums);
    if (phoneError) setPhoneError("");
  };

  const handlePhoneBlur = () => {
    if (phone.length > 0 && phone.length !== 10) {
      setPhoneError("Số điện thoại phải có chính xác 10 chữ số.");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setPhoneError("Số điện thoại phải có chính xác 10 chữ số.");
      return;
    }

    setLoading(true);

    try {
      const res = await submitConsultation({
        provisionCode: "qr-code",
        customerName: fullname,
        phoneNumber: phone,
        email: email,
        extraFields: {
          qrUrl: qrUrl,
        },
      });

      if (res.success) {
        alert(
          "Đăng ký thành công! Hệ thống đang tiến hành tạo mã QR sạch cho bạn và Gửi lại qua Email hoặc Zalo đã được đăng ký! Cảm ơn bạn đã sử dụng dịch vụ của SGO Việt Nam"
        );
        setFullname("");
        setPhone("");
        setEmail("");
        setQrUrl("");
      } else {
        alert(res.message);
      }
    } catch (error: any) {
      console.error("Lỗi gửi dữ liệu:", error?.message);
      alert(
        "Có lỗi xảy ra trong quá trình gửi dữ liệu. Vui lòng thử lại sau ít phút."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tao-form" className="max-w-7xl mx-auto px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10 relative">
        <div className="text-center mb-8">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            ĐĂNG KÝ KHỞI TẠO MÃ QR CODE
          </h2>
          <p className="text-slate-500 text-[11px] mt-1.5">
            Hệ thống sẽ ghi nhận thông tin và xuất bản mã sạch gửi trực tiếp qua Zalo/Email của bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullname" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Họ và tên *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-xs">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Số điện thoại *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-xs">
                  <i className="fa-solid fa-phone"></i>
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={handlePhoneBlur}
                  maxLength={10}
                  placeholder="Ví dụ: 0912345678"
                  required
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${
                    phoneError ? "border-red-500" : "border-slate-200"
                  } rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900`}
                />
              </div>
              {phoneError && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">{phoneError}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Địa chỉ Email *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-xs">
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ví dụ: hotro@sgodata.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="qrUrl" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              Url (Link) cần tạo QR *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-xs">
                <i className="fa-solid fa-link"></i>
              </span>
              <input
                type="url"
                id="qrUrl"
                name="qrUrl"
                value={qrUrl}
                onChange={(e) => setQrUrl(e.target.value)}
                placeholder="https://facebook.com/cua-hang-cua-ban"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 text-center transition-all cursor-pointer text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i> Đang xử lý dữ liệu...
                </>
              ) : (
                <>
                  Tạo mã QR ngay thôi! <i className="fa-solid fa-wand-magic-sparkles text-[10px]"></i>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center text-xs text-slate-400 font-medium">
          Hệ thống được tài trợ bởi{" "}
          <a
            href="https://qr.sgodata.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-bold"
          >
            qr.sgodata.com
          </a>
        </div>
      </div>
    </section>
  );
}
