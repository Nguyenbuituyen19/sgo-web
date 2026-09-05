import Link from "next/link";

export default function NewsCta() {
  return (
    <section className="w-full py-10 lg:py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          {/* Backdrop Glow Circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">forum</span>
              <span>Tư vấn giải pháp kỹ thuật</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Cần tư vấn lộ trình chuyển đổi số cho doanh nghiệp?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              Đội ngũ kiến trúc sư dữ liệu và chuyên gia hệ thống SGODATA sẵn sàng khảo sát thực tế và tư vấn giải pháp tối ưu chi phí hạ tầng cho bạn.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 shadow-md hover:shadow-lg transition-all gap-2 group"
              >
                <span>Nhận tư vấn miễn phí</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/ha-tang"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-all border border-white/10"
              >
                Khám phá hạ tầng Cloud
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
