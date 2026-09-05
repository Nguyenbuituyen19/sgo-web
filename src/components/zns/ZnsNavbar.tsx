import Link from "next/link";

export default function ZnsNavbar() {
  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
            <i className="fa-solid fa-comment-sms"></i>
          </div>
          <div>
            <span className="font-bold text-base tracking-tight block text-slate-900 leading-none">
              SGO ZNS
            </span>
            <span className="text-[9px] text-sky-600 tracking-wider font-semibold uppercase">
              Zalo Business Solution
            </span>
          </div>
        </Link>
        <a
          href="#register"
          className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-sky-500/20"
        >
          Nhận Báo Giá Ngay
        </a>
      </div>
    </nav>
  );
}
