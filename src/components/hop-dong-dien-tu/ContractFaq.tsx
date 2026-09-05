export default function ContractFaq() {
  const faqs = [
    {
      q: "1. Hợp đồng điện tử e-Contract có giá trị pháp lý tương đương hợp đồng giấy không?",
      a: "Có. Theo Điều 14 Luật Giao dịch điện tử và Điều 119 Bộ luật Dân sự Việt Nam, hợp đồng điện tử được thừa nhận có giá trị pháp lý hoàn toàn tương đương với hợp đồng văn bản truyền thống nếu đáp ứng đủ điều kiện về tính toàn vẹn và xác thực chữ ký của các bên tham gia giao dịch.",
    },
    {
      q: "2. Tôi có thể dùng những phương thức nào để ký kết trên hệ thống?",
      a: "SGO e-Contract hỗ trợ đa dạng phương thức ký đáp ứng mọi điều kiện của khách hàng: Ký số bằng thiết bị phần cứng USB Token, công nghệ Ký số từ xa (Remote Signing Cloud CA) không cần phần cứng, ký qua SIM CA của nhà mạng, hoặc ký điện tử xác thực định danh qua mã OTP SMS/Email.",
    },
    {
      q: "3. Khách hàng của tôi không có tài khoản SGO e-Contract thì có ký được không?",
      a: "Hoàn toàn ký được. Đối tác hoặc khách hàng của bạn chỉ cần nhận được liên kết ký kết gửi tự động qua hệ thống Email/SMS. Họ truy cập trực tiếp bằng trình duyệt Internet trên máy tính hoặc điện thoại thông minh để xác thực OTP và thực hiện ký kết số mà hoàn toàn không tốn chi phí mua phần mềm.",
    },
    {
      q: "4. Hệ thống bảo mật dữ liệu hợp đồng của doanh nghiệp như thế nào?",
      a: "Hệ thống dữ liệu được truyền tải bảo mật an toàn qua giao thức mã hóa cao cấp SSL/TLS và lưu trữ an toàn trên hạ tầng trung tâm dữ liệu Cloud đạt chuẩn bảo mật quốc tế. Mọi lịch sử truy cập, chỉnh sửa, ký duyệt đều được lưu vết dòng thời gian (Timestamp) tường minh chống giả mạo tuyệt đối.",
    },
    {
      q: "5. Phần mềm có tích hợp được vào hệ thống quản trị nội bộ CRM/ERP sẵn có không?",
      a: "Có. SGO e-Contract cung cấp hệ thống cổng API mở chuẩn hóa vô cùng chuyên nghiệp. Đội ngũ kỹ thuật hỗ trợ doanh nghiệp liên kết, đẩy dữ liệu luồng tạo và ký duyệt hợp đồng tự động trực tiếp từ các hệ thống phần mềm quản lý nhân sự, phần mềm kế toán, phần mềm CRM hay phân hệ ERP có sẵn.",
    },
    {
      q: "6. Quy trình triển khai cài đặt hệ thống mất bao lâu?",
      a: "Do hoạt động trên nền tảng điện toán đám mây (Cloud SaaS) tối ưu hiện đại, doanh nghiệp hoàn toàn không cần đầu tư máy chủ vật lý tốn kém. SGO có thể kích hoạt phân quyền tài khoản tổ chức, tải cấu hình mẫu phôi hợp đồng riêng và đưa vào sử dụng giao dịch thực tế ngay lập tức trong ngày.",
    },
    {
      q: "7. Có giới hạn số lượng người ký hay phòng ban sử dụng không?",
      a: "Không. Phần mềm hỗ trợ doanh nghiệp khởi tạo phân cấp không giới hạn số lượng người dùng nội bộ và số lượng phòng ban quản lý (Kinh doanh, Nhân sự, Hành chính, Mua hàng...). Gói cước chi phí chỉ tính dựa trên số lượng gói tổng số hợp đồng thực hiện phát sinh giao dịch thành công.",
    },
    {
      q: "8. Khi xảy ra tranh chấp, hợp đồng điện tử có dùng làm chứng cứ được không?",
      a: "Có. Tệp tin hợp đồng điện tử e-Contract nguyên bản xuất ra đính kèm chữ ký chứng thư số hợp lệ từ tổ chức chứng thực CA đại diện cấu hình chính là chứng cứ pháp lý vững chắc, đầy đủ quyền lực được chấp thuận trước các cơ quan Tòa án nhân dân và Trọng tài thương mại khi phát sinh tranh chấp.",
    },
    {
      q: "9. Hệ thống có cảnh báo khi hợp đồng sắp hết hạn hay không?",
      a: "Có. Tính năng quản trị thông minh được xây dựng tích hợp sẵn bộ lọc tự động rà soát hệ thống. Công cụ sẽ chủ động gửi email cảnh báo thông minh hoặc gửi tin báo nhắc nhở lên hệ thống Dashboard quản lý trước 15 - 30 ngày cho bộ phận phụ trách khi các hợp đồng lao động nhân sự hoặc hợp đồng kinh tế sắp đến ngày đáo hạn.",
    },
    {
      q: "10. Chi phí gia hạn phần mềm hàng năm được tính như thế nào?",
      a: "Doanh nghiệp hoàn toàn chủ động, chỉ cần mua số gói tài nguyên lượt hợp đồng tương ứng theo tiến độ vận hành kinh doanh thực tế. Nếu trong năm số lượng lượt ký cũ chưa tiêu hao hết, hệ thống thông minh hỗ trợ bảo lưu và cộng dồn sang chu kỳ tiếp theo khi doanh nghiệp gia hạn gói tài nguyên mới, không thu phí phần mềm vô lý.",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Giải Đáp Câu Hỏi Thường Gặp (FAQ)
        </h2>
        <p className="text-slate-500 text-xs md:text-sm mt-2 font-light">
          Tổng hợp thắc mắc hàng đầu về tính pháp lý và vận hành hệ thống hợp đồng điện tử
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-5 cursor-pointer transition-all hover:border-blue-300 [&_summary::-webkit-details-marker]:hidden"
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
