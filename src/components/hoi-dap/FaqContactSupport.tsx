"use client";

import { useState, FormEvent } from "react";

export default function FaqContactSupport() {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert(
        "Cảm ơn bạn đã gửi thắc mắc! Chuyên viên SGO Việt Nam đã nhận được tin nhắn và sẽ phản hồi qua Zalo/SĐT của bạn trong ít phút."
      );
      setFullname("");
      setPhone("");
      setQuestionText("");
      setLoading(false);
    }, 600);
  };

  return (
    <section id="contact-support" className="max-w-7xl mx-auto px-4 py-16">
      <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 relative z-10">
          <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest bg-indigo-500/10 px-3.5 py-1 rounded-full border border-indigo-500/20">
            Bạn vẫn chưa tìm thấy câu trả lời?
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            Liên Hệ Trực Tiếp Với Đội Ngũ Kỹ Thuật SGO
          </h2>
          <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed">
            Các kênh liên hệ được sắp xếp theo mức độ phản hồi nhanh nhất để hỗ trợ bạn ngay lập tức.
          </p>
        </div>

        {/* Contact options ordered by accessibility */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-start">
          {/* Left Column: Instant Channels (Option 1 & Option 2) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              1. Kênh phản hồi nhanh tức thì (0-5 phút)
            </span>

            {/* OPTION 1: ZALO CHAT (Easiest & Fastest) */}
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-2xl transition-all shadow-md group cursor-pointer"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
                <i className="fa-solid fa-comment-dots"></i>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm">Chat Zalo Hỗ Trợ 24/7</h4>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">Nhanh nhất</span>
                </div>
                <p className="text-xs text-blue-100 font-light mt-0.5">
                  Nhắn tin trực tiếp với kỹ sư trực ca Zalo Official
                </p>
              </div>
            </a>

            {/* OPTION 2: PHONE HOTLINE */}
            <a
              href="tel:0981185620"
              className="flex items-center gap-4 bg-slate-800 hover:bg-slate-700 text-white p-4 rounded-2xl border border-slate-700 transition-all shadow-md group cursor-pointer"
            >
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center text-2xl shrink-0">
                <i className="fa-solid fa-phone-volume"></i>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm">Tổng Đài Hotline</h4>
                  <span className="text-[10px] text-emerald-400 font-mono">Trực 24/7</span>
                </div>
                <p className="text-xs text-slate-300 font-light mt-0.5">
                  Gọi điện tư vấn trực tiếp: <strong className="text-white font-bold">0981.185.620</strong>
                </p>
              </div>
            </a>

            {/* OPTION 4: EMAIL SUPPORT */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                2. Gửi Email Ticket bảo mật
              </span>
              <a
                href="mailto:contact@sgodata.com"
                className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <i className="fa-solid fa-envelope text-indigo-400 text-base"></i>
                <span>Email Hỗ trợ: <strong className="text-white">contact@sgodata.com</strong></span>
              </a>
            </div>
          </div>

          {/* Right Column: OPTION 3 - Quick Callback Request Form */}
          <div className="lg:col-span-7 bg-slate-950/80 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-inner">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-3">
              3. Gửi thắc mắc riêng - SGO gọi lại trong 15 phút
            </span>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Họ và tên của bạn *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Số điện thoại / Zalo *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0981xxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Nội dung câu hỏi thắc mắc *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Mô tả cụ thể thắc mắc của bạn về cấu hình server, báo giá dịch vụ hay chính sách bảo hành..."
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold rounded-xl text-xs shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner animate-spin"></i> Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi Câu Hỏi Tư Vấn <i className="fa-solid fa-paper-plane text-xs"></i>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
