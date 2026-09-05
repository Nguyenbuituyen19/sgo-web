"use client";

export default function ContactSupportBar() {
  return (
    <div className="max-w-4xl mx-auto px-4 my-8">
      <div className="bg-white rounded-full p-2 sm:p-3 shadow-xl border border-slate-200/90 flex items-center justify-around flex-wrap gap-2">
        {/* Item 1: Hotline */}
        <a
          href="tel:0981185620"
          className="flex items-center gap-2.5 px-4 py-2 rounded-full hover:bg-amber-50 text-slate-800 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-phone"></i>
          </div>
          <div>
            <span className="font-extrabold text-xs text-slate-900 block leading-none">
              0981.185.620
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Hotline tư vấn 24/7</span>
          </div>
        </a>

        <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>

        {/* Item 2: Ticket */}
        <a
          href="#ticket"
          className="flex items-center gap-2.5 px-4 py-2 rounded-full hover:bg-blue-50 text-slate-800 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-headset"></i>
          </div>
          <div>
            <span className="font-extrabold text-xs text-slate-900 block leading-none">
              GỬI TICKET
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Hỗ trợ kỹ thuật xử lý ngay</span>
          </div>
        </a>

        <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>

        {/* Item 3: Live Chat */}
        <a
          href="https://zalo.me/0981185620"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 px-4 py-2 rounded-full hover:bg-emerald-50 text-slate-800 transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-comments"></i>
          </div>
          <div>
            <span className="font-extrabold text-xs text-slate-900 block leading-none">
              LIVE CHAT
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Trực tuyến tư vấn ngay</span>
          </div>
        </a>
      </div>
    </div>
  );
}
