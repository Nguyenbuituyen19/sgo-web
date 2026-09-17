export default function DataBiFaq() {
  const faqs = [
    {
      q: "Doanh nghiệp nhỏ hoặc mới bắt đầu có cần xây dựng Hạ tầng Dữ liệu và BI không?",
      a: "Hoàn toàn có. Việc xây dựng nền tảng dữ liệu chuẩn từ sớm giúp doanh nghiệp tránh được tình trạng 'rác dữ liệu' hoặc phân mảnh khi quy mô phát triển. Chúng tôi cung cấp các gói giải pháp linh hoạt, tối ưu chi phí, phù hợp với cả doanh nghiệp quy mô vừa và nhỏ (SMEs) nhưng vẫn đảm bảo khả năng mở rộng trong tương lai.",
    },
    {
      q: "Thời gian triển khai một hệ thống Data Warehouse và Dashboard BI mất bao lâu?",
      a: "Thời gian triển khai phụ thuộc vào mức độ phức tạp và số lượng nguồn dữ liệu của doanh nghiệp. Thông thường, một dự án cơ bản từ khảo sát, xây dựng đường ống dữ liệu (ETL) đến khi hoàn thiện Dashboard điều hành kéo dài từ 2 đến 6 tuần.",
    },
    {
      q: "Dữ liệu của công ty chúng tôi có được bảo mật an toàn không?",
      a: "Bảo mật là ưu tiên hàng đầu của chúng tôi. Toàn bộ hạ tầng dữ liệu được thiết lập với các tiêu chuẩn mã hóa cao, phân quyền truy cập chặt chẽ theo từng phòng ban/cấp bậc. Dữ liệu hoàn toàn thuộc quyền sở hữu độc lập của doanh nghiệp bạn.",
    },
    {
      q: "SGO Data hỗ trợ những công cụ và nền tảng BI nào?",
      a: "Chúng tôi hỗ trợ đa dạng các nền tảng công nghệ phổ biến hàng đầu hiện nay tùy theo nhu cầu và ngân sách của doanh nghiệp, bao gồm: Microsoft Power BI, Google Looker Studio, Tableau, cùng các giải pháp Data Warehouse trên Cloud (Google BigQuery, AWS, PostgreSQL, MySQL,...).",
    },
    {
      q: "Sau khi bàn giao hệ thống, nhân sự nội bộ có dễ dàng sử dụng và cập nhật không?",
      a: "Có. SGO Data luôn đi kèm quá trình đào tạo chuyển giao công nghệ chi tiết cho đội ngũ vận hành nội bộ, cung cấp tài liệu hướng dẫn trực quan và có chính sách hỗ trợ kỹ thuật, bảo trì hệ thống định kỳ.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            GIẢI ĐÁP THẮC MẮC
          </span>
          <h2 className="text-3xl font-bold text-slate-900">Câu Hỏi Thường Gặp</h2>
          <p className="text-slate-600 text-xs md:text-sm font-light">
            Những thắc mắc phổ biến của doanh nghiệp khi bắt đầu chuẩn hóa hạ tầng dữ liệu và ứng dụng BI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-indigo-300 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center font-bold text-slate-900 text-sm md:text-base list-none">
                <span>{faq.q}</span>
                <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
                  <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
                </span>
              </summary>
              <p className="mt-3 text-xs md:text-sm text-slate-600 leading-relaxed font-light pt-3 border-t border-slate-100">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
