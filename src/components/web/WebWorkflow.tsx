export default function WebWorkflow() {
  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Quy Trình Làm Việc Chuyên Nghiệp
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2 border-l-2 border-purple-500 pl-4">
            <div className="text-xs font-bold text-purple-400">Bước 01</div>
            <h4 className="font-bold text-sm">Khảo sát &amp; Báo giá</h4>
            <p className="text-xs text-slate-400 font-light">
              SGO ghi nhận yêu cầu, phân tích đối thủ cạnh tranh và chốt bảng tính năng kèm chi phí.
            </p>
          </div>
          <div className="space-y-2 border-l-2 border-purple-500 pl-4">
            <div className="text-xs font-bold text-purple-400">Bước 02</div>
            <h4 className="font-bold text-sm">Thiết kế UI/UX Demo</h4>
            <p className="text-xs text-slate-400 font-light">
              Lên ý tưởng bản vẽ sơ bộ mặt giao diện trang chủ để khách hàng duyệt phong cách màu sắc.
            </p>
          </div>
          <div className="space-y-2 border-l-2 border-purple-500 pl-4">
            <div className="text-xs font-bold text-purple-400">Bước 03</div>
            <h4 className="font-bold text-sm">Lập trình &amp; Tối ưu</h4>
            <p className="text-xs text-slate-400 font-light">
              Tiến hành viết mã nguồn, tối ưu tốc độ load trang và test hiển thị thiết bị di động.
            </p>
          </div>
          <div className="space-y-2 border-l-2 border-purple-500 pl-4">
            <div className="text-xs font-bold text-purple-400">Bước 04</div>
            <h4 className="font-bold text-sm">Bàn giao &amp; Bảo hành</h4>
            <p className="text-xs text-slate-400 font-light">
              Bàn giao toàn bộ source code chính chủ, hướng dẫn vận hành và bảo trì trọn đời lỗi kỹ thuật.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
