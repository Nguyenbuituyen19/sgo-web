export default function TraceBenefits() {
  return (
    <section className="mb-20 bg-teal-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold text-teal-400 tracking-widest uppercase bg-teal-800 px-3 py-1 rounded-full">
            Lợi ích thực tế
          </span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            Số Hóa Hôm Nay - Bứt Phá Tương Lai
          </h3>
          <p className="text-teal-100/80 text-sm font-light leading-relaxed">
            Ứng dụng giải pháp công nghệ truy xuất nguồn gốc giúp doanh nghiệp tạo dựng lợi thế cạnh tranh vượt trội, biến sự minh bạch thành vũ khí marketing mạnh mẽ nhất.
          </p>
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm text-teal-50">
              <i className="fa-solid fa-circle-check text-teal-400 text-base"></i>
              <span>Nâng tầm giá trị thương hiệu, tạo niềm tin tuyệt đối với người mua.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-teal-50">
              <i className="fa-solid fa-circle-check text-teal-400 text-base"></i>
              <span>Đủ điều kiện pháp lý đưa sản phẩm vào chuỗi siêu thị và xuất khẩu quốc tế.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-teal-50">
              <i className="fa-solid fa-circle-check text-teal-400 text-base"></i>
              <span>Chủ động kiểm soát và xử lý khủng hoảng khi phát hiện sản phẩm lỗi trên thị trường.</span>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4 max-w-sm mx-auto w-full">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-white">
              <i className="fa-solid fa-mobile-screen mr-1.5 text-teal-400"></i> Giao diện người dùng
            </span>
            <span className="text-[10px] bg-teal-500 text-white font-mono font-bold px-2 py-0.5 rounded uppercase">
              Đã xác thực
            </span>
          </div>
          <div className="aspect-video bg-slate-800/40 rounded-xl flex items-center justify-center text-slate-400">
            <i className="fa-solid fa-qrcode text-4xl text-teal-400/70"></i>
          </div>
          <div className="space-y-2 text-xs">
            <p className="font-bold text-white text-sm">Trà Shan Tuyết Cổ Thụ Tây Côn Lĩnh</p>
            <p className="text-teal-200/60 text-[11px]">Mã sản phẩm: #SGO-TRA-2026</p>
            <div className="grid grid-cols-2 gap-2 pt-2 text-slate-900">
              <div className="bg-white p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Nguồn gốc</span>
                <span className="font-semibold block mt-0.5 text-ellipsis overflow-hidden whitespace-nowrap">
                  Hà Giang, VN
                </span>
              </div>
              <div className="bg-white p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block">Tiêu chuẩn</span>
                <span className="font-semibold text-teal-600 block mt-0.5">
                  Hữu cơ chuẩn
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
