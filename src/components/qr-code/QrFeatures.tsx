export default function QrFeatures() {
  return (
    <section id="uu-diem" className="bg-slate-100 py-16 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            Giá trị cốt lõi
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">
            Mã QR Được Khởi Tạo Tại SGO Có Gì Khác Biệt?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-lg mx-auto">
              <i className="fa-solid fa-eye-slash"></i>
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Sạch 100%</h4>
            <p className="text-slate-500 text-[11px] font-light">
              Tuyệt đối không chèn pop-up, không điều hướng quảng cáo bẩn gây ức chế cho khách hàng.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-lg mx-auto">
              <i className="fa-solid fa-infinity"></i>
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Vô hạn lượt quét</h4>
            <p className="text-slate-500 text-[11px] font-light">
              Mã QR hoạt động vĩnh viễn, không giới hạn dung lượng truy cập, yên tâm in ấn số lượng lớn.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-lg mx-auto">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Tốc độ tức thì</h4>
            <p className="text-slate-500 text-[11px] font-light">
              Định dạng mã tối ưu mật độ điểm ảnh, giúp camera điện thoại nhận diện nhanh dưới 0.5 giây.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-lg mx-auto">
              <i className="fa-solid fa-headset"></i>
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Hỗ trợ kỹ thuật</h4>
            <p className="text-slate-500 text-[11px] font-light">
              Được đội ngũ kỹ sư hạ tầng của SGO hỗ trợ giám sát, đảm bảo đường truyền luôn thông suốt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
