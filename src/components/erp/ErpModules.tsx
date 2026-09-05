export default function ErpModules() {
  return (
    <section id="features" className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Phân Hệ Cốt Lõi Được &quot;May Đo&quot; Chuyên Biệt
        </h2>
        <p className="text-slate-500 text-lg font-light">
          SGO ERP sở hữu cấu trúc mô-đun linh hoạt, dễ dàng mở rộng và tích hợp theo quy mô tăng trưởng của doanh nghiệp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Module 1 */}
        <div className="feature-card bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-6 shadow-inner">
            <i className="fa-solid fa-scale-balanced"></i>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Quản Trị Tài Chính - Kế Toán</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Tự động hóa dòng tiền, quản lý hạch toán kế toán, công nợ phải thu/phải trả. Hệ thống báo cáo quản trị realtime giúp ban lãnh đạo ra quyết định tức thì.
          </p>
        </div>

        {/* Module 2 */}
        <div className="feature-card bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl mb-6 shadow-inner">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Quản Lý Chuỗi Cung Ứng &amp; Kho</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Kiểm soát vị trí kho vật tư, hạn mức tồn kho tối ưu, quy trình mua hàng - nhập - xuất kho tự động thông qua mã vạch (Barcode/QR Code).
          </p>
        </div>

        {/* Module 3 */}
        <div className="feature-card bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl mb-6 shadow-inner">
            <i className="fa-solid fa-users-gear"></i>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Quản Trị Nhân Sự &amp; Tiền Lương</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Số hóa toàn bộ hồ sơ nhân sự, tự động hóa chấm công (máy khuôn mặt/GPS), tính lương phức tạp, KPI và lộ trình thăng tiến của nhân viên.
          </p>
        </div>

        {/* Module 4 */}
        <div className="feature-card bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-6 shadow-inner">
            <i className="fa-solid fa-handshake-angle"></i>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Quản Trị Khách Hàng CRM &amp; Bán Hàng</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Chuẩn hóa phễu bán hàng từ Leads đến Hợp đồng. Theo dõi lịch sử chăm sóc khách hàng của từng sale, tối ưu tỷ lệ chốt sales và giữ chân khách cũ.
          </p>
        </div>

        {/* Module 5 */}
        <div className="feature-card bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl mb-6 shadow-inner">
            <i className="fa-solid fa-industry"></i>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Quản Lý Sản Xuất (Nếu có)</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Hoạch định nhu cầu nguyên vật liệu (MRP), lập lịch trình sản xuất, định mức nguyên vật liệu (BOM) và tính toán chính xác giá thành sản phẩm đầu ra.
          </p>
        </div>

        {/* Module 6 */}
        <div className="feature-card bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center text-xl mb-6 shadow-inner">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <h3 className="text-xl font-bold mb-3 text-slate-900">Hệ Thống Báo Cáo Thông Minh BI</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-light">
            Trực quan hóa toàn bộ dữ liệu kinh doanh dưới dạng biểu đồ động. Dự báo xu hướng tài chính và cảnh báo sớm các rủi ro vận hành.
          </p>
        </div>
      </div>
    </section>
  );
}
