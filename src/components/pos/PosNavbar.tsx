import Link from "next/link";

export default function PosNavbar() {
  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
            S
          </div>
          <div>
            <span className="font-bold text-base tracking-tight block text-slate-900 leading-none">
              SGO POS
            </span>
            <span className="text-[9px] text-slate-500 tracking-wider uppercase">
              Bán hàng thông minh
            </span>
          </div>
        </Link>
        <a
          href="#trial-form"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-orange-500/20"
        >
          Dùng Thử Miễn Phí
        </a>
      </div>
    </nav>
  );
}
