import Image from "next/image";

export default function VrHeader() {
  return (
    <header className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white py-12 px-4 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_45%)]"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Xu hướng công nghệ du lịch 2026
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Mang Toàn Bộ Không Gian <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Resort, Khách Sạn
            </span>{" "}
            Đến Mắt Khách Hàng
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
            Giải pháp Tour thực tế ảo VR360 cao cấp giúp khách lưu trú tự do khám phá phòng ốc, khuôn viên và dịch vụ trực tuyến 24/7. Tăng uy tín thương hiệu, bứt phá tỷ lệ chuyển đổi đặt phòng trực tiếp.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#tu-van"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all text-center shadow-lg shadow-blue-950/50 text-sm"
            >
              <i className="fa-solid fa-wand-magic-sparkles mr-2"></i>Số hóa không gian ngay
            </a>
            <a
              href="https://vr.sgodata.com/demo-resort"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/15 text-white border border-white/15 px-7 py-3.5 rounded-xl font-semibold transition-all text-center backdrop-blur-sm text-sm"
            >
              <i className="fa-solid fa-eye mr-2"></i>Xem Tour Demo 360°
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="bg-slate-800/40 p-3 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm relative">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="VR360 Hotel Resort"
              className="rounded-2xl w-full object-cover aspect-4/3"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 bg-blue-600/90 text-white rounded-full flex items-center justify-center text-xl animate-ping opacity-70 absolute"></span>
              <a
                href="https://vr.sgodata.com/demo-resort"
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl shadow-lg relative hover:bg-blue-700 transition-colors"
              >
                <i className="fa-solid fa-rotate text-2xl"></i>
              </a>
            </div>
            <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-2 text-xs text-slate-200">
              <i className="fa-solid fa-street-view text-blue-400 text-base"></i> Tương tác xoay góc nhìn 360 độ độc bản
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
