export default function InfraFaq() {
  const faqs = [
    {
      q: "Dữ liệu trên hệ thống lưu trữ Cloud của SGO có an toàn không?",
      a: "Hoàn toàn an toàn. Hệ thống máy chủ của SGO Việt Nam cấu hình RAID lưu trữ phân tán thông minh kết hợp hệ thống tự động backup dữ liệu định kỳ mỗi tuần. Doanh nghiệp hoàn toàn an tâm dữ liệu được bảo lưu an toàn cô lập.",
    },
    {
      q: "SGO có hỗ trợ chuyển dữ liệu từ nhà cung cấp cũ về không?",
      a: "Có. Đội ngũ kỹ thuật viên của SGO Việt Nam hỗ trợ trọn gói việc di chuyển toàn bộ mã nguồn website, cơ sở dữ liệu (Database) hoặc cấu hình email doanh nghiệp từ nhà cung cấp cũ về hạ tầng mới hoàn toàn miễn phí, cam kết không làm gián đoạn truy cập hệ thống.",
    },
    {
      q: "Dịch vụ Email doanh nghiệp của SGO có giúp giảm tình trạng thư rơi vào hộp thư rác (Spam) không?",
      a: "Có. Hệ thống Email Hosting và Email Server của SGO sử dụng dải IP sạch, độ tin cậy cao và cấu hình đầy đủ các bản ghi định danh nghiêm ngặt như SPF, DKIM, DMARC. Kết hợp với bộ lọc thông minh, giải pháp giúp tối ưu hóa tỷ lệ thư vào Inbox lên đến 99% và ngăn chặn tối đa thư rác, thư độc hại gửi đến.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto mt-20 space-y-6">
      <h3 className="text-lg font-bold text-slate-950 text-center">
        <i className="fa-solid fa-circle-question text-cyan-600 mr-2"></i>
        Giải đáp thắc mắc hạ tầng
      </h3>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white border border-slate-200/60 rounded-xl p-4 cursor-pointer shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between font-semibold text-sm text-slate-900 list-none">
              <span>{faq.q}</span>
              <span className="text-cyan-600 shrink-0">
                <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
              </span>
            </summary>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed font-light pt-2 border-t border-slate-50">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
