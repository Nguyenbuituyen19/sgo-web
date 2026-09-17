export default function DataBiHeader() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white py-12 px-4 border-b border-slate-800 text-center min-h-[600px] flex flex-col justify-center">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-indigo-500/20">
          <i className="fa-solid fa-bolt"></i> Nền tảng Dữ liệu &amp; Quản trị Hiện đại
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Biến Dữ Liệu Thô Thành <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
            Quyết Định Chiến Lược
          </span>
        </h1>
        <p className="text-slate-300 text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed">
          Xây dựng Hạ tầng Dữ liệu vững chắc, tự động hóa luồng thông tin và tích hợp hệ thống Business Intelligence (BI) toàn diện cho doanh nghiệp của bạn.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a
            href="#lien-he"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
          >
            Đăng ký Khảo sát Hạ tầng <i className="fa-solid fa-arrow-right text-xs"></i>
          </a>
          <a
            href="#giai-phap"
            className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center"
          >
            Khám phá chi tiết
          </a>
        </div>
      </div>
    </header>
  );
}

