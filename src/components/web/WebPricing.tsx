export default function WebPricing() {
  return (
    <section id="pricing" className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Bảng Giá Dịch Vụ Thiết Kế Web Minh Bạch
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-light">
          Không phát sinh chi phí ẩn. Lựa chọn gói tối ưu nhất cho chặng đường phát triển của doanh nghiệp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Gói 1: LANDING PAGE */}
        <div className="price-card bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded-md inline-block">
              Gói Phễu / Chiến dịch
            </div>
            <h3 className="text-2xl font-black text-slate-900">Landing Page</h3>
            <p className="text-xs text-slate-400 font-light">
              Phù hợp chạy quảng cáo chuyển đổi, giới thiệu 1 sản phẩm/dịch vụ cốt lõi duy nhất.
            </p>
            <div className="py-2 border-y border-slate-100">
              <span className="text-3xl font-black text-slate-900">3.500.000đ</span>
              <span className="text-xs text-slate-400"> / Trọn gói</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 font-light">
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Thiết kế 1 trang dài chuẩn cấu chọn lọc
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Tối ưu UI/UX Mobile
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Tặng 01 năm Tên miền .com / .net
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Tặng 01 năm Hosting tốc độ cao
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Tích hợp nút gọi nhanh, Zalo, Facebook Messenger
              </li>
            </ul>
          </div>
          <a
            href="#contact-form"
            className="block text-center border border-purple-200 text-purple-600 font-semibold py-3 rounded-xl text-xs hover:bg-purple-50 transition-colors mt-6"
          >
            Chọn Gói Landing Page
          </a>
        </div>

        {/* Gói 2: WEB DOANH NGHIỆP (BÁN CHẠY NHẤT) */}
        <div className="price-card max-w-sm bg-white rounded-3xl p-8 border-2 border-purple-500 shadow-xl space-y-6 flex flex-col justify-between relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
            Phổ biến nhất
          </div>
          <div className="space-y-4">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded-md inline-block">
              Gói Nhận Diện
            </div>
            <h3 className="text-2xl font-black text-slate-900">Doanh Nghiệp Standard</h3>
            <p className="text-xs text-slate-400 font-light">
              Phù hợp cho các công ty giới thiệu dịch vụ, làm hồ sơ năng lực (Profile) trực tuyến uy tín.
            </p>
            <div className="py-2 border-y border-slate-100">
              <span className="text-3xl font-black text-slate-900">6.500.000đ</span>
              <span className="text-xs text-slate-400"> / Trọn gói</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 font-light">
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Đầy đủ phân hệ: Trang chủ, Giới thiệu, Dịch vụ, Tin tức, Liên hệ
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Thiết kế chuẩn cấu trúc SEO của Google
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Tặng Tên miền quốc gia .vn / .com.vn
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Hosting dung lượng lớn 5GB băng thông không giới hạn
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Bàn giao tài liệu hướng dẫn quản trị dễ dàng
              </li>
            </ul>
          </div>
          <a
            href="#contact-form"
            className="block text-center bg-purple-600 text-white font-semibold py-3 rounded-xl text-xs hover:bg-purple-700 transition-colors mt-6 shadow-md shadow-purple-500/10"
          >
            Chọn Gói Doanh Nghiệp
          </a>
        </div>

        {/* Gói 3: THEO YÊU CẦU / TMĐT */}
        <div className="price-card bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded-md inline-block">
              Gói Cao Cấp
            </div>
            <h3 className="text-2xl font-black text-slate-900">E-Commerce / Custom</h3>
            <p className="text-xs text-slate-400 font-light">
              Phù hợp cho các shop bán hàng chuyên nghiệp, sàn TMĐT thu nhỏ hoặc hệ thống có tính năng phức tạp.
            </p>
            <div className="py-2 border-y border-slate-100">
              <span className="text-2xl font-black text-slate-900">Từ 10.500.000đ</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 font-light">
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Tính năng Giỏ hàng, Đặt hàng, Quản lý đơn hàng, Thành viên
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Tích hợp thanh toán quét mã QR động, Ví điện tử
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Tự động tính phí vận chuyển theo API Giao Hàng Nhanh/Nhiều bên
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> Hạ tầng VPS riêng biệt để bảo mật thông tin và chịu tải cao
              </li>
              <li className="flex gap-2 items-center">
                <i className="fa-solid fa-check text-emerald-500"></i> May đo lập trình tính năng riêng theo logic yêu cầu
              </li>
            </ul>
          </div>
          <a
            href="#contact-form"
            className="block text-center border border-purple-200 text-purple-600 font-semibold py-3 rounded-xl text-xs hover:bg-purple-50 transition-colors mt-6"
          >
            Liên Hệ Khảo Sát Tính Năng
          </a>
        </div>
      </div>
    </section>
  );
}
