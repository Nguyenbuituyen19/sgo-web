export default function PosFeatures() {
  return (
    <section id="features" className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Tính Năng Giúp Bạn Đập Tan Nỗi Lo Thất Thoát
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-light">
          Đầy đủ nghiệp vụ quản lý từ đơn giản đến chuyên sâu, thao tác mượt mà trên cả máy tính lẫn điện thoại.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tính năng 1 */}
        <div className="feature-card bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <div className="text-blue-600 text-xl mb-4">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <h3 className="font-bold text-base text-slate-900 mb-2">Bán hàng tại quầy &amp; online</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Giao diện POS thông minh, tìm kiếm hàng hóa theo tên hoặc mã vạch nhanh chóng. Hỗ trợ thanh toán quét mã QR động ngân hàng cực tiện.
          </p>
        </div>

        {/* Tính năng 2 */}
        <div className="feature-card bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <div className="text-orange-500 text-xl mb-4">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>
          <h3 className="font-bold text-base text-slate-900 mb-2">Quản lý kho thông minh</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Tự động trừ kho khi có đơn hàng. Cảnh báo thông minh khi hàng hóa sắp hết vượt định mức hoặc sắp hết hạn sử dụng.
          </p>
        </div>

        {/* Tính năng 3 */}
        <div className="feature-card bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <div className="text-emerald-500 text-xl mb-4">
            <i className="fa-solid fa-chart-pie"></i>
          </div>
          <h3 className="font-bold text-base text-slate-900 mb-2">Báo cáo doanh thu trực quan</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Hệ thống biểu đồ tự động thống kê doanh số, lợi nhuận ròng, top mặt hàng bán chạy giúp bạn biết rõ cửa hàng lãi lỗ ra sao từng ngày.
          </p>
        </div>

        {/* Tính năng 4 */}
        <div className="feature-card bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
          <div className="text-purple-500 text-xl mb-4">
            <i className="fa-solid fa-users"></i>
          </div>
          <h3 className="font-bold text-base text-slate-900 mb-2">Quản lý khách hàng &amp; CTV</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Lưu trữ lịch sử mua sắm, tự động tích điểm thưởng đổi quà để giữ chân khách quen và quản lý hoa hồng cho các cộng tác viên.
          </p>
        </div>
      </div>
    </section>
  );
}
