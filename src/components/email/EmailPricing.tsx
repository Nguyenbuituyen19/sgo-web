export default function EmailPricing() {
  return (
    <div id="pricing" className="mb-24">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <span className="text-amber-600 font-bold text-xs uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
          Bảng giá tối ưu
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Lựa Chọn Gói Phù Hợp Với Quy Mô Doanh Nghiệp
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* GÓI STARTUP */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Startup / Doanh nghiệp nhỏ
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">Email Basic</h3>
            </div>
            <div className="py-4 border-y border-slate-100">
              <span className="text-3xl font-black text-slate-900">99.000đ</span>
              <span className="text-xs text-slate-400"> / tháng</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-500"></i> Tối đa 10 tài khoản Email
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-500"></i> Dung lượng lưu trữ: 10GB / User
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-500"></i> Sử dụng tên miền riêng
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-500"></i> Bản ghi SPF, DKIM, DMARC chuẩn hóa
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <i className="fa-solid fa-xmark text-slate-300"></i> Không hỗ trợ Dedicated IP riêng
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4">
            <a
              href="#register-email"
              className="block w-full py-3 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-colors"
            >
              Đăng ký ngay
            </a>
          </div>
        </div>

        {/* GÓI PROFESSIONAL (PHỔ BIẾN) */}
        <div className="bg-slate-900 text-white border-2 border-amber-500 rounded-3xl p-8 shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow">
            Lựa chọn phổ biến nhất
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Doanh nghiệp vừa &amp; lớn
              </span>
              <h3 className="text-xl font-extrabold text-white">Email Professional</h3>
            </div>
            <div className="py-4 border-y border-slate-800">
              <span className="text-3xl font-black text-amber-400">299.000đ</span>
              <span className="text-xs text-slate-400"> / tháng</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-amber-400"></i> Tối đa 50 tài khoản Email
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-amber-400"></i> Dung lượng lưu trữ: 30GB / User
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-amber-400"></i> Tích hợp bộ lọc chống Spam cao cấp
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-amber-400"></i> Hỗ trợ Webmail, Outlook, Mobile App
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-amber-400"></i> Miễn phí chuyển đổi dữ liệu cũ sang
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4">
            <a
              href="#register-email"
              className="block w-full py-3 text-center bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
            >
              Đăng ký cấu hình này
            </a>
          </div>
        </div>

        {/* GÓI ENTERPRISE / EMAIL SERVER RIÊNG */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative">
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Tập đoàn / Doanh nghiệp lớn
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">Email Server Riêng</h3>
            </div>
            <div className="py-4 border-y border-slate-100">
              <span className="text-3xl font-black text-slate-900">Liên hệ</span>
              <span className="text-xs text-slate-400"> / May đo riêng</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-500"></i> Số lượng tài khoản không giới hạn
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-500"></i> Cấp phát Dedicated IP riêng biệt sạch
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-500"></i> Máy chủ ảo Cloud độc lập hoàn toàn
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-500"></i> Kiểm soát nhật ký log truy cập chi tiết
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-check text-emerald-500"></i> Kỹ thuật viên hỗ trợ riêng 24/7/365
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4">
            <a
              href="#register-email"
              className="block w-full py-3 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-colors"
            >
              Yêu cầu khảo sát
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
