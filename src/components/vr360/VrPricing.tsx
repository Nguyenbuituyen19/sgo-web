export default function VrPricing() {
  return (
    <section id="bao-gia" className="py-20 bg-slate-100 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Tiêu đề section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                03
              </span>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                Báo giá dịch vụ
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Công Nghệ Tour Thực Tế Áo VR360
            </h2>
          </div>
          <div>
            <a
              href="https://vr.sgodata.com/demo-resort"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:text-blue-700 text-sm flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200/85 shadow-xs transition-all"
            >
              <i className="fa-solid fa-eye"></i> Xem VR360 mẫu tại đây
            </a>
          </div>
        </div>

        {/* Banner Đặc quyền trọn đời & Tặng website */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 bg-white rounded-2xl p-6 mb-12 shadow-sm border border-slate-200/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl shrink-0 mt-0.5">
              <i className="fa-solid fa-crown"></i>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm md:text-base">
                ĐẶC QUYỀN TRỌN ĐỜI: THU PHÍ 01 LẦN DỰNG – MIỄN PHÍ DUY TRÌ TRỌN ĐỜI
              </h4>
              <p className="text-xs text-slate-500 font-light">
                Áp dụng khi duy trì hợp tác bán phòng cùng hệ thống của chúng tôi.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-amber-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-xs shrink-0">
            <i className="fa-solid fa-gift"></i> TẶNG MIỄN PHÍ 01 WEBSITE RIÊNG
          </div>
        </div>

        {/* Grid 4 Gói Dịch Vụ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Gói 1 */}
          <div className="hover-scale bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                  Quy mô nhỏ
                </span>
                <h4 className="text-base font-bold text-slate-900 pt-2">
                  Gói 8 - 15 Điểm
                </h4>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">
                3.000.000 <span className="text-sm font-semibold text-blue-600">đ</span>
              </div>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Quét không gian phòng tiêu chuẩn, tối ưu cho homestay hoặc khách sạn mini.
              </p>
              <hr className="border-slate-100" />
              <ul className="text-xs text-slate-600 space-y-2.5 font-light">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-emerald-500 shrink-0"></i>
                  <span>Chụp quét 8-15 điểm chuẩn</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-gift text-amber-500 shrink-0"></i>
                  <span className="font-medium text-slate-900">
                    Tặng Web &amp; Miễn phí trọn đời
                  </span>
                </li>
              </ul>
            </div>
            <a
              href="#tu-van"
              className="mt-8 block w-full text-center py-3 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-medium rounded-xl text-sm transition-all"
            >
              Đăng ký dùng
            </a>
          </div>

          {/* Gói 2 */}
          <div className="hover-scale bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                  Quy mô vừa
                </span>
                <h4 className="text-base font-bold text-slate-900 pt-2">
                  Gói 15 - 25 Điểm
                </h4>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">
                5.000.000 <span className="text-sm font-semibold text-blue-600">đ</span>
              </div>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Quét chi tiết không gian khách sạn quy mô vừa và đầy đủ tiện ích cơ bản.
              </p>
              <hr className="border-slate-100" />
              <ul className="text-xs text-slate-600 space-y-2.5 font-light">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-emerald-500 shrink-0"></i>
                  <span>Quét chi tiết sạn quy mô vừa</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-gift text-amber-500 shrink-0"></i>
                  <span className="font-medium text-slate-900">
                    Tặng Web &amp; Miễn phí trọn đời
                  </span>
                </li>
              </ul>
            </div>
            <a
              href="#tu-van"
              className="mt-8 block w-full text-center py-3 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-medium rounded-xl text-sm transition-all"
            >
              Đăng ký dùng
            </a>
          </div>

          {/* Gói 3 */}
          <div className="hover-scale bg-white rounded-2xl p-8 border-2 border-blue-600 shadow-md relative flex flex-col justify-between transform md:-translate-y-2">
            <span className="absolute top-0 right-6 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
              Khuyên dùng
            </span>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md">
                  Quy mô lớn
                </span>
                <h4 className="text-base font-bold text-slate-900 pt-2">
                  Gói 25 - 50 Điểm
                </h4>
              </div>
              <div className="text-2xl md:text-3xl font-black text-blue-600">
                10.000.000 <span className="text-sm font-semibold">đ</span>
              </div>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Phù hợp khách sạn quy mô lớn, nhiều tầng và khu dịch vụ tiện ích đi kèm.
              </p>
              <hr className="border-slate-100" />
              <ul className="text-xs text-slate-600 space-y-2.5 font-light">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-emerald-500 shrink-0"></i>
                  <span>Phù hợp khách sạn quy mô lớn</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-gift text-amber-500 shrink-0"></i>
                  <span className="font-medium text-slate-900">
                    Tặng Web &amp; Miễn phí trọn đời
                  </span>
                </li>
              </ul>
            </div>
            <a
              href="#tu-van"
              className="mt-8 block w-full text-center py-3 bg-blue-600 text-white font-medium rounded-xl text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-200"
            >
              Đăng ký dùng
            </a>
          </div>

          {/* Gói 4 */}
          <div className="hover-scale bg-white rounded-2xl p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-md">
                  Toàn diện
                </span>
                <h4 className="text-base font-bold text-slate-900 pt-2">
                  Trọn Gói Khu
                </h4>
              </div>
              <div className="text-2xl md:text-3xl font-black text-slate-900">
                15.000.000 <span className="text-sm font-semibold text-blue-600">đ</span>
              </div>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Số hóa toàn bộ khu nghỉ dưỡng lớn, không giới hạn điểm quét cơ bản.
              </p>
              <hr className="border-slate-100" />
              <ul className="text-xs text-slate-600 space-y-2.5 font-light">
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-check text-emerald-500 shrink-0"></i>
                  <span>Số hóa toàn bộ khu nghỉ lớn</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fa-solid fa-gift text-amber-500 shrink-0"></i>
                  <span className="font-medium text-slate-900">
                    Tặng Web &amp; Miễn phí trọn đời
                  </span>
                </li>
              </ul>
            </div>
            <a
              href="#tu-van"
              className="mt-8 block w-full text-center py-3 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-medium rounded-xl text-sm transition-all"
            >
              Đăng ký dùng
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
