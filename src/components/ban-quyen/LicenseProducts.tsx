export default function LicenseProducts() {
  return (
    <section id="products" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Danh Mục Sản Phẩm Phổ Biến
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-light">
            Lựa chọn giải pháp tối ưu cho máy tính cá nhân và hệ thống máy chủ của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Product 1: Windows */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:border-2 hover:border-indigo-600  transition-all">
            <div>
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4 font-bold">
                <i className="fa-brands fa-windows"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Windows 10 / 11 Pro</h3>
              <p className="mt-2 text-sm text-slate-500 font-light">
                Bản quyền điện tử chính hãng, kích hoạt vĩnh viễn 1 PC, hỗ trợ update thoải mái.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 font-light">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Key Retail / Digital
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Cài lại không mất bản quyền
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Bảo hành trọn đời máy
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs text-slate-400 uppercase font-semibold">Giá từ</span>
                <span className="text-2xl font-extrabold text-indigo-600">250.000đ</span>
              </div>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-slate-900 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
              >
                Đặt Mua Ngay
              </a>
            </div>
          </div>

          {/* Product 2: Office */}
          <div className="bg-white rounded-2xl shadow-sm border-2 border-indigo-600 p-6 flex flex-col justify-between relative hover:shadow-md transition-all">
            <span className="absolute -top-3 right-6 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Bán Chạy
            </span>
            <div>
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                <i className="fa-solid fa-file-word"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Office 2021 / 365</h3>
              <p className="mt-2 text-sm text-slate-500 font-light">
                Word, Excel, PowerPoint, Outlook... Đầy đủ tính năng mới nhất cho công việc văn phòng.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 font-light">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Liên kết tài khoản Microsoft
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Dùng vĩnh viễn (Bản 2021)
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> 5 thiết bị (Bản 365)
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs text-slate-400 uppercase font-semibold">Giá từ</span>
                <span className="text-2xl font-extrabold text-indigo-600">350.000đ</span>
              </div>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm shadow-sm"
              >
                Đặt Mua Ngay
              </a>
            </div>
          </div>

          {/* Product 3: Windows Server */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:border-2 hover:border-indigo-600 p-6 transition-all">
            <div>
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                <i className="fa-solid fa-server"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Windows Server</h3>
              <p className="mt-2 text-sm text-slate-500 font-light">
                Windows Server 2016, 2019, 2022 Standard / Datacenter ổn định cho hạ tầng IT doanh nghiệp.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 font-light">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Key MAK / KMS chuẩn
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Hỗ trợ ảo hóa Hyper-V
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Kích hoạt trực tiếp
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs text-slate-400 uppercase font-semibold">Giá từ</span>
                <span className="text-2xl font-extrabold text-indigo-600">890.000đ</span>
              </div>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-slate-900 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
              >
                Đặt Mua Ngay
              </a>
            </div>
          </div>

          {/* Product 4: Combo Tiết Kiệm */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between hover:border-2 hover:border-indigo-600 p-6 transition-all">
            <div>
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-2xl mb-4">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Combo Win + Office</h3>
              <p className="mt-2 text-sm text-slate-500 font-light">
                Giải pháp toàn diện kết hợp hệ điều hành Windows và bộ công cụ Office với mức giá ưu đãi nhất.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600 font-light">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Windows 10/11 Pro + Office
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Tiết kiệm đến 30% chi phí
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-emerald-500 mr-2"></i> Hỗ trợ cài đặt từ A-Z
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs text-slate-400 uppercase font-semibold">Giá từ</span>
                <span className="text-2xl font-extrabold text-indigo-600">500.000đ</span>
              </div>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center bg-slate-900 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
              >
                Đặt Mua Ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
