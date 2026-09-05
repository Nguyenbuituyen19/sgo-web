export default function QrWarning() {
  return (
    <section id="canh-bao" className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center max-w-full mx-auto mb-12">
        <span className="text-red-500 font-bold text-xs uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
          Sự thật mất lòng
        </span>
        <h2 className="text-2xl font-black text-slate-900 mt-2">
          Cảnh Giác Với Các Trình Tạo QR &quot;Miễn Phí&quot; Quốc Tế
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-lg">
            <i className="fa-solid fa-rectangle-ad"></i>
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Chèn quảng cáo trung gian</h3>
          <p className="text-slate-500 text-xs leading-relaxed font-light">
            Tuần đầu tiên quét rất tốt, nhưng từ tuần thứ 2 khách hàng quét mã sẽ bị giữ lại 5-10 giây để xem quảng cáo ngoài ý muốn trước khi chuyển link.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-lg">
            <i className="fa-solid fa-hourglass-end"></i>
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Giới hạn lượt quét (Khóa mã)</h3>
          <p className="text-slate-500 text-xs leading-relaxed font-light">
            Mã QR đột ngột báo lỗi hoặc hết hạn &quot;Expired&quot; sau khi đạt 100 hoặc 1000 lượt quét, ép buộc bạn phải trả phí hàng tháng giá rất cao để mở lại.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-lg">
            <i className="fa-solid fa-link-slash"></i>
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Nguy cơ rò rỉ, mất link gốc</h3>
          <p className="text-slate-500 text-xs leading-relaxed font-light">
            Đường link gốc của doanh nghiệp bị điều hướng qua một hệ thống không rõ nguồn gốc, làm giảm tốc độ tải trang và mất đi điểm chất lượng SEO.
          </p>
        </div>
      </div>
    </section>
  );
}
