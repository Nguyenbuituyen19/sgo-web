import Link from "next/link";

export default function TraceHeader() {
  return (
    <header className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-12 px-4 text-center relative overflow-hidden min-h-[600px] flex flex-col justify-center">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight tracking-tight">
          Giải Pháp Truy Xuất Nguồn Gốc <br className="hidden md:inline" />
          Minh Bạch Chuỗi Cung Ứng Toàn Diện
        </h1>
        <p className="text-lg md:text-xl text-teal-100 max-w-2xl mx-auto font-light">
          Số hóa quy trình từ vùng trồng, nhà máy đến tay người tiêu dùng. Bảo vệ thương hiệu vững chắc bằng hệ thống mã QR Code định danh độc bản.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#dang-ky"
            className="px-6 py-3 font-medium bg-white text-teal-700 rounded-xl hover:bg-teal-50 transition-colors shadow-lg"
          >
            Đăng ký tư vấn ngay
          </a>
          <a
            href="#tinh-nang"
            className="px-6 py-3 font-medium bg-teal-500/40 text-white border border-teal-400/30 rounded-xl hover:bg-teal-500/50 transition-colors"
          >
            Tìm hiểu tính năng
          </a>
        </div>
      </div>
    </header>
  );
}
