import Link from "next/link";

export default function CloudNavbar() {
  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md">
            S
          </div>
          <div>
            <span className="font-black text-lg tracking-wider block leading-none text-slate-900">
              SGO VIỆT NAM
            </span>
            <span className="text-blue-600 text-[10px] uppercase font-bold tracking-widest block mt-1">
              Cloud Server Solutions
            </span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Trang chủ
          </Link>
          <a href="#pricing-table" className="hover:text-blue-600 transition-colors">
            Bảng giá Cloud Server
          </a>
          <a href="#features" className="hover:text-blue-600 transition-colors">
            Tính năng nổi bật
          </a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">
            Hỏi đáp
          </a>
        </div>
        <div>
          <a
            href="tel:0981185620"
            className="flex items-center gap-2 text-slate-700 font-bold text-sm bg-blue-50 text-blue-600 px-4 py-2.5 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors shadow-sm"
          >
            <i className="fa-solid fa-phone text-blue-600"></i> 0981.185.620
          </a>
        </div>
      </div>
    </nav>
  );
}
