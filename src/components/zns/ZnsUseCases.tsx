export default function ZnsUseCases() {
  return (
    <section id="usecases" className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Kịch Bản Ứng Dụng Tự Động Hóa Thực Tế
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Hệ thống của SGO hỗ trợ thiết lập webhook API, tự động kích hoạt tin nhắn dựa trên hành vi khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-slate-800/50 border border-slate-800 rounded-xl space-y-2">
            <span className="text-sky-400 text-xs font-bold uppercase block tracking-wider">
              E-Commerce / POS
            </span>
            <h4 className="font-bold text-sm">Tin nhắn Giao dịch</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Tự động gửi thông báo xác nhận đặt hàng thành công, thông tin mã vận đơn cập nhật, trạng thái giao hàng.
            </p>
          </div>
          <div className="p-5 bg-slate-800/50 border border-slate-800 rounded-xl space-y-2">
            <span className="text-emerald-400 text-xs font-bold uppercase block tracking-wider">
              Tài chính / ERP
            </span>
            <h4 className="font-bold text-sm">Biến động số dư &amp; Công nợ</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Thông báo tự động kỳ hạn đóng tiền, số dư thay đổi, nhắc nợ định kỳ hoặc thông báo hóa đơn điện tử VAT.
            </p>
          </div>
          <div className="p-5 bg-slate-800/50 border border-slate-800 rounded-xl space-y-2">
            <span className="text-purple-400 text-xs font-bold uppercase block tracking-wider">
              Dịch vụ / Web
            </span>
            <h4 className="font-bold text-sm">Mã OTP Xác thực</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Gửi mã OTP đăng nhập, đăng ký tài khoản mới hoặc đổi mật khẩu với tốc độ phản hồi cực nhanh dưới 5 giây.
            </p>
          </div>
          <div className="p-5 bg-slate-800/50 border border-slate-800 rounded-xl space-y-2">
            <span className="text-amber-400 text-xs font-bold uppercase block tracking-wider">
              CRM / Marketing
            </span>
            <h4 className="font-bold text-sm">Chăm sóc định kỳ</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Tự động chúc mừng sinh nhật khách hàng kèm mã giảm giá riêng, nhắc lịch hẹn dịch vụ hoặc voucher tri ân hội viên.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
