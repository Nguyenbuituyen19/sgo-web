export default function Partners() {
  return (
    <section id="tin-tuc" className="mb-24 bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
        <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
          Sự tin tưởng
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Đối Tác Đồng Hành Chiến Lược
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed font-light">
          Hệ sinh thái công nghệ của SGO Việt Nam tự hào được đồng hành cùng các
          thương hiệu, tập đoàn và các hợp tác xã hàng đầu trên hành trình chuyển
          đổi số và tối ưu vận hành doanh nghiệp.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-75">
        <div className="flex items-center gap-2 font-bold text-slate-400 grayscale hover:grayscale-0 hover:text-blue-600 transition-all duration-300 text-lg cursor-default select-none">
          <i className="fa-solid fa-layer-group text-2xl"></i> TECH-CORP
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-400 grayscale hover:grayscale-0 hover:text-emerald-600 transition-all duration-300 text-lg cursor-default select-none">
          <i className="fa-solid fa-leaf text-2xl"></i> AGRI-FOOD
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-400 grayscale hover:grayscale-0 hover:text-sky-600 transition-all duration-300 text-lg cursor-default select-none">
          <i className="fa-solid fa-truck-fast text-2xl"></i> LOGISTICS
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-400 grayscale hover:grayscale-0 hover:text-indigo-600 transition-all duration-300 text-lg cursor-default select-none">
          <i className="fa-solid fa-money-bill-transfer text-2xl"></i> FINTECH
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-400 grayscale hover:grayscale-0 hover:text-purple-600 transition-all duration-300 text-lg cursor-default select-none">
          <i className="fa-solid fa-store text-2xl"></i> RETAIL-MALL
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-400 grayscale hover:grayscale-0 hover:text-amber-600 transition-all duration-300 text-lg cursor-default select-none">
          <i className="fa-solid fa-graduation-cap text-2xl"></i> EDU-SYSTEM
        </div>
      </div>
    </section>
  );
}
