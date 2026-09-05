export default function QrHeader() {
  return (
    <header className="bg-gradient-to-b from-blue-50/50 to-white py-12 border-b border-slate-200 text-center px-4 relative overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-emerald-100">
          <i className="fa-solid fa-circle-check"></i> Miễn phí 100% - Không giới hạn lượt quét
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Sở Hữu Mã QR Code Sạch <br />
          <span className="text-blue-600">Nói Không Với Quảng Cáo Chèn Ngầm</span>
        </h1>
        <p className="text-slate-500 text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed">
          Bạn in mã QR lên danh thiếp, bao bì sản phẩm hay menu nhà hàng nhưng khách quét lại ra quảng cáo game bài, shopee, Lazada? SGO đem lại giải pháp QR dẫn thẳng tới đích!
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a
            href="#tao-form"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 transition-all"
          >
            Bắt đầu tạo ngay
          </a>
          <a
            href="#uu-diem"
            className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider border border-slate-200 shadow-sm transition-all"
          >
            Tìm hiểu thêm
          </a>
        </div>
      </div>
    </header>
  );
}
