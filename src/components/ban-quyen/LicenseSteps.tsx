export default function LicenseSteps() {
  return (
    <section id="steps" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Quy Trình Mua Hàng Đơn Giản
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-light">
            Chỉ 3 bước nhanh chóng để sở hữu phần mềm bản quyền.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative hover:shadow-md transition-all">
            <span className="text-4xl font-extrabold text-indigo-600/20 absolute top-4 right-6">
              01
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Chọn Sản Phẩm</h3>
            <p className="text-slate-600 text-sm font-light">
              Lựa chọn phiên bản Windows, Office hoặc Windows Server phù hợp với nhu cầu của bạn.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative hover:shadow-md transition-all">
            <span className="text-4xl font-extrabold text-indigo-600/20 absolute top-4 right-6">
              02
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Thanh Toán Nhanh Chóng</h3>
            <p className="text-slate-600 text-sm font-light">
              Thanh toán qua chuyển khoản ngân hàng hoặc ví điện tử theo hướng dẫn trên hệ thống.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative hover:shadow-md transition-all">
            <span className="text-4xl font-extrabold text-indigo-600/20 absolute top-4 right-6">
              03
            </span>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Nhận Key &amp; Kích Hoạt</h3>
            <p className="text-slate-600 text-sm font-light">
              Nhận mã bản quyền kèm hướng dẫn chi tiết hoặc được hỗ trợ cài đặt trực tiếp từ kỹ thuật viên.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
