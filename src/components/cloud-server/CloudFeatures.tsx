export default function CloudFeatures() {
  return (
    <section id="features" className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Công nghệ máy chủ vượt trội
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Tính Năng Nổi Bật Của SGO Cloud Server
        </h2>
        <p className="text-slate-500 text-sm font-light">
          Được thiết kế dựa trên tiêu chí tốc độ, ổn định và bảo mật tuyệt đối cho dữ liệu doanh nghiệp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="feature-card bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl font-bold shadow-inner">
            <i className="fa-solid fa-microchip"></i>
          </div>
          <h3 className="font-bold text-lg text-slate-900">Ảo hóa KVM toàn phần</h3>
          <p className="text-slate-500 text-xs leading-relaxed font-light">
            Đảm bảo 100% tài nguyên CPU, RAM và Disk I/O được cấp phát độc lập cho riêng máy chủ của bạn, không chia sẻ với người dùng khác.
          </p>
        </div>

        <div className="feature-card bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl font-bold shadow-inner">
            <i className="fa-solid fa-hard-drive"></i>
          </div>
          <h3 className="font-bold text-lg text-slate-900">Ổ cứng Enterprise NVMe</h3>
          <p className="text-slate-500 text-xs leading-relaxed font-light">
            Sử dụng dải ổ cứng NVMe Enterprise cấu hình RAID 10 cho tốc độ đọc/ghi dữ liệu lên đến hàng ngàn MB/s, tăng tốc website gấp 10 lần.
          </p>
        </div>

        <div className="feature-card bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold shadow-inner">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h3 className="font-bold text-lg text-slate-900">Tường lửa Anti-DDoS</h3>
          <p className="text-slate-500 text-xs leading-relaxed font-light">
            Hệ thống tường lửa chuyên dụng lọc lượng truy cập độc hại, bảo vệ máy chủ khỏi các đợt tấn công DDoS nguy hiểm 24/7.
          </p>
        </div>
      </div>
    </section>
  );
}
