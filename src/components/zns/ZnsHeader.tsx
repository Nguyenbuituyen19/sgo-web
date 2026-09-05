export default function ZnsHeader() {
  return (
    <header className="relative bg-gradient-to-b from-sky-500 to-sky-700 text-white py-12 px-4 overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <span className="bg-white/20 text-white border border-white/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Xu hướng Chăm sóc khách hàng 2026
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Chăm Sóc Khách Hàng Tự Động Với <span className="text-yellow-300">Zalo ZNS</span>
            <br className="hidden md:inline" /> Tỷ Lệ Đọc Tin Đến 95%
          </h1>
          <p className="text-base md:text-lg text-sky-100 max-w-2xl mx-auto lg:mx-0 font-light">
            Giải pháp gửi thông báo chăm sóc khách hàng chủ động qua số điện thoại bằng hạ tầng Zalo Notification Service (ZNS). Chi phí tối ưu, giao diện tin nhắn thương hiệu (Brandname) cực uy tín.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-yellow-300">40%</div>
              <div className="text-xs text-sky-100 font-light">Tiết kiệm hơn SMS cổ điển</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-yellow-300">100%</div>
              <div className="text-xs text-sky-100 font-light">Hỗ trợ nút bấm hành động</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-extrabold text-yellow-300">&lt; 15p</div>
              <div className="text-xs text-sky-100 font-light">Tích hợp nhanh qua API</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <a
              href="#register"
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-xl text-center shadow-lg transition-all text-sm"
            >
              Đăng ký Tích hợp &amp; Test API
            </a>
            <a
              href="#usecases"
              className="bg-sky-800/40 hover:bg-sky-800/60 border border-sky-400 text-white font-semibold px-8 py-4 rounded-xl text-center transition-all text-sm"
            >
              Xem các dạng tin nhắn
            </a>
          </div>
        </div>

        {/* Mockup Tin Nhắn Minh Họa */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-slate-900 text-slate-100 p-3 rounded-3xl w-64 md:w-72 border-4 border-slate-700 shadow-2xl space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] text-slate-500 ml-auto">Zalo OA Verified</span>
            </div>
            <div className="bg-white text-slate-900 p-3 rounded-xl shadow space-y-2">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="w-6 h-6 bg-sky-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                  S
                </div>
                <span className="font-bold text-xs">SGO VIỆT NAM</span>
                <i className="fa-solid fa-circle-check text-sky-500 text-[10px]"></i>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm text-slate-900">Xác Nhận Đơn Hàng Thành Công</h4>
                <p className="text-[11px] text-slate-500">
                  Kính chào anh/chị Nguyễn Văn A, SGO đã tiếp nhận đơn hàng của quý khách.
                </p>
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-100 text-[10px] space-y-1">
                <div>
                  <strong>Mã đơn hàng:</strong> #SGO-2026
                </div>
                <div>
                  <strong>Trạng thái:</strong> Đang vận chuyển
                </div>
              </div>
              <a
                href="#register"
                className="block text-center bg-sky-50 text-sky-600 border border-sky-200 py-1.5 rounded-lg text-xs font-semibold hover:bg-sky-100"
              >
                <i className="fa-solid fa-truck-fast mr-1"></i> Theo dõi đơn hàng
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
