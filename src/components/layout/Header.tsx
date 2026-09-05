import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-50 px-4 text-center">

      <div className="max-w-7xl mx-auto ">
        <span className="bg-blue-500 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Hệ sinh thái công nghệ
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          Giải Pháp Toàn Diện Để <br className="hidden md:inline" />
          Bứt Phá Doanh Số Kỷ Nguyên Số
        </h1>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
          Tối ưu quy trình vận hành, tự động hóa chăm sóc khách hàng và nâng tầm
          thương hiệu với bộ công cụ chuyên nghiệp.
        </p>
      </div>
    </header>
  );
}
