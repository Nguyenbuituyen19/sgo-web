export default function QrComparison() {
  return (
    <section id="so-sanh" className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-xl font-black text-slate-900">
          Xem xét & Cân nhắc trước khi quyết định in ấn
        </h2>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900 text-white font-bold">
              <th className="p-4">Tính năng kỹ thuật</th>
              <th className="p-4 bg-blue-600 text-center">Mã QR bởi SGO</th>
              <th className="p-4 text-center">Trang tạo QR miễn phí mạng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
            <tr>
              <td className="p-4 font-bold text-slate-900">
                Quảng cáo hiển thị kèm theo
              </td>
              <td className="p-4 text-center text-emerald-600 bg-blue-50/40 font-bold">
                <i className="fa-solid fa-circle-xmark"></i> Hoàn toàn KHÔNG
              </td>
              <td className="p-4 text-center text-red-500">
                <i className="fa-solid fa-circle-check"></i> Có (Sau vài ngày sử dụng)
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900">
                Giới hạn thời hạn hoạt động
              </td>
              <td className="p-4 text-center text-emerald-600 bg-blue-50/40 font-bold">
                <i className="fa-solid fa-infinity"></i> Vĩnh viễn trọn đời
              </td>
              <td className="p-4 text-center text-red-500">Giới hạn 14 - 30 ngày</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900">
                Tốc độ phản hồi chuyển link
              </td>
              <td className="p-4 text-center text-emerald-600 bg-blue-50/40 font-bold">
                Trực tiếp (Dưới 0.5s)
              </td>
              <td className="p-4 text-center text-slate-400">
                Chậm (Chờ tải trang đệm)
              </td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900">
                Chi phí duy trì hệ thống
              </td>
              <td className="p-4 text-center text-emerald-600 bg-blue-50/40 font-bold">
                0đ (Tài trợ miễn phí)
              </td>
              <td className="p-4 text-center text-slate-700">
                Đòi phí bản quyền gia hạn
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
