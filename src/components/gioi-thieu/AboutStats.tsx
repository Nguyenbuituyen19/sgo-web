export default function AboutStats() {
  const stats = [
    {
      value: "100+",
      valueColor: "text-blue-600",
      title: "Doanh nghiệp đồng hành",
      sub: "Tại thị trường Việt Nam & khu vực",
    },
    {
      value: "250+",
      valueColor: "text-indigo-600",
      title: "Dự án triển khai thành công",
      sub: "Đa dạng quy mô và ngành nghề",
    },
    {
      value: "99.99%",
      valueColor: "text-purple-600",
      title: "Độ sẵn sàng dịch vụ (SLA)",
      sub: "Hạ tầng đám mây phân tán",
    },
    {
      value: "24/7",
      valueColor: "text-sky-500",
      title: "Hỗ trợ kỹ thuật chuyên sâu",
      sub: "Phản hồi sự cố dưới 15 phút",
    },
  ];

  return (
    <section className="w-full py-8 lg:py-10 bg-white border-y border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {stats.map((st, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-4"
            >
              <span className={`text-4xl sm:text-5xl font-black tracking-tight ${st.valueColor}`}>
                {st.value}
              </span>
              <span className="text-sm sm:text-base text-slate-950 font-bold mt-2">
                {st.title}
              </span>
              <span className="text-xs text-slate-500 mt-1">
                {st.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
