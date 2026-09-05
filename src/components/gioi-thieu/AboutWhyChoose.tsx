export default function AboutWhyChoose() {
  const advantages = [
    {
      icon: "task_alt",
      iconBg: "bg-blue-100 text-blue-700",
      title: "Giải pháp thực tế",
      desc: "Không màu mè, không lý thuyết suông. Mọi giải pháp được thiết kế sát theo bài toán chi phí và tỷ suất hoàn vốn (ROI) của khách hàng.",
    },
    {
      icon: "cloud_done",
      iconBg: "bg-indigo-100 text-indigo-700",
      title: "Công nghệ Cloud & AI hiện đại",
      desc: "Ứng dụng các kiến trúc hạ tầng mới nhất, dễ dàng tích hợp API và mở rộng quy mô linh hoạt theo nhịp tăng trưởng doanh nghiệp.",
    },
    {
      icon: "headset_mic",
      iconBg: "bg-purple-100 text-purple-700",
      title: "Đồng hành & hỗ trợ 24/7",
      desc: "Đội ngũ kỹ sư tại Việt Nam trực tiếp vận hành và giải quyết nhanh các tình huống khẩn cấp, không qua trung gian.",
    },
    {
      icon: "tune",
      iconBg: "bg-slate-100 text-slate-800",
      title: "Tùy biến & Linh hoạt",
      desc: "Sẵn sàng điều chỉnh tính năng theo yêu cầu nghiệp vụ chuyên thù của từng ngành: tài chính số, sản xuất, bán lẻ chuỗi hay y tế.",
    },
  ];

  return (
    <section className="w-full py-10 lg:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Lợi thế cạnh tranh
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 mt-1">
            Tại sao chọn SGODATA?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Sự kết hợp giữa tư duy sản phẩm thực tế, công nghệ tiên tiến và dịch vụ khách hàng tận tâm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
              </div>
              <h3 className="text-base font-bold text-slate-950">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
