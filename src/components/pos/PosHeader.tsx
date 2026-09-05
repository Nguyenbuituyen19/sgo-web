export default function PosHeader() {
  return (
    <header className="bg-gradient-to-b from-blue-50 to-white py-12 px-4 relative overflow-hidden border-b border-slate-200 min-h-[600px] flex flex-col justify-center">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Giải pháp quản lý tối ưu năm 2026
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900">
            Quản Lý Cửa Hàng <span className="text-blue-600">Dễ Dàng</span>,<br className="hidden md:inline" /> Bán Hàng Nhanh Hơn Gấp <span className="text-orange-500">2 Lần</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-light">
            Phần mềm SGO POS giúp bạn tính tiền siêu tốc, quản lý chính xác tồn kho, tự động hóa báo cáo thu chi và kiểm soát cửa hàng từ xa ngay trên điện thoại.
          </p>

          {/* Điểm cộng nhanh */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-2 text-left">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <i className="fa-solid fa-circle-check text-emerald-500 text-base"></i> Dễ sử dụng
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <i className="fa-solid fa-circle-check text-emerald-500 text-base"></i> Tốc độ cao
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <i className="fa-solid fa-circle-check text-emerald-500 text-base"></i> Không mất phí ẩn
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <a
              href="#trial-form"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-center shadow-lg shadow-blue-600/20 transition-all text-sm"
            >
              Tạo tài khoản dùng thử ngay
            </a>
            <a
              href="#features"
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold px-8 py-4 rounded-xl text-center transition-all text-sm"
            >
              Xem tính năng chi tiết
            </a>
          </div>
        </div>

        {/* Khung hình ảnh/mockup minh họa hoặc cam kết nhanh */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xl space-y-3">
          <div className="border-b border-slate-100 pb-3 text-center lg:text-left">
            <h3 className="text-lg font-bold text-slate-900">Tại sao 10.000+ chủ shop tin dùng?</h3>
          </div>
          <div className="space-y-3">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Tính tiền chỉ mất 3 giây</h4>
                <p className="text-xs text-slate-500 font-light">
                  Quét mã vạch tự động, in hóa đơn nhanh gọn, không lo khách chờ lâu vào giờ cao điểm.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-mobile"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Xem báo cáo mọi lúc, mọi nơi</h4>
                <p className="text-xs text-slate-500 font-light">
                  Đi du lịch, đi công tác vẫn theo dõi được doanh thu, số đơn hàng phát sinh tức thì trên app di động.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-share-nodes"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Đồng bộ các sàn TMĐT &amp; Fanpage</h4>
                <p className="text-xs text-slate-500 font-light">
                  Tự động trừ tồn kho khi có đơn hàng từ Shopee, Lazada, TikTok Shop hay Facebook.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
