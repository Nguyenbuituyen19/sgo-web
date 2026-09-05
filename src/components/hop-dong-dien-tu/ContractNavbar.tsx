import Link from "next/link";

export default function ContractNavbar() {
  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1.5 transition-colors border-r border-slate-200 pr-4"
          >
            <i className="fa-solid fa-house"></i> Trang chủ
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <i className="fa-solid fa-file-signature"></i>
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block text-slate-900 leading-none">
                SGO e-CONTRACT
              </span>
              <span className="text-[9px] text-blue-600 tracking-wider font-semibold uppercase">
                Giải pháp ký số thông minh
              </span>
            </div>
          </div>
        </div>
        <a
          href="#register-form"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20"
        >
          Trải Nghiệm Demo
        </a>
      </div>
    </nav>
  );
}
