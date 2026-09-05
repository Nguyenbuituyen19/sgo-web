import Link from "next/link";

export default function VrNavbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 w-full">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl font-black shadow-md">
            <i className="fa-solid fa-cube"></i>
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-slate-900 tracking-tight text-lg">
              VR360 <span className="text-blue-600">TRAVEL</span>
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-medium">
              Virtual Tour Solution
            </span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#loi-ich" className="hover:text-blue-600 transition-colors">
            Lợi ích
          </a>
          <a href="#tinh-nang" className="hover:text-blue-600 transition-colors">
            Tính năng tích hợp
          </a>
          <a href="#bao-gia" className="hover:text-blue-600 transition-colors">
            Báo giá
          </a>
        </div>
        <div>
          <a
            href="#tu-van"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 inline-block"
          >
            Nhận tư vấn ngay
          </a>
        </div>
      </div>
    </nav>
  );
}
