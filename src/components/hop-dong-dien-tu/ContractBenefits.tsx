export default function ContractBenefits() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Tại Sao Doanh Nghiệp Cần Chuyển Đổi Số Hợp Đồng?
        </h2>
        <p className="text-slate-500 text-sm md:text-base font-light">
          Xóa bỏ hoàn toàn gánh nặng của quy trình in ấn, lưu kho và chuyển phát truyền thống.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="feature-card bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
            <i className="fa-solid fa-hourglass-half"></i>
          </div>
          <h4 className="font-bold text-base text-slate-900">Rút ngắn 95% thời gian</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Không cần chờ chuyển phát nhanh 3-5 ngày. Trình duyệt online, ký số xác thực hai bên nhận kết quả ngay tức thì trong vài phút.
          </p>
        </div>
        <div className="feature-card bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
            <i className="fa-solid fa-coins"></i>
          </div>
          <h4 className="font-bold text-base text-slate-900">Tiết kiệm tối đa chi phí</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Cắt giảm hoàn toàn các chi phí văn phòng phẩm: in ấn, giấy mực, chuyển phát, kho bãi lưu trữ hồ sơ giấy vật lý hàng năm.
          </p>
        </div>
        <div className="feature-card bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner">
            <i className="fa-solid fa-fingerprint"></i>
          </div>
          <h4 className="font-bold text-base text-slate-900">An toàn &amp; Chống giả mạo</h4>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Áp dụng công nghệ mã hóa công khai RSA kết hợp timestamp và chứng thư số, đảm bảo tính toàn vẹn 100%, không thể sửa đổi sau khi ký.
          </p>
        </div>
      </div>
    </section>
  );
}
