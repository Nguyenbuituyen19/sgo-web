import Link from "next/link";

export default function LicenseNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">
            SGO<span className="text-slate-900">DATA</span>
          </span>
          <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-0.5 rounded-full border border-indigo-100">
            Official Key
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Trang Chủ
          </Link>
          <a href="#products" className="hover:text-indigo-600 transition-colors">
            Sản Phẩm
          </a>
          <a href="#features" className="hover:text-indigo-600 transition-colors">
            Ưu Điểm
          </a>
          <a href="#steps" className="hover:text-indigo-600 transition-colors">
            Hướng Dẫn
          </a>
          <a href="#faq" className="hover:text-indigo-600 transition-colors">
            FAQ
          </a>
        </nav>
        <div>
          <a
            href="#products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-all text-sm"
          >
            Mua Ngay
          </a>
        </div>
      </div>
    </header>
  );
}
