export default function DataBiStats() {
  const stats = [
    { number: "100%", label: "Tự động hóa luồng dữ liệu" },
    { number: "Real-time", label: "Báo cáo & Dashboard trực quan" },
    { number: "Multi-source", label: "Tích hợp đa nguồn dữ liệu" },
    { number: "24/7", label: "Vận hành và Hỗ trợ kỹ thuật" },
  ];

  return (
    <section className="bg-white border-b border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((item, idx) => (
          <div key={idx}>
            <div className="text-3xl lg:text-4xl font-extrabold text-indigo-900 mb-1">
              {item.number}
            </div>
            <div className="text-xs md:text-sm text-slate-500 font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
