export default function FAQ() {
  return (
    <section id="ho-tro" className="max-w-4xl mx-auto space-y-8 mb-8">
      <div className="text-center space-y-3">
        <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
          Hỗ trợ khách hàng
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Câu Hỏi Thường Gặp
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed font-light">
          Tổng hợp những thắc mắc phổ biến của các chủ doanh nghiệp khi tìm hiểu
          và ứng dụng hệ sinh thái số của SGO Việt Nam.
        </p>
      </div>

      <div className="space-y-4">
        {/* FAQ Câu 1 */}
        <details className="group bg-white border border-slate-200/60 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
          <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-base">
            <span>
              Các dịch vụ trong hệ sinh thái của SGO Việt Nam có thể kết nối kết hợp
              với nhau không?
            </span>
            <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className="mt-3 text-slate-500 text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
            Có. Toàn bộ các giải pháp từ Thiết kế Website, mã QR Truy xuất nguồn
            gốc, Phần mềm bán hàng POS đến Hệ thống tin nhắn tự động Zalo ZNS và Hợp
            đồng điện tử đều được kiến trúc để liên kết chặt chẽ thông qua hệ thống
            cổng API đồng bộ. Điều này giúp dòng chảy dữ liệu khách hàng và doanh
            thu đổ tập trung về hệ thống quản trị CRM / ERP mà không gặp phải tình
            trạng phân mảnh.
          </p>
        </details>

        {/* FAQ Câu 2 */}
        <details className="group bg-white border border-slate-200/60 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
          <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-base">
            <span>
              SGO Việt Nam có hỗ trợ chỉnh sửa và may đo phần mềm theo yêu cầu
              riêng không?
            </span>
            <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className="mt-3 text-slate-500 text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
            Có. Bên cạnh các gói sản phẩm phần mềm đóng gói tiêu chuẩn triển khai
            nhanh, SGO Việt Nam sở hữu đội ngũ lập trình viên chuyên nghiệp chuyên
            trách mảng may đo hệ thống. Chúng tôi sẽ tiến hành khảo sát cách thức vận
            hành thực chiến của quý doanh nghiệp để tùy chỉnh hoặc viết mới các module
            phân hệ chuyên sâu theo đúng bài toán đặc thù ngành nghề của bạn.
          </p>
        </details>

        {/* FAQ Câu 3 */}
        <details className="group bg-white border border-slate-200/60 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
          <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-base">
            <span>
              Mã QR tạo từ hệ thống của SGO có bị giới hạn lượt quét hay chứa quảng
              cáo không?
            </span>
            <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className="mt-3 text-slate-500 text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
            Hoàn toàn không. Với phân hệ tạo mã QR miễn phí, SGO cam kết cung cấp mã
            độc bản sạch 100%, không dính quảng cáo chuyển hướng từ bên thứ ba và không
            giới hạn số lượt quét trọn đời. Đối với giải pháp QR Code nâng cấp thuộc
            phân hệ Truy xuất nguồn gốc hay Chống hàng giả, hệ thống sẽ bổ sung các
            lớp bảo mật, xác thực biến đổi và dashboard phân tích chuyên sâu.
          </p>
        </details>

        {/* FAQ Câu 4 */}
        <details className="group bg-white border border-slate-200/60 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
          <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-base">
            <span>
              Tôi có thể nhúng Tour thực tế ảo VR360 của SGO vào website riêng hiện
              tại không?
            </span>
            <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className="mt-3 text-slate-500 text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
            Hoàn toàn được. Hệ thống VR360 của SGO xuất dữ liệu đầu ra dưới dạng liên
            kết URL mã hóa an toàn hoặc đoạn mã nhúng Iframe (tương tự mã nhúng
            Youtube). Doanh nghiệp của bạn có thể dễ dàng chèn đoạn mã này vào bất
            kỳ vị trí nào trên website hiện tại để khách hàng trải nghiệm xoay không
            gian trực tiếp mà không ảnh hưởng tới tốc độ tải trang.
          </p>
        </details>

        {/* FAQ Câu 5 */}
        <details className="group bg-white border border-slate-200/60 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
          <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-base">
            <span>
              Giải pháp Hợp đồng điện tử của SGO có đảm bảo tính pháp lý không?
            </span>
            <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className="mt-3 text-slate-500 text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
            Hoàn toàn đảm bảo. Giải pháp Hợp đồng điện tử (e-Contract) của SGO tuân
            thủ chặt chẽ theo quy định của Luật Giao dịch điện tử, Luật Dân sự và các
            thông tư hướng dẫn từ Bộ Công Thương. Toàn bộ quy trình ký số công cộng,
            ký số từ xa (Remote Signing) đều có tính bảo mật cao, chống giả mạo và
            được pháp luật Việt Nam công nhận giá trị pháp lý tương đương hợp đồng
            giấy truyền thống.
          </p>
        </details>

        {/* FAQ Câu 6 */}
        <details className="group bg-white border border-slate-200/60 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm">
          <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-base">
            <span>
              Dịch vụ hạ tầng Cloud, Server của SGO có cam kết thời gian uptime ổn
              định không?
            </span>
            <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className="mt-3 text-slate-500 text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
            SGO Việt Nam cam kết tỷ lệ ổn định uptime đạt 99.99% trên toàn bộ hạ tầng
            Cloud Server, Hosting và Chỗ đặt máy chủ nhờ việc hợp tác vận hành tại
            các trung tâm dữ liệu (Data Center) đạt chuẩn Tier 3 quốc tế tại Việt
            Nam. Hệ thống được trang bị tường lửa chống DDoS tự động, sao lưu
            (backup) định kỳ giúp bảo toàn dữ liệu doanh nghiệp an toàn tối đa.
          </p>
        </details>
      </div>
    </section>
  );
}
