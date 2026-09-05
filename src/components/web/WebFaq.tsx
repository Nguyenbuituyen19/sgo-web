export default function WebFaq() {
  const faqs = [
    {
      q: "1. Chi phí thiết kế website tại SGO là trọn gói hay có phát sinh gì không?",
      a: "Báo giá tại SGO là chi phí trọn gói theo hợp đồng đã bao gồm thiết kế đồ họa, lập trình chức năng, tặng kèm tên miền và hosting lưu trữ năm đầu tiên. Chúng tôi cam kết hoàn toàn không phát sinh thêm bất kỳ khoản phí ẩn nào trong suốt quá trình xây dựng.",
    },
    {
      q: "2. SGO sử dụng mã nguồn gì để thiết kế website?",
      a: "Tùy thuộc vào yêu cầu bài toán kinh doanh, SGO tối ưu trên các nền tảng công nghệ phổ biến: sử dụng CMS WordPress (may đo code thuần tối ưu điểm PageSpeed) cho các dạng web giới thiệu, dịch vụ để tối ưu chi phí và hỗ trợ SEO tốt nhất; hoặc lập trình hệ thống Framework riêng (Custom Code) cho hệ thống TMĐT chịu tải nặng.",
    },
    {
      q: "3. Website sau khi bàn giao có được bảo hành bảo trì không?",
      a: "Tất cả các sản phẩm website do SGO Việt Nam triển khai và vận hành trên hệ thống hạ tầng Hosting/VPS của chúng tôi đều nhận được chính sách bảo hành, bảo trì hoàn toàn miễn phí trọn đời, hỗ trợ xử lý sự cố mã nguồn kỹ thuật 24/7.",
    },
    {
      q: "4. Thời gian hoàn thiện một website mất bao lâu?",
      a: "Thời gian hoàn thành phụ thuộc vào quy mô cấu trúc trang: Gói Landing Page thường từ 3 - 5 ngày làm việc. Gói Website Doanh nghiệp giới thiệu tiêu chuẩn từ 7 - 12 ngày. Gói Thương mại điện tử hoặc ứng dụng quản trị phức tạp theo yêu cầu riêng cần từ 15 - 30 ngày.",
    },
    {
      q: "5. Tôi có được sở hữu hoàn toàn mã nguồn (Source Code) sau khi bàn giao không?",
      a: "Có. Sau khi hai bên tiến hành nghiệm thu và thanh lý hợp đồng, SGO bàn giao 100% tài khoản quản trị cao nhất, tệp tin mã nguồn gốc và cơ sở dữ liệu (Database) trực tiếp cho khách hàng. Chúng tôi không khóa mã nguồn và không giữ mã độc quyền.",
    },
    {
      q: "6. Website được thiết kế đã tối ưu chuẩn SEO và Responsive trên điện thoại chưa?",
      a: "Chắc chắn. 100% dự án thiết kế tại SGO đều tuân thủ nghiêm ngặt các tiêu chí SEO kỹ thuật của Google (tối ưu thẻ heading, cấu trúc URL, thẻ alt hình ảnh, Sitemap, dữ liệu cấu trúc Schema). Giao diện tự động co giãn, tương thích (Responsive) mượt mà trên Điện thoại, Máy tính bảng và PC.",
    },
    {
      q: "7. Sang năm thứ 2, tôi cần đóng những chi phí gì để duy trì website?",
      a: "Từ năm thứ hai trở đi, bạn hoàn toàn không phải trả chi phí bản quyền thiết kế phần mềm. Bạn chỉ cần đóng phí gia hạn duy trì 02 dịch vụ hạ tầng nền tảng cơ bản gồm: Tên miền (Domain) và Không gian lưu trữ dữ liệu (Hosting/VPS) trực tiếp theo giá thị trường niêm yết.",
    },
    {
      q: "8. SGO có hỗ trợ hướng dẫn tôi tự quản trị website, đăng bài viết sản phẩm không?",
      a: "Có. Khi bàn giao hệ thống, SGO Việt Nam sẽ chuyển giao đầy đủ tài liệu cẩm nang hướng dẫn dạng văn bản chụp màn hình kết hợp chuỗi Video thực hành trực quan. Đồng thời, chuyên viên kỹ thuật sẽ UltraView hướng dẫn trực tiếp giúp bạn hoàn toàn làm chủ trang web mà không cần biết lập trình.",
    },
    {
      q: "9. Nếu tôi đã có sẵn Tên miền hoặc Hosting thì chi phí có được giảm trừ không?",
      a: "Hoàn toàn có. Trường hợp doanh nghiệp đã mua sẵn tên miền hoặc có máy chủ lưu trữ riêng thích hợp, SGO sẽ khấu trừ giá trị tiền mặt của gói quà tặng hạ tầng đi kèm trực tiếp vào tổng chi phí hợp đồng và hỗ trợ cấu hình trỏ tên miền về máy chủ miễn phí.",
    },
    {
      q: "10. SGO có hỗ trợ viết bài hay làm nội dung hình ảnh ban đầu cho website không?",
      a: "Trong khuôn khổ dự án thiết kế, SGO hỗ trợ cài đặt bố cục chuẩn, thiết kế các banner lớn trang chủ cơ bản và cập nhật từ 5 - 10 bài viết/sản phẩm demo ban đầu do bạn cung cấp để khớp giao diện. Nếu doanh nghiệp có nhu cầu viết bài chuẩn SEO hàng loạt hay quản trị nội dung định kỳ, SGO sẵn sàng cung cấp thêm gói dịch vụ Content Marketing chuyên biệt.",
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Giải Đáp Câu Hỏi Thường Gặp
        </h2>
        <p className="text-slate-500 text-xs md:text-sm mt-2 font-light">
          Tổng hợp những thắc mắc phổ biến của đối tác trước khi bắt đầu thiết kế web tại SGO
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-5 cursor-pointer transition-all hover:border-purple-300 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex justify-between items-center gap-4 font-bold text-sm text-slate-900 list-none">
              <span>{faq.q}</span>
              <span className="text-purple-600 shrink-0 bg-purple-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-purple-600 group-open:text-white transition-colors duration-200">
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
