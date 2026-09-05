export default function ContractPricing() {
  return (
    <section id="pricing" className="py-20 bg-slate-100/60 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Chi Phí Linh Hoạt Theo Nhu Cầu Giao Dịch
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-light">
            Mua gói lượt ký bảo lưu vô thời hạn, không giới hạn tính năng và số lượng người dùng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Gói Start */}
          <div className="price-card bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                Doanh nghiệp vừa &amp; nhỏ
              </span>
              <h3 className="text-2xl font-black text-slate-900">Gói e-START</h3>
              <p className="text-xs text-slate-400 font-light">
                Phù hợp khởi đầu số hóa quy trình giao dịch nội bộ và đối tác nhỏ lẻ.
              </p>
              <div className="py-2 border-y border-slate-100">
                <span className="text-3xl font-black text-slate-900">2.000.000đ</span>
                <span className="text-xs text-slate-400"> / 100 Hợp đồng</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 font-light">
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Không giới hạn người dùng &amp; phòng ban
                </li>
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Đầy đủ phương thức ký: OTP, USB Token, Ký số từ xa
                </li>
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Lưu trữ Cloud mã hóa miễn phí 1 năm
                </li>
              </ul>
            </div>
            <a
              href="#register-form"
              className="block text-center border border-blue-200 text-blue-600 font-semibold py-3 rounded-xl text-xs hover:bg-blue-50 transition-colors mt-6"
            >
              Đăng Ký Gói
            </a>
          </div>

          {/* Gói Pro */}
          <div className="price-card bg-white rounded-3xl p-8 border-2 border-blue-500 shadow-xl space-y-6 flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
              Lựa chọn nhiều nhất
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                Doanh nghiệp tăng trưởng
              </span>
              <h3 className="text-2xl font-black text-slate-900">Gói e-GROWTH</h3>
              <p className="text-xs text-slate-400 font-light">
                Tối ưu cho doanh nghiệp có luồng ký kết nhân sự, đại lý, kinh doanh liên tục.
              </p>
              <div className="py-2 border-y border-slate-100">
                <span className="text-3xl font-black text-slate-900">7.500.000đ</span>
                <span className="text-xs text-slate-400"> / 500 Hợp đồng</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 font-light">
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Đầy đủ toàn bộ tính năng của gói e-START
                </li>
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Thiết lập luồng phê duyệt đa cấp tự động
                </li>
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Tự động nhắc nhở cảnh báo hợp đồng sắp hết hạn
                </li>
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Hỗ trợ kỹ thuật ưu tiên 24/7
                </li>
              </ul>
            </div>
            <a
              href="#register-form"
              className="block text-center bg-blue-600 text-white font-semibold py-3 rounded-xl text-xs hover:bg-blue-700 transition-colors mt-6 shadow-md shadow-blue-500/10"
            >
              Đăng Ký Gói
            </a>
          </div>

          {/* Gói Enterprise/API */}
          <div className="price-card bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-md inline-block">
                Hệ thống lớn / ERP
              </span>
              <h3 className="text-2xl font-black text-slate-900">e-ENTERPRISE / API</h3>
              <p className="text-xs text-slate-400 font-light">
                Dành cho tập đoàn cần tích hợp cổng ký số trực tiếp vào phần mềm CRM/ERP nội bộ.
              </p>
              <div className="py-2 border-y border-slate-100">
                <span className="text-2xl font-black text-slate-900">Liên hệ khảo sát</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 font-light">
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Cung cấp tài liệu API mở kết nối toàn diện
                </li>
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Tùy biến logic luồng ký theo cấu trúc tập đoàn
                </li>
                <li className="flex gap-2 items-center">
                  <i className="fa-solid fa-check text-emerald-500"></i> Tùy chọn lưu trữ Private Cloud biệt lập bảo mật
                </li>
              </ul>
            </div>
            <a
              href="#register-form"
              className="block text-center border border-blue-200 text-blue-600 font-semibold py-3 rounded-xl text-xs hover:bg-blue-50 transition-colors mt-6"
            >
              Liên Hệ Tích Hợp API
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
