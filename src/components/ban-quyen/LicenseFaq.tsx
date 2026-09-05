export default function LicenseFaq() {
  const faqs = [
    {
      q: "1. Key bản quyền này là loại gì? Có update được không?",
      a: "Tất cả key tại sgodata.com là key bản quyền chính hãng dạng điện tử (Digital/Retail/MAK). Quý khách có thể thoải mái cập nhật (update) các bản vá bảo mật trực tiếp từ Microsoft mà không lo bị mất bản quyền.",
    },
    {
      q: "2. Nếu cài lại máy thì key còn sử dụng được không?",
      a: "Đối với các dòng key Retail hoặc gắn liền với tài khoản Microsoft (như Office), bạn hoàn toàn có thể tái sử dụng khi cài lại máy tính. Trường hợp gặp khó khăn, đội ngũ sgodata.com sẽ hỗ trợ bạn kích hoạt lại.",
    },
    {
      q: "3. Thời gian nhận được key sau khi thanh toán là bao lâu?",
      a: "Thời gian xử lý và giao key tự động hoặc qua nhân viên chăm sóc khách hàng diễn ra từ 3 đến 5 phút kể từ khi nhận được xác nhận thanh toán.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="mt-4 text-lg text-slate-600 font-light">
            Giải đáp thắc mắc về sản phẩm và chính sách bản quyền tại sgodata.com.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group bg-slate-50 p-6 rounded-xl border border-slate-200 cursor-pointer [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center font-bold text-slate-900 text-base list-none">
                <span>{faq.q}</span>
                <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
                  <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed font-light pt-3 border-t border-slate-200/60">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
