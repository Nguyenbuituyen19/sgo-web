export default function ZnsWhy() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Vượt Trội Hoàn Toàn So Với SMS Truyền Thống
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-light">
          Zalo ZNS mang đến trải nghiệm tương tác đa dạng, nâng tầm trải nghiệm số của khách hàng.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="zns-card bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center text-lg mb-4">
            <i className="fa-solid fa-image"></i>
          </div>
          <h3 className="font-bold text-base text-slate-900 mb-2">Định Dạng Đa Dạng</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Không còn là những dòng chữ text thô kệch không dấu. ZNS hỗ trợ gửi bảng thông tin chi tiết, logo thương hiệu, chèn nút bấm (Call-to-action) dẫn thẳng về website/subdomain.
          </p>
        </div>
        <div className="zns-card bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-lg mb-4">
            <i className="fa-solid fa-piggy-bank"></i>
          </div>
          <h3 className="font-bold text-base text-slate-900 mb-2">Tối Ưu Ngân Sách</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Chỉ phát sinh chi phí khi tin nhắn được giao thành công đến thiết bị người dùng (trong vòng 2h). Nếu lỗi hệ thống không gửi được, doanh nghiệp không mất tiền.
          </p>
        </div>
        <div className="zns-card bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-lg mb-4">
            <i className="fa-solid fa-arrow-turn-up"></i>
          </div>
          <h3 className="font-bold text-base text-slate-900 mb-2">Mở Rộng Tương Tác</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Sau khi khách hàng nhận tin nhắn ZNS, hệ thống có thể điều hướng khách hàng nhấn &quot;Quan tâm&quot; trang Zalo OA của doanh nghiệp để chăm sóc lại hoàn toàn miễn phí mãi mãi về sau.
          </p>
        </div>
      </div>
    </section>
  );
}
