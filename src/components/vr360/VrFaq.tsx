export default function VrFaq() {
  return (
    <section className="max-w-4xl mx-auto px-4 pb-20 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">Giải Đáp Thắc Mắc</h3>
        <p className="text-slate-500 text-xs font-light">
          Những câu hỏi phổ biến từ các chủ doanh nghiệp khi triển khai Tour thực tế ảo VR360.
        </p>
      </div>

      <div className="space-y-4">
        <details className="group bg-white border border-slate-200/60 rounded-2xl p-5 cursor-pointer shadow-xs [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-sm md:text-base">
            <span>Thời gian triển khai chụp và hoàn thiện một dự án VR360 mất bao lâu?</span>
            <span className="text-blue-600 shrink-0 bg-blue-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-blue-600 group-open:text-white transition-colors duration-200">
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className="mt-3 text-slate-500 text-xs md:text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
            Thông thường thời gian bấm máy chụp thực tế tại một khách sạn/resort chỉ mất từ 1 - 2 ngày tùy thuộc vào số lượng không gian. Thời gian xử lý hậu kỳ, ghép ảnh HDR 360 độ và lập trình tích hợp tính năng phần mềm sẽ kéo dài từ 5 - 7 ngày làm việc để bàn giao sản phẩm cuối cùng.
          </p>
        </details>

        <details className="group bg-white border border-slate-200/60 rounded-2xl p-5 cursor-pointer shadow-xs [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-sm md:text-base">
            <span>Sau khi bàn giao, tôi có thể tự nhúng Tour VR360 vào Website riêng của mình không?</span>
            <span className="text-blue-600 shrink-0 bg-blue-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-blue-600 group-open:text-white transition-colors duration-200">
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className="mt-3 text-slate-500 text-xs md:text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
            Hoàn toàn được. Hệ thống VR360 xuất ra dưới dạng liên kết URL chuẩn mã hóa hoặc đoạn mã nhúng Iframe (tương tự như cách bạn nhúng một video Youtube). Bạn hay kỹ thuật viên Website của bạn chỉ mất chưa đầy 1 phút để nhúng trực tiếp Tour 360 mượt mà lên bất kỳ trang web nào.
          </p>
        </details>

        <details className="group bg-white border border-slate-200/60 rounded-2xl p-5 cursor-pointer shadow-xs [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-sm md:text-base">
            <span>Dịch vụ có hỗ trợ cập nhật thay đổi khi tôi sửa sang, làm mới lại phòng ốc không?</span>
            <span className="text-blue-600 shrink-0 bg-blue-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-blue-600 group-open:text-white transition-colors duration-200">
              <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
            </span>
          </summary>
          <p className="mt-3 text-slate-500 text-xs md:text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
            Có. Kiến trúc mã nguồn phần mềm VR360 của chúng tôi cực kỳ linh hoạt. Khi bạn nâng cấp hoặc đổi mới thiết kế nội thất của một vài hạng phòng, chúng tôi chỉ cần đến chụp lại riêng các không gian đó và cập nhật thay thế vị trí cũ trên hệ thống cũ mà không làm gián đoạn hay phải làm lại từ đầu toàn bộ Tour.
          </p>
        </details>
      </div>
    </section>
  );
}
