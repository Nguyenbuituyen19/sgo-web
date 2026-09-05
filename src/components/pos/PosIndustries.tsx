export default function PosIndustries() {
  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Phù Hợp Cho Mọi Mô Hình Kinh Doanh</h2>
          <p className="text-slate-400 text-sm font-light">
            Giao diện tùy biến chuyên biệt nhằm phục vụ tối ưu nhất cho từng ngành hàng đặc thù.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-800">
            <i className="fa-solid fa-shirt text-orange-400 mb-2 block text-lg"></i>
            <span className="text-xs">Thời trang &amp; Mỹ phẩm</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-800">
            <i className="fa-solid fa-basket-shopping text-blue-400 mb-2 block text-lg"></i>
            <span className="text-xs">Tạp hóa &amp; Siêu thị mini</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-800">
            <i className="fa-solid fa-mug-hot text-emerald-400 mb-2 block text-lg"></i>
            <span className="text-xs">Quán Cafe &amp; Trà sữa</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-800">
            <i className="fa-solid fa-pills text-purple-400 mb-2 block text-lg"></i>
            <span className="text-xs">Nhà thuốc &amp; Kính mắt</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-800">
            <i className="fa-solid fa-screwdriver-wrench text-amber-400 mb-2 block text-lg"></i>
            <span className="text-xs">Vật liệu xây dựng / Nội thất</span>
          </div>
          <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-800">
            <i className="fa-solid fa-globe text-sky-400 mb-2 block text-lg"></i>
            <span className="text-xs">Shop Online / Dropshipping</span>
          </div>
        </div>
      </div>
    </section>
  );
}
