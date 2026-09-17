export default function EmailHeader() {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-cyan-950 text-white py-12 px-4 text-center relative overflow-hidden min-h-[600px] flex flex-col justify-center">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent)] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
        <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-amber-500/20 inline-block">
          Chuẩn hóa giao dịch thương mại số
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
          Hệ Thống Email Hosting &amp; Email Server <br className="hidden md:inline" /> Riêng Cho Doanh Nghiệp Đẳng Cấp
        </h1>
        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Tạo dựng uy tín thương hiệu với đuôi tên miền riêng{" "}
          <code className="text-amber-400 bg-slate-900 px-2 py-0.5 rounded font-mono text-sm">
            @tenmiendoanhnghiep.com
          </code>
          . Tỷ lệ vào Inbox lên đến 99%, chống spam và bảo mật dữ liệu tuyệt đối.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 justify-center">
          <a
            href="#pricing"
            className="px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-950/50 text-xs md:text-sm"
          >
            Xem bảng giá gói Email
          </a>
          <a
            href="#features"
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl border border-slate-700 transition-all text-xs md:text-sm"
          >
            Tính năng chuyên sâu
          </a>
        </div>
      </div>
    </header>
  );
}
