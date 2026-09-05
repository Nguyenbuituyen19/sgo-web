export default function InfraAdvantages() {
  return (
    <section className="mb-24 bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px] pointer-events-none"></div>

      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 relative z-10">
        <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          Cam kết chất lượng
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tại Sao Nên Chọn Hạ Tầng Số SGO?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 text-center md:text-left">
        <div className="space-y-2">
          <div className="text-cyan-400 text-2xl mb-3">
            <i className="fa-solid fa-gauge"></i>
          </div>
          <h4 className="text-base font-bold">Uptime Cam Kết 99.99%</h4>
          <p className="text-slate-400 text-xs leading-relaxed font-light">
            Hạ tầng Cluster thông minh tự động dự phòng phần cứng. Nếu có một nút máy chủ lỗi, hệ thống tự dịch chuyển dữ liệu hoạt động thông suốt.
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-cyan-400 text-2xl mb-3">
            <i className="fa-solid fa-user-lock"></i>
          </div>
          <h4 className="text-base font-bold">Bảo Mật Chuyên Sâu Anti-DDoS</h4>
          <p className="text-slate-400 text-xs leading-relaxed font-light">
            Tích hợp tường lửa cứng phân tầng ngăn chặn các cuộc tấn công từ chối dịch vụ DDoS phổ biến, bảo vệ an toàn cổng kết nối liên tục.
          </p>
        </div>
        <div className="space-y-2">
          <div className="text-cyan-400 text-2xl mb-3">
            <i className="fa-solid fa-clock-rotate-left"></i>
          </div>
          <h4 className="text-base font-bold">Hỗ Trợ Kỹ Thuật 24/7/365</h4>
          <p className="text-slate-400 text-xs leading-relaxed font-light">
            Đội ngũ kỹ sư mạng trực luân phiên xử lý trực tiếp lỗi vận hành hệ thống qua Ticket, Hotline, Zalo bất kể ngày nghỉ, lễ Tết.
          </p>
        </div>
      </div>
    </section>
  );
}
