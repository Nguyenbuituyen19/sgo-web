import Link from "next/link";

export default function ErpNavbar() {
  return (
    <nav className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-200 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">
            S
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight block text-slate-900 leading-none">
              SGO VIỆT NAM
            </span>
            <span className="text-[10px] text-slate-500 tracking-widest uppercase">
              ERP Solution
            </span>
          </div>
        </Link>
        <a
          href="#register"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10"
        >
          Đăng ký Demo
        </a>
      </div>
    </nav>
  );
}
