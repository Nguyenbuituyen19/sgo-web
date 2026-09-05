export default function VrFeatures() {
  return (
    <section id="tinh-nang" className="bg-slate-900 text-white py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-sky-400 font-bold text-xs uppercase tracking-widest bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Công nghệ may đo chuyên sâu
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Tính Năng All-In-One Trong Một Điểm Chạm
          </h2>
          <p className="text-slate-400 text-sm font-light">
            Không chỉ dừng lại ở việc ngắm nhìn, hệ thống VR360 tích hợp sâu các tiện ích chuyển đổi số biến chuyến tham quan ảo thành một hệ thống bán hàng tự động.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3 p-6 bg-slate-800/40 rounded-2xl border border-white/5">
            <div className="text-sky-400 text-2xl">
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
            <h4 className="text-base font-bold">Sa Bàn Ảo (Virtual Map)</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Tích hợp bản đồ 2D hoặc góc nhìn Flycam từ trên cao giúp khách hình dung trọn vẹn vị trí và quy mô của toàn bộ khu nghỉ dưỡng.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-slate-800/40 rounded-2xl border border-white/5">
            <div className="text-blue-400 text-2xl">
              <i className="fa-solid fa-circle-info"></i>
            </div>
            <h4 className="text-base font-bold">Điểm Hotspot Thông Tin</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Gắn thẻ thông tin mô tả chi tiết vật liệu, diện tích giường, menu nhà hàng hay nút đặt phòng trực tiếp ngay trên không gian 3D.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-slate-800/40 rounded-2xl border border-white/5">
            <div className="text-indigo-400 text-2xl">
              <i className="fa-solid fa-music"></i>
            </div>
            <h4 className="text-base font-bold">Thuyết Minh Đa Phương Tiện</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Tự động phát nhạc nền thư giãn hoặc giọng đọc MC ảo (Voiceover) hướng dẫn giới thiệu từng phòng giúp gia tăng cảm xúc.
            </p>
          </div>

          <div className="space-y-3 p-6 bg-slate-800/40 rounded-2xl border border-white/5">
            <div className="text-purple-400 text-2xl">
              <i className="fa-solid fa-language"></i>
            </div>
            <h4 className="text-base font-bold">Đa Ngôn Ngữ Tích Hợp</h4>
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              Hỗ trợ chuyển đổi nhanh giao diện ngôn ngữ (Anh, Việt, Hàn, Nhật) giúp tiếp cận tệp khách du lịch quốc tế chuyên nghiệp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
