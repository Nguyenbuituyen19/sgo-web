export default function LicenseHeader() {
  return (
    <header className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12 px-4 overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
          Bản quyền chính hãng - Kích hoạt trực tiếp từ Microsoft
        </span>
        <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight max-w-6xl mx-auto leading-tight">
          Bản Quyền Windows, Office &amp; Server{" "}
          <span className="text-indigo-400">Giá Tốt Nhất Cho Doanh Nghiệp &amp; Cá Nhân</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Cung cấp key bản quyền chính hãng vĩnh viễn, bảo hành suốt quá trình sử dụng, hỗ trợ kỹ thuật 24/7 tại <strong>sgodata.com</strong>.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 text-sm"
          >
            <span>Xem Bảng Giá</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </a>
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm"
          >
            <i className="fa-solid fa-headset text-indigo-400"></i>
            <span>Tư Vấn Nhanh (Zalo)</span>
          </a>
        </div>

        {/* Trust badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-800 text-slate-400 text-xs md:text-sm font-medium">
          <div className="flex items-center justify-center space-x-2">
            <i className="fa-solid fa-arrows-rotate text-indigo-400 text-lg"></i>
            <span>Bảo Hành 1 đổi 1</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <i className="fa-solid fa-bolt text-indigo-400 text-lg"></i>
            <span>Giao Key Tự Động 24/7</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <i className="fa-solid fa-award text-indigo-400 text-lg"></i>
            <span>Bản Quyền Vĩnh Viễn</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <i className="fa-solid fa-headset text-indigo-400 text-lg"></i>
            <span>Hỗ Trợ Cài Đặt Miễn Phí</span>
          </div>
        </div>
      </div>
    </header>
  );
}
