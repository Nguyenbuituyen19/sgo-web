import Link from "next/link";

export default function InfraHeader() {
  return (
    <>
      {/* HERO BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-cyan-950 text-white py-12 px-4 text-center relative overflow-hidden min-h-[600px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent)] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-cyan-500/20">
            Hạ tầng số vững chắc
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mt-4 mb-6 leading-tight tracking-tight">
            Nền Tảng Lưu Trữ Điện Toán Đám Mây <br className="hidden md:inline" /> &amp; Email Chuyên Nghiệp Cho Doanh Nghiệp
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Đường truyền tốc độ cao, máy chủ độc lập ổn định, hệ thống Email tên miền bảo mật tuyệt đối. Trọn gói giải pháp nâng tầm uy tín giao dịch thương mại số.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href="#register"
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-cyan-950/50 text-sm"
            >
              Nhận tư vấn cấu hình
            </a>
            <a
              href="#services-detail"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-xl border border-slate-700 transition-all text-sm"
            >
              Xem chi tiết dịch vụ
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
