export default function AboutIntroduction() {
  return (
    <section className="w-full py-10 lg:py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Mission Description */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">domain</span>
              <span>Về tổ chức chúng tôi</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Chúng tôi xây dựng công nghệ để giải quyết những vấn đề thực tế
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
              SGODATA là doanh nghiệp công nghệ tiên phong tập trung phát triển các giải pháp số, hạ tầng dữ liệu và nền tảng điện toán đám mây thế hệ mới. Chúng tôi tin rằng công nghệ chỉ thực sự có giá trị khi tháo gỡ triệt để điểm nghẽn vận hành và gia tăng năng lực kinh doanh.
            </p>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
              Với đội ngũ kỹ sư dữ liệu và chuyên gia hệ thống giàu kinh nghiệm thực chiến tại các tập đoàn lớn, SGODATA cam kết mang đến những giải pháp khả thi, kiến trúc ổn định và dịch vụ đồng hành chuẩn hóa quốc tế.
            </p>

            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
                <span className="material-symbols-outlined text-[36px] text-blue-600 shrink-0">verified</span>
                <div>
                  <p className="font-bold text-sm text-slate-950">100% Cam kết chuẩn kỹ thuật</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kiến trúc sẵn sàng mở rộng ngang, tối ưu chi phí hạ tầng TCO lên tới 35%.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Core Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <span className="material-symbols-outlined text-[28px]">database</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-slate-950">Hạ tầng dữ liệu thông minh</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Tập trung hóa, xử lý và trực quan hóa dữ liệu theo thời gian thực. Chuyển đổi dữ liệu thô phân mảnh thành tài sản tri thức mang lại giá trị ra quyết định chuẩn xác.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                <span className="material-symbols-outlined text-[28px]">smart_toy</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-slate-950">Nền tảng Cloud &amp; AI linh hoạt</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Tích hợp mô hình AI chuyên sâu và kiến trúc Microservices điện toán đám mây đàn hồi, giúp doanh nghiệp tự động hóa quy trình phức tạp với độ trễ thấp nhất.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                <span className="material-symbols-outlined text-[28px]">lock</span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-slate-950">Bảo mật chuẩn quốc tế</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Kiểm soát truy cập phân quyền nghiêm ngặt, tuân thủ các quy chuẩn bảo mật an toàn thông tin khắt khe nhất, bảo vệ tài nguyên số trước mọi rủi ro an ninh mạng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
