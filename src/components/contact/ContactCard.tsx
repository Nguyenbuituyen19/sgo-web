"use client";

import { useState } from "react";

export default function ContactCard() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !message) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại, Email và Nội dung!");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFullName("");
      setPhone("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1000);
  };

  const hanoiOffice = {
    name: "Trụ sở chính Hà Nội",
    address: "Tầng 12 Tòa nhà Licogi 13, số 164 Khuất Duy Tiến, P.Thanh Xuân, TP. Hà Nội",
    phone: "0246.29.27.089",
    hotline: "0981.185.620",
    email: "contact@sgodata.com",
    taxId: "0108806638",
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 lg:-mt-64 relative z-30">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Form Column (7 Cols ~58%) */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
          {/* Header Tag */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-black text-amber-600 uppercase tracking-widest">
                LIÊN HỆ
              </span>
              <span className="w-12 h-0.5 bg-amber-500 rounded-full"></span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Công Ty Cổ Phần Công Nghệ Và Truyền Thông SGO Việt Nam
            </h2>
          </div>

          {/* Submit Success Alert */}
          {submitSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-start gap-2.5 animate-in fade-in duration-200">
              <i className="fa-solid fa-circle-check text-emerald-600 text-base shrink-0 mt-0.5"></i>
              <div>
                <p className="font-extrabold text-sm">Gửi thông tin liên hệ thành công!</p>
                <p className="font-normal text-emerald-700 mt-0.5">
                  Cảm ơn bạn. Đội ngũ tư vấn SGO sẽ phản hồi lại thông tin của bạn trong thời gian sớm nhất.
                </p>
              </div>
            </div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nhập họ và tên..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tiêu đề</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Nhập tiêu đề cần tư vấn..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nội dung <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập nội dung thông điệp hoặc dịch vụ bạn quan tâm..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-spinner animate-spin"></i> Đang gửi thông tin...
                </span>
              ) : (
                <span>Gửi ngay</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Info Column (5 Cols ~42% Blue Gradient Background) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <h3 className="text-xl font-black tracking-tight border-b border-blue-500/50 pb-4">
              Liên hệ chúng tôi
            </h3>

            {/* Info List */}
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-id-card text-blue-200 text-xs"></i>
                </div>
                <div>
                  <span className="text-blue-200 block text-[11px] font-medium">Mã số thuế:</span>
                  <span className="font-bold text-sm tracking-wide">{hanoiOffice.taxId}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-phone text-blue-200 text-xs"></i>
                </div>
                <div>
                  <span className="text-blue-200 block text-[11px] font-medium">Điện thoại bàn:</span>
                  <span className="font-bold text-sm">{hanoiOffice.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-mobile-screen-button text-blue-200 text-xs"></i>
                </div>
                <div>
                  <span className="text-blue-200 block text-[11px] font-medium">Hotline tư vấn:</span>
                  <span className="font-black text-sm text-amber-300">{hanoiOffice.hotline}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-envelope text-blue-200 text-xs"></i>
                </div>
                <div>
                  <span className="text-blue-200 block text-[11px] font-medium">Email hỗ trợ:</span>
                  <a
                    href={`mailto:${hanoiOffice.email}`}
                    className="font-bold hover:text-amber-200 transition-colors"
                  >
                    {hanoiOffice.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-blue-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-location-dot text-blue-200 text-xs"></i>
                </div>
                <div>
                  <span className="text-blue-200 block text-[11px] font-medium">
                    {hanoiOffice.name}:
                  </span>
                  <span className="font-medium text-xs leading-relaxed block mt-0.5 text-blue-50">
                    {hanoiOffice.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Inner White Support Card */}
            <div className="bg-white text-slate-900 rounded-2xl p-4 shadow-lg text-center space-y-2">
              <span className="text-[11px] font-extrabold text-blue-700 uppercase tracking-wider block">
                HỆ THỐNG CHĂM SÓC KHÁCH HÀNG 24/7
              </span>
              <p className="text-[11px] text-slate-500">Gửi ticket để được hỗ trợ nhanh nhất</p>
              <a
                href="#ticket"
                className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs w-full py-2.5 rounded-xl transition-all shadow-xs"
              >
                <i className="fa-solid fa-ticket text-xs"></i> Tạo Ticket Hỗ Trợ
              </a>
            </div>
          </div>

          {/* Social Icons Section */}
          <div className="pt-4 border-t border-blue-500/40 text-center space-y-2">
            <span className="text-[11px] text-blue-200 block font-medium">
              Mạng xã hội chúng tôi đang sử dụng
            </span>
            <div className="flex items-center justify-center gap-2.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-blue-600 text-white flex items-center justify-center transition-all text-sm"
                title="Facebook"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-red-600 text-white flex items-center justify-center transition-all text-sm"
                title="Youtube"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-blue-500 text-white flex items-center justify-center transition-all text-xs font-black"
                title="Zalo"
              >
                Zalo
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-blue-700 text-white flex items-center justify-center transition-all text-sm"
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/15 hover:bg-white hover:text-slate-900 text-white flex items-center justify-center transition-all text-sm"
                title="Tiktok"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
