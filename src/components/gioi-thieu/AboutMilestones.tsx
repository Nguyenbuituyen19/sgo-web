export default function AboutMilestones() {
  const milestones = [
    {
      year: "2021",
      yearColor: "text-blue-600",
      title: "Khởi tạo & Định hình",
      desc: "Thành lập nhóm kỹ sư nghiên cứu hạt nhân, đặt nền móng kiến trúc phân tán cho hạ tầng xử lý dữ liệu lớn.",
      barColor: "bg-blue-200",
    },
    {
      year: "2022",
      yearColor: "text-blue-700",
      title: "Nền tảng v1.0 ra mắt",
      desc: "Chính thức phát hành nền tảng Data Warehouse & Cloud Native đầu tiên, đón nhận hơn 30 đối tác doanh nghiệp đầu tiên.",
      barColor: "bg-blue-600",
    },
    {
      year: "2023",
      yearColor: "text-indigo-600",
      title: "Chuẩn hóa & Mở rộng AI",
      desc: "Đạt chứng nhận bảo mật dữ liệu, tích hợp module AI & Machine Learning tự động hóa, tăng trưởng 200% lượng người dùng.",
      barColor: "bg-indigo-600",
    },
    {
      year: "2024 - 2025",
      yearColor: "text-slate-950",
      title: "Hệ sinh thái thông minh",
      desc: "Nâng cấp toàn diện hạ tầng AI Data Cloud, xúc tiến liên kết quốc tế và cung cấp dịch vụ hạ tầng đám mây cho các tập đoàn lớn.",
      barColor: "bg-emerald-500",
    },
  ];

  return (
    <section className="w-full py-10 lg:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Lịch sử phát triển
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 mt-1">
              Những cột mốc quan trọng
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Từng bước hoàn thiện hệ sinh thái công nghệ vững chắc, mở rộng phạm vi ứng dụng từ giải pháp đơn lẻ đến nền tảng dữ liệu toàn diện.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col gap-3 relative"
            >
              <span className={`text-3xl font-black ${m.yearColor}`}>
                {m.year}
              </span>
              <div className="text-base font-bold text-slate-950">
                {m.title}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {m.desc}
              </p>
              <div className={`w-8 h-1 rounded-full ${m.barColor} mt-auto`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
