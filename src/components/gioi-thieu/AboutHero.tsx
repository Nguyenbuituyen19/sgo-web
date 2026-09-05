import Link from "next/link";

export default function AboutHero() {
  return (
    <>

      {/* 2. ABOUT HERO SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Text Column */}
            <div className="lg:col-span-6 flex flex-col gap-5">

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Kiến tạo giải pháp công nghệ cho <span className="text-blue-600">tương lai số</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                SGODATA đồng hành cùng doanh nghiệp trong hành trình ứng dụng công nghệ, tối ưu vận hành và bứt phá tăng trưởng bền vững trong kỷ nguyên số hóa toàn diện.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/#dich-vu"
                  className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 shadow-sm hover:shadow-md transition-all gap-2 group"
                >
                  <span>Khám phá dịch vụ</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <Link
                  href="/lien-he"
                  className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white text-slate-900 font-medium text-sm border border-slate-200 shadow-xs hover:shadow transition-all hover:bg-slate-100"
                >
                  Liên hệ với chúng tôi
                </Link>
              </div>

              {/* Quick Micro Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 mt-2">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-blue-600">99.99%</span>
                  <span className="text-xs text-slate-500 mt-1">Uptime vận hành</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900">Tier IV</span>
                  <span className="text-xs text-slate-500 mt-1">Hạ tầng chuẩn hóa</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-blue-600">24/7</span>
                  <span className="text-xs text-slate-500 mt-1">Kỹ sư bảo trợ</span>
                </div>
              </div>
            </div>

            {/* Visual Hero Inspiration Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border border-slate-200/80">
                <img
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                  alt="Modern enterprise cloud data platform concept interface"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwRcUCHxH3L4mQk1OTtD4V7UYvSZLbowHHV1G-QtJMXS7yTnnXnbSFZm0uX9C15tseBFlGQy_Ax0bS86BpMxK54rLbOtg39YFfplExBXlTYd8N8i_dyvT1g120Dbu1GDkLSVukXhfPgVZ72pdMLTME6AeyriwwlBdAvJkad9XKhTSLWZ6YFoLKmGGnta2iWWalvraJalYgvFTG-fRyzP3zt13GrKvjtGmB5z_o933_GJXsx5tnbv9Msg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Floating Overlay Badges */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-md flex items-center gap-3 border border-slate-200/50">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
                    <span className="material-symbols-outlined text-[20px]">cloud_sync</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-900 font-semibold">Enterprise Cloud Mesh</span>
                    <span className="text-[11px] text-emerald-600 font-mono font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Active &amp; Synced
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg flex flex-wrap items-center justify-between gap-3 border border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                      <span className="material-symbols-outlined text-[22px]">security</span>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm text-slate-900 font-bold">Bảo mật cấp độ Enterprise</div>
                      <div className="text-xs text-slate-500">Mã hóa đa tầng AES-256 &amp; Zero-Trust Architecture</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-slate-100 text-blue-700 font-mono text-xs font-semibold">
                    ISO 27001 Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
