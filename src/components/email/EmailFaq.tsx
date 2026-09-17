export default function EmailFaq() {
  const faqs = [
    {
      q: "Làm sao để email gửi đi không bị rơi vào hộp thư rác (Spam)?",
      a: "SGO Việt Nam cấu hình đầy đủ các bản ghi xác thực uy tín gồm SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail) và DMARC. Kết hợp với dải IP sạch độc lập, hệ thống đảm bảo độ tin cậy tuyệt đối với các nhà cung cấp như Gmail, Outlook, Yahoo.",
    },
    {
      q: "Tôi có thể cấu hình email trên điện thoại và phần mềm Outlook không?",
      a: "Hoàn toàn được. Dịch vụ Email của SGO hỗ trợ đầy đủ các giao thức IMAP/POP3 tiêu chuẩn, giúp bạn dễ dàng cấu hình đồng bộ trực tiếp trên Microsoft Outlook, Apple Mail, Thunderbird trên máy tính và các ứng dụng Mail mặc định trên iOS, Android.",
    },
    {
      q: "SGO có hỗ trợ chuyển toàn bộ dữ liệu email từ nhà cung cấp cũ không?",
      a: "Có. Đội ngũ kỹ thuật của chúng tôi sẽ hỗ trợ trọn gói việc migration (di chuyển) toàn bộ các hộp thư, thư mục và dữ liệu cũ của doanh nghiệp sang hạ tầng mới hoàn toàn miễn phí, đảm bảo không làm gián đoạn công việc kinh doanh của bạn.",
    },
  ];

  return (
    <section className="max-w-3xl mx-auto mt-20 space-y-6">
      <h3 className="text-lg font-bold text-slate-950 text-center">
        <i className="fa-solid fa-circle-question text-amber-600 mr-2"></i>
        Câu hỏi thường gặp về Email Doanh Nghiệp
      </h3>

      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white border border-slate-200/60 rounded-xl p-4 cursor-pointer shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between font-semibold text-sm text-slate-900 list-none">
              <span>{faq.q}</span>
              <span className="text-amber-600 shrink-0">
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
