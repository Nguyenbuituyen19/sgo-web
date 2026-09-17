export default function DataBiBenefits() {
  const benefits = [
    {
      icon: "fa-solid fa-clock",
      title: "Ra quyết định nhanh gấp 5 lần",
      desc: "Không còn mất hàng giờ tổng hợp dữ liệu thủ công từ nhiều phòng ban. Mọi con số hiển thị tức thì trên một màn hình duy nhất.",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Dữ liệu chính xác & Nhất quán",
      desc: "Loại bỏ độ lệch số liệu giữa các bộ phận Sales, Marketing và Kế toán nhờ cơ chế chuẩn hóa quy chuẩn dữ liệu nguồn.",
    },
    {
      icon: "fa-solid fa-chart-line",
      title: "Tối ưu chi phí & Tăng trưởng doanh thu",
      desc: "Nhận diện điểm nghẽn trong vận hành và tìm ra cơ hội kinh doanh mới ẩn giấu trong dữ liệu lịch sử.",
    },
  ];

  return (
    <section id="loi-ich" className="py-20 bg-slate-100 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
              GIÁ TRỊ MANG LẠI
            </span>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
              Tại sao doanh nghiệp cần chuẩn hóa Hạ tầng Dữ liệu &amp; BI?
            </h2>
            <div className="space-y-6">
              {benefits.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-950 text-white p-8 lg:p-12 rounded-3xl shadow-xl relative overflow-hidden space-y-6">
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 text-9xl pointer-events-none">
              <i className="fa-solid fa-database"></i>
            </div>
            <h3 className="text-2xl font-bold leading-snug">Sẵn sàng nâng tầm quản trị doanh nghiệp?</h3>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
              Đội ngũ chuyên gia của SGO Data luôn sẵn sàng lắng nghe bài toán dữ liệu riêng biệt của công ty bạn và đưa ra giải pháp tối ưu nhất.
            </p>
            <div className="pt-2">
              <a
                href="#lien-he"
                className="inline-block bg-white text-indigo-950 font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-all text-xs md:text-sm shadow-md"
              >
                Đặt lịch tư vấn miễn phí
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
