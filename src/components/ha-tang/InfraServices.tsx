export default function InfraServices() {
  return (
    <section id="services-detail" className="mb-24">
      {/* SECTION TITLE */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Chi Tiết Giải Pháp Hạ Tầng Số SGO
        </h2>
        <p className="text-slate-500 text-sm font-light">
          Cung cấp trọn gói các phân hệ hạ tầng mạng kết nối lõi ổn định, an toàn phục vụ vận hành Website, CRM/ERP và liên lạc nội bộ doanh nghiệp.
        </p>
      </div>

      {/* SERVICE DETAILS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BLOCK 1: TÊN MIỀN & HOSTING */}
        <div className="feature-card bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner">
                <i className="fa-solid fa-globe"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">1. Đăng ký Tên miền &amp; NVMe Hosting</h3>
                <p className="text-xs text-blue-600 font-medium tracking-wide uppercase">Khởi tạo thương hiệu số nhanh chóng</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Cung cấp hệ thống quản lý tên miền quốc gia (.vn, .com.vn) và quốc tế (.com, .net...) chính hãng bảo mật cao. Đi kèm giải pháp Cloud Hosting lưu trữ dữ liệu website sử dụng hoàn toàn ổ cứng NVMe chuyên dụng, giúp tăng tốc độ tải trang gấp 10 lần so với ổ cứng SSD thông thường.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pt-2 font-light">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-emerald-500"></i> Miễn phí chứng chỉ bảo mật SSL Let&apos;s Encrypt
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-emerald-500"></i> Bảng điều khiển cPanel/DirectAdmin trực quan dễ dùng
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-emerald-500"></i> Tự động quét và ngăn chặn mã độc độc hại
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Hosting chỉ từ <strong className="text-slate-700 font-semibold">45.000đ</strong>/tháng
            </span>
            <a href="#register" className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1">
              Đăng ký ngay <i className="fa-solid fa-chevron-right text-xs"></i>
            </a>
          </div>
        </div>

        {/* BLOCK 2: CLOUD SERVER (VPS) */}
        <div className="feature-card bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner">
                <i className="fa-solid fa-cloud-sun"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">2. Điện toán đám mây Cloud Server</h3>
                <p className="text-xs text-indigo-600 font-medium tracking-wide uppercase">Hiệu năng độc lập - May đo cấu hình</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Giải pháp máy chủ ảo dùng riêng tối ưu cho các doanh nghiệp chạy ứng dụng nặng như CRM, ERP, App Mobile, Hệ thống Kế toán hoặc Website thương mại điện tử lớn. Toàn bộ tài nguyên CPU, RAM, Storage được cam kết độc lập, không chia sẻ, giúp hệ thống hoạt động ổn định liên tục.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pt-2 font-light">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-indigo-500"></i> Khởi tạo nhanh chóng, Hot-resize nâng cấp trong 5 phút
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-indigo-500"></i> Hạ tầng ảo hóa KVM tiên tiến nhất hiện nay
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-indigo-500"></i> Địa chỉ IP tĩnh độc lập, sạch, không dính blacklist
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Cloud Server từ <strong className="text-slate-700 font-semibold">190.000đ</strong>/tháng
            </span>
            <a href="cloud-server" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1">
              Tùy biến cấu hình <i className="fa-solid fa-chevron-right text-xs"></i>
            </a>
          </div>
        </div>

        {/* BLOCK 3: EMAIL HOSTING / EMAIL SERVER */}
        <div className="feature-card bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner">
                <i className="fa-solid fa-envelope-open-text"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">3. Email Hosting / Email Server Doanh Nghiệp</h3>
                <p className="text-xs text-amber-600 font-medium tracking-wide uppercase">Giao dịch chuyên nghiệp theo đuôi tên miền riêng</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Giải pháp thư điện tử chuyên biệt mang định dạng tên miền công ty. Hệ thống sử dụng dải IP sạch uy tín cao kết hợp cấu hình bảo mật chuyên sâu giúp tối ưu hóa tỷ lệ thư vào thẳng hộp thư chính (Inbox), hạn chế tối đa tình trạng thất lạc thư hay bị rơi vào Spam, Junk mail.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pt-2 font-light">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-amber-500"></i> Tích hợp công nghệ lọc Spam, virus, mã độc đa tầng thông minh
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-amber-500"></i> Hỗ trợ đầy đủ các bản ghi định danh nâng cao: SPF, DKIM, DMARC
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-amber-500"></i> Giao diện Webmail mượt mà, đồng bộ hoàn hảo trên Outlook, Mobile
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Gói Email chỉ từ <strong className="text-slate-700 font-semibold">99.000đ</strong>/tháng
            </span>
            <a href="/email" className="text-sm font-semibold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1">
              Xem bảng giá Email <i className="fa-solid fa-chevron-right text-xs"></i>
            </a>
          </div>
        </div>

        {/* BLOCK 4: CHỖ ĐẶT MÁY CHỦ */}
        <div className="feature-card bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner">
                <i className="fa-solid fa-network-wired"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">4. Thuê Server riêng &amp; Chỗ đặt máy chủ (Colocation)</h3>
                <p className="text-xs text-cyan-600 font-medium tracking-wide uppercase">Hạ tầng vật lý chuyên sâu cấp độ Tập đoàn</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Dành cho doanh nghiệp cần thuê trọn gói phần cứng máy chủ vật lý riêng biệt hoặc muốn ký gửi thiết bị của mình đặt tại các Data Center đạt chuẩn Tier 3 quốc tế (Viettel IDC, VNPT, FPT). Đảm bảo các tiêu chuẩn khắt khe về nguồn điện kép, hệ thống làm mát tối ưu và băng thông Core tốc độ cao.
            </p>
            <ul className="space-y-2 text-xs text-slate-600 pt-2 font-light">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-cyan-500"></i> Hệ thống cứu hỏa không dùng nước FM200 an toàn phần cứng
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-cyan-500"></i> Nguồn điện dự phòng UPS N+1 liên tục 24/7
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-cyan-500"></i> Hỗ trợ dải tủ Rack cá nhân lẻ từ 1U, 2U đến trọn không gian Cage
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Kết nối cổng Internet Core lên đến <strong className="text-slate-700 font-semibold">10Gbps</strong>
            </span>
            <a href="#register" className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 inline-flex items-center gap-1">
              Liên hệ khảo sát chỗ đặt <i className="fa-solid fa-chevron-right text-xs"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
