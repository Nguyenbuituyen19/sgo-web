export default function ContractHeader() {
  return (
    <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white py-12 px-4 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="max-w-5xl lg:col-span-7 space-y-4 text-center lg:text-left">
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Đầy đủ tính pháp lý • An toàn tuyệt đối
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Giải Pháp Hợp Đồng Điện Tử
            <br /> <span className="text-blue-400">Tối Ưu 90% Quy Trình</span> Cho Doanh Nghiệp
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light">
            SGO e-Contract giúp doanh nghiệp số hóa toàn bộ quy trình trình duyệt, ký kết hợp đồng thương mại, nhân sự từ xa chỉ trong 2 phút trên mọi thiết bị di động.
          </p>

          {/* Cam kết nhanh */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 text-left text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check text-blue-400"></i> Ký số từ xa (Không Token)
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield text-blue-400"></i> Mã hóa bảo mật SHA
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-scale-balanced text-blue-400"></i> Đúng luật GDĐT
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-bolt text-blue-400"></i> Tiết kiệm 90% chi phí
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <a
              href="#pricing"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-center shadow-lg shadow-blue-600/30 transition-all text-sm"
            >
              Xem bảng giá gói
            </a>
            <a
              href="#register-form"
              className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold px-8 py-4 rounded-xl text-center transition-all text-sm"
            >
              Đăng ký dùng thử miễn phí
            </a>
          </div>
        </div>

        {/* Đăng ký nhanh bên phải Hero */}
        <div className="lg:col-span-5 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl space-y-4">
          <h3 className="text-lg font-bold text-white text-center">Nhận tài khoản Test Hệ Thống</h3>
          <p className="text-xs text-slate-400 text-center font-light">
            Trải nghiệm tính năng tạo phôi và ký OTP xác thực ngay lập tức
          </p>
          <div className="space-y-3 pt-2">
            <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 flex gap-3 items-center">
              <i className="fa-solid fa-bolt-lightning text-blue-400 text-lg"></i>
              <div>
                <div className="text-xs font-bold text-white">Ký kết không chạm</div>
                <div className="text-[11px] text-slate-400 font-light">
                  Đối tác ký số ngay trên điện thoại di động không cần cài app phức tạp.
                </div>
              </div>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 flex gap-3 items-center">
              <i className="fa-solid fa-box-archive text-blue-400 text-lg"></i>
              <div>
                <div className="text-xs font-bold text-white">Lưu trữ tập trung thông minh</div>
                <div className="text-[11px] text-slate-400 font-light">
                  Tra cứu, tìm kiếm, xuất dữ liệu hợp đồng cũ chỉ bằng 1 từ khóa.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
