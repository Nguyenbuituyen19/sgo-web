export default function VrBenefits() {
  return (
    <section id="loi-ich" className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
        <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
          Tại sao chọn VR360?
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Giải Quyết Bài Toán Cạnh Tranh Ngành Lưu Trú
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed font-light">
          Hình ảnh 2D thông thường không còn đủ để thuyết phục khách hàng cao cấp. VR360 mang lại trải nghiệm thị giác chân thực, minh bạch giúp loại bỏ hoàn toàn sự do dự của khách lưu trú trước khi xuống tiền.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="hover-scale bg-white rounded-2xl p-8 border border-slate-100 shadow-xs">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl mb-6">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Tăng Tỷ Lệ Đặt Phòng</h3>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">
            Kích thích nhu cầu trải nghiệm nhờ hình ảnh phòng ốc trực quan 100%. Khách đặt phòng tự tin hơn vì &quot;những gì thấy trực tuyến chính là thực tế họ nhận được&quot;.
          </p>
        </div>

        <div className="hover-scale bg-white rounded-2xl p-8 border border-slate-100 shadow-xs">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl mb-6">
            <i className="fa-solid fa-hourglass-half"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Giữ Chân Khách Ở Lại Web</h3>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">
            Tăng thời gian ở lại (Time on site) trên website của bạn gấp 3-5 lần nhờ tính năng tương tác tự do di chuyển, giúp cải thiện đáng kể điểm SEO trên Google.
          </p>
        </div>

        <div className="hover-scale bg-white rounded-2xl p-8 border border-slate-100 shadow-xs">
          <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center text-xl mb-6">
            <i className="fa-solid fa-share-nodes"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Công Cụ Marketing Đột Phá</h3>
          <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-light">
            Dễ dàng chia sẻ link tour 360 lên Facebook, Zalo, OTA (Agoda, Booking) hoặc nhúng trực tiếp vào Website. Tạo điểm nhấn thương hiệu vượt trội đối thủ.
          </p>
        </div>
      </div>
    </section>
  );
}
