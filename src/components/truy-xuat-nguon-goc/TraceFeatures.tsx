export default function TraceFeatures() {
  return (
    <section id="tinh-nang" className="mb-20 space-y-12">
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">
          Tính Năng Nổi Bật Của Hệ Thống SGO Trace
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tính năng 1 */}
        <div className="feature-card bg-white rounded-2xl p-8 border border-slate-100 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl mb-5">
              <i className="fa-solid fa-qrcode"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Mã QR Code Định Danh Độc Bản
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Cấp mã QR biến đổi hoặc mã QR theo lô duy nhất. Khi quét mã, hiển thị đầy đủ hình ảnh, video vùng trồng, chứng nhận chất lượng (VietGAP, GlobalGAP, OCOP).
            </p>
          </div>
        </div>

        {/* Tính năng 2 */}
        <div className="feature-card bg-white rounded-2xl p-8 border border-slate-100 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center text-xl mb-5">
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Nhật Ký Sản Xuất Điện Tử
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Hỗ trợ người nông dân, công nhân ghi chép thời gian thực quá trình bón phân, phun thuốc, thu hoạch ngay trên điện thoại. Dữ liệu minh bạch, chống tẩy xóa.
            </p>
          </div>
        </div>

        {/* Tính năng 3 */}
        <div className="feature-card bg-white rounded-2xl p-8 border border-slate-100 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-5">
              <i className="fa-solid fa-boxes-packing"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Quản Lý Lô Hàng & Chuỗi Cung Ứng
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Giám sát chặt chẽ hành trình từ đơn vị thu mua, nhà máy sơ chế, đơn vị vận chuyển (Logistics) đến hệ thống siêu thị, điểm bán lẻ phân phối.
            </p>
          </div>
        </div>

        {/* Tính năng 4 */}
        <div className="feature-card bg-white rounded-2xl p-8 border border-slate-100 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-5">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Tích Hợp Chống Hàng Giả
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Cảnh báo tức thì cho doanh nghiệp khi có dấu hiệu một mã QR bị sao chép hoặc quét bất thường tại nhiều vị trí địa lý khác nhau cùng một thời điểm.
            </p>
          </div>
        </div>

        {/* Tính năng 5 */}
        <div className="feature-card bg-white rounded-2xl p-8 border border-slate-100 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl mb-5">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              Báo Cáo & Thống Kê Quét
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Cung cấp dashboard thống kê chi tiết số lượt quét mã, khu vực địa lý, hệ điều hành thiết bị giúp doanh nghiệp thấu hiểu hành vi tiêu dùng của khách hàng.
            </p>
          </div>
        </div>

        {/* Tính năng 6 */}
        <div className="feature-card bg-white rounded-2xl p-8 border border-slate-100 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-5">
              <i className="fa-solid fa-link"></i>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              May Đo & Tích Hợp Hệ Thống
            </h4>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Sẵn sàng kết nối dữ liệu thông qua API mượt mà với hệ thống quản trị CRM / ERP hiện tại của doanh nghiệp, tối ưu quy trình vận hành đồng bộ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
