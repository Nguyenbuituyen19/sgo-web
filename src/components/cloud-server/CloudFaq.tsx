export default function CloudFaq() {
  const faqs = [
    {
      q: "Cloud Server tại SGO hỗ trợ những hệ điều hành nào?",
      a: "SGO Cloud Server hỗ trợ tất cả các phiên bản hệ điều hành phổ biến nhất hiện nay: Linux (CentOS, Ubuntu, Debian, AlmaLinux, Rocky Linux) và Windows Server (2016, 2019, 2022). Khách hàng có thể chủ động Reinstall OS bất kỳ lúc nào qua Control Panel.",
    },
    {
      q: "Tôi có thể tự nâng cấp CPU, RAM, SSD khi nhu cầu sử dụng tăng lên không?",
      a: "Hoàn toàn được. Hệ thống Cloud của SGO hỗ trợ nâng cấp Hot-resize cực kỳ linh hoạt trong vòng 1-3 phút. Bạn chỉ cần nâng cấp thông số mong muốn mà không phải di chuyển dữ liệu hay đổi địa chỉ IP.",
    },
    {
      q: "Dữ liệu trên máy chủ có được sao lưu (Backup) an toàn không?",
      a: "Có. Hệ thống tự động tạo bản sao lưu Snapshot/Backup định kỳ mỗi tuần. Ngoài ra khách hàng có thể chủ động tạo Snapshot tức thì trước khi nâng cấp phần mềm hay cập nhật mã nguồn.",
    },
    {
      q: "Tôi có được toàn quyền quản trị máy chủ (Root / Administrator) không?",
      a: "Có. SGO bàn giao 100% quyền truy cập Root (đối với Linux qua SSH) hoặc Administrator (đối với Windows qua Remote Desktop RDP). Bạn hoàn toàn chủ động cài đặt phần mềm và cấu hình theo yêu cầu.",
    },
  ];

  return (
    <section id="faq" className="py-16 max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Câu Hỏi Thường Gặp Về Cloud Server
        </h2>
        <p className="text-slate-500 text-xs md:text-sm mt-2 font-light">
          Giải đáp các thắc mắc phổ biến trước khi đăng ký khởi tạo máy chủ tại SGO Việt Nam
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 cursor-pointer transition-all hover:border-blue-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex justify-between items-center gap-4 font-bold text-sm text-slate-900 list-none">
              <span>{faq.q}</span>
              <span className="text-blue-600 shrink-0 bg-blue-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-blue-600 group-open:text-white transition-colors duration-200">
                <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
              </span>
            </summary>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed font-light pt-3 border-t border-slate-100">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
