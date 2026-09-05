export default function ErpHeader() {
  return (
    <header className="relative bg-slate-900 text-white py-12 px-4 overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            Hệ thống quản trị thế hệ mới
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Bứt Phá Hiệu Suất,<br />
            Số Hóa Toàn Diện Doanh Nghiệp Với <span className="text-blue-500">SGO ERP</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light">
            Hợp nhất mọi quy trình vận hành từ Tài chính, Nhân sự, Kho vận đến Kinh doanh trên một nền tảng duy nhất. May đo chính xác theo đặc thù từng ngành nghề.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <a
              href="#register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-center shadow-lg shadow-blue-600/30 transition-all text-sm"
            >
              Tư vấn &amp; Khảo sát Miễn phí
            </a>
            <a
              href="#features"
              className="border border-slate-700 hover:border-slate-500 text-slate-300 font-semibold px-8 py-4 rounded-xl text-center transition-all text-sm"
            >
              Khám phá tính năng
            </a>
          </div>
        </div>
        <div className="lg:col-span-5 bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 backdrop-blur shadow-2xl">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Doanh nghiệp của bạn đang gặp phải?</h3>
          </div>
          <ul className="space-y-4 text-sm text-slate-300 font-light">
            <li className="flex gap-3">
              <i className="fa-solid fa-circle-xmark text-rose-500 mt-1 shrink-0"></i> Dữ liệu phân mảnh, báo cáo chậm trễ, sai lệch.
            </li>
            <li className="flex gap-3">
              <i className="fa-solid fa-circle-xmark text-rose-500 mt-1 shrink-0"></i> Phòng ban chồng chéo, giao việc và phối hợp kém hiệu quả.
            </li>
            <li className="flex gap-3">
              <i className="fa-solid fa-circle-xmark text-rose-500 mt-1 shrink-0"></i> Thất thoát vật tư, khó kiểm soát dòng tiền chi tiết.
            </li>
            <li className="flex gap-3">
              <i className="fa-solid fa-circle-xmark text-rose-500 mt-1 shrink-0"></i> Phụ thuộc quá nhiều vào quy trình thủ công/Excel.
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
