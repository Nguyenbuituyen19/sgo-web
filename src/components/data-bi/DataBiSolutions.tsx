export default function DataBiSolutions() {
  const solutions = [
    {
      icon: "fa-solid fa-server",
      title: "Hạ tầng Dữ liệu (Data Infrastructure)",
      desc: "Xây dựng hệ thống Data Warehouse, Data Lake, thiết lập pipeline thu gom và làm sạch dữ liệu từ các nguồn ERP, CRM, Website, và Social Media.",
      bullets: [
        "ETL / ELT Automation",
        "Cloud & On-Premise Storage",
        "Bảo mật & Phân quyền dữ liệu",
      ],
    },
    {
      icon: "fa-solid fa-chart-pie",
      title: "Business Intelligence (BI)",
      desc: "Thiết kế các Dashboard điều hành thông minh, trực quan hóa các chỉ số cốt lõi (KPIs, Tài chính, Vận hành, Sales & Marketing) phục vụ ban lãnh đạo.",
      bullets: [
        "Executive Dashboard",
        "Power BI, Looker Studio, Tableau",
        "Cảnh báo dữ liệu thời gian thực",
      ],
    },
    {
      icon: "fa-solid fa-network-wired",
      title: "Tư vấn & Tối ưu Kiến trúc",
      desc: "Đánh giá hiện trạng hệ thống dữ liệu doanh nghiệp, tư vấn lộ trình chuyển đổi số toàn diện và tối ưu hóa chi phí vận hành hạ tầng công nghệ.",
      bullets: [
        "Kiểm toán dữ liệu (Data Audit)",
        "Lộ trình Data-Driven Culture",
        "Đào tạo nội bộ & Chuyển giao",
      ],
    },
  ];

  return (
    <section id="giai-phap" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-slate-900">
            Hệ Sinh Thái Dịch Vụ Dữ Liệu
          </h2>
          <p className="text-slate-600 text-sm md:text-base font-light">
            Chúng tôi đồng hành cùng doanh nghiệp từ khâu thiết kế hạ tầng, xử lý dữ liệu đến trực quan hóa kết quả kinh doanh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-inner">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 font-light">
                  {item.desc}
                </p>
                <ul className="space-y-2.5 text-xs text-slate-600 font-light pt-2 border-t border-slate-100">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-indigo-600"></i> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
