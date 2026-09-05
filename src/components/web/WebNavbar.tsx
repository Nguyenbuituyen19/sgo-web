import Link from "next/link";

export default function WebNavbar() {
  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Nút quay về trang chủ sgodata.com và Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-semibold text-slate-600 hover:text-purple-600 flex items-center gap-1.5 transition-colors border-r border-slate-200 pr-4"
          >
            <i className="fa-solid fa-house"></i> Trang chủ
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              <i className="fa-solid fa-code"></i>
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block text-slate-900 leading-none">
                SGO WEB
              </span>
              <span className="text-[9px] text-purple-600 tracking-wider font-semibold uppercase">
                Đỉnh cao giao diện số
              </span>
            </div>
          </div>
        </div>
        <a
          href="#pricing"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-purple-500/20"
        >
          Xem Bảng Giá
        </a>
      </div>
    </nav>
  );
}
