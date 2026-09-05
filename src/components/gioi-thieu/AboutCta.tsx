import Link from "next/link";

export default function AboutCta() {
  return (
    <section className="w-full py-10 lg:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl border border-slate-800">
          {/* Subtle Glow Circle Backdrop */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
              <span>Hợp tác cùng SGODATA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Cùng chúng tôi tạo ra những giá trị mới
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              Bạn đang tìm kiếm giải pháp công nghệ và hạ tầng dữ liệu tối ưu cho doanh nghiệp? Hãy cùng chuyên gia SGODATA trao đổi ngay hôm nay để nhận tư vấn lộ trình phù hợp nhất.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/lien-he"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 shadow-md hover:shadow-lg transition-all gap-2 group"
              >
                <span>Liên hệ ngay</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <Link
                href="/dich-vu-san-pham"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-all border border-white/10"
              >
                Khám phá dịch vụ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
