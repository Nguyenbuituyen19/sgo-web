import Link from "next/link";

interface ServiceHeroProps {
  label: string;
  description?: string;
}

/**
 * Hero của trang dịch vụ sinh động.
 *
 * Không phải client component: tiêu đề và mô tả đã được resolve sẵn ở server nên
 * hero nằm ngay trong HTML đầu tiên (tốt cho SEO) và không nhấp nháy khi tải.
 */
export default function ServiceHero({ label, description }: ServiceHeroProps) {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl space-y-5">
          <span className="inline-block text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Dịch vụ SGO Việt Nam
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {label}
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed">
            {description ||
              "Giải pháp công nghệ may đo theo yêu cầu, đồng hành cùng doanh nghiệp trong quá trình chuyển đổi số."}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-sm transition-colors"
            >
              Xem bảng giá <i className="fa-solid fa-arrow-right text-xs"></i>
            </a>
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              Nhận tư vấn miễn phí
            </a>
            <Link
              href="/#dich-vu"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold text-sm px-2 py-3 transition-colors"
            >
              Xem tất cả dịch vụ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
