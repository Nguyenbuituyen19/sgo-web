export default function LicenseFeatures() {
  return (
    <section id="features" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Tại sao khách hàng tin chọn sgodata.com?
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-light">
            Chúng tôi cam kết mang lại trải nghiệm mua sắm phần mềm an toàn, nhanh chóng và tiết kiệm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Chính Hãng &amp; An Toàn</h3>
            <p className="text-slate-600 text-sm font-light">
              Key bản quyền chuẩn từ Microsoft, không lo bị quét hay mất bản quyền khi cập nhật hệ thống.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Nhận Key Siêu Tốc</h3>
            <p className="text-slate-600 text-sm font-light">
              Hệ thống xử lý tự động giao key và hướng dẫn kích hoạt ngay sau khi thanh toán thành công.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-slate-50/50 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
              <i className="fa-solid fa-headset"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Bảo Hành Suốt Đời</h3>
            <p className="text-slate-600 text-sm font-light">
              Đội ngũ kỹ thuật hỗ trợ tận tâm qua UltraViewer/AnyDesk đến khi kích hoạt thành công 100%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
