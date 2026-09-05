export default function WebHeader() {
  return (
    <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 text-white py-12 px-4 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Thiết kế độc quyền &amp; Chuẩn SEO
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Sở Hữu Website Doanh Nghiệp
            <br /> <span className="text-purple-400">Bứt Phá Thương Hiệu</span> Trên Internet
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-light">
            SGO Việt Nam thiết kế website may đo theo yêu cầu, giao diện mượt mà trên Mobile, tốc độ tải trang dưới 2 giây và tối ưu chuyển đổi để giữ chân khách hàng tối đa.
          </p>

          {/* Cam kết nhanh tiêu chuẩn */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-left text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bolt text-purple-400"></i> Tốc độ siêu tốc
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-mobile-screen text-purple-400"></i> Responsive 100%
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass-chart text-purple-400"></i> Cấu trúc chuẩn SEO
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-purple-400"></i> Bảo mật SSL miễn phí
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <a
              href="#pricing"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl text-center shadow-lg shadow-purple-600/30 transition-all text-sm"
            >
              Xem các gói chi phí
            </a>
            <a
              href="#contact-form"
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold px-8 py-4 rounded-xl text-center transition-all text-sm"
            >
              Nhận layout mẫu miễn phí
            </a>
          </div>
        </div>

        {/* Khung hình ảnh/form tư vấn nhanh */}
        <div className="lg:col-span-5 bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl space-y-3">
          <h3 className="text-lg font-bold text-white text-center">Bắt đầu số hóa dự án của bạn</h3>
          <p className="text-xs text-slate-400 text-center font-light">
            Tư vấn chọn tính năng &amp; định hướng UI/UX phù hợp với ngành kinh doanh
          </p>
          <div className="space-y-3 pt-2">
            <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 flex gap-3 items-center">
              <i className="fa-solid fa-layer-group text-purple-400 text-lg"></i>
              <div>
                <div className="text-xs font-bold text-white">May đo theo nhận diện</div>
                <div className="text-[11px] text-slate-400 font-light">
                  Không dùng chung mẫu đại trà, làm theo đúng brand-guideline.
                </div>
              </div>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 flex gap-3 items-center">
              <i className="fa-solid fa-wand-magic-sparkles text-purple-400 text-lg"></i>
              <div>
                <div className="text-xs font-bold text-white">Tối ưu trải nghiệm (UX)</div>
                <div className="text-[11px] text-slate-400 font-light">
                  Bố cục nút bấm, luồng đi của khách hàng khoa học, tăng chuyển đổi đơn.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
