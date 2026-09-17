export default function AboutCulture() {
  return (
    <section className="w-full py-10 lg:py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Môi trường &amp; Con người
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 mt-1">
            Văn hóa doanh nghiệp SGODATA
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Môi trường làm việc cởi mở, nơi từng cá nhân được tôn trọng sáng kiến và đóng góp trực tiếp cho sự đổi mới chung.
          </p>
        </div>

        {/* Asymmetric Mosaic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Big Feature */}
          <div className="md:col-span-8 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden min-h-[300px]">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-blue-600 font-semibold text-xs mb-4 shadow-xs border border-slate-200/60">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span>Nghiên cứu &amp; Đổi mới sáng tạo</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                Không ngừng thử nghiệm công nghệ tiên phong
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Mỗi thành viên SGODATA dành 15% thời gian để nghiên cứu công nghệ mới, thử nghiệm mã nguồn mở và xây dựng các Proof-of-Concept trước khi áp dụng thực tế.
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 mt-6">
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200/60 text-slate-900 font-mono text-xs font-medium shadow-xs">
                Hackathons nội bộ
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200/60 text-slate-900 font-mono text-xs font-medium shadow-xs">
                Tech Talk hàng tuần
              </span>
            </div>
          </div>

          {/* Small Feature 1 */}
          <div className="md:col-span-4 bg-indigo-50/60 border border-indigo-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center mb-6 shadow-xs border border-slate-200/50">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </div>
              <h4 className="text-lg font-bold text-slate-950">Chia sẻ tri thức</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Mọi tài liệu kiến trúc kỹ thuật đều được chuẩn hóa và mở cho toàn bộ đội ngũ, giúp thế hệ kỹ sư mới hòa nhập nhanh chóng.
              </p>
            </div>
            <div className="text-blue-600 font-semibold text-xs mt-6">
              Văn hóa Open Documentation
            </div>
          </div>

          {/* Small Feature 2 */}
          <div className="md:col-span-4 bg-purple-50/60 border border-purple-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center mb-6 shadow-xs border border-slate-200/50">
                <span className="material-symbols-outlined text-[20px]">public</span>
              </div>
              <h4 className="text-lg font-bold text-slate-950">Trách nhiệm xã hội</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Tài trợ hạ tầng học tập cho sinh viên ngành dữ liệu và tham gia các dự án cộng đồng số hóa vì lợi ích xã hội.
              </p>
            </div>
            <div className="text-purple-600 font-semibold text-xs mt-6">
              Đóng góp cộng đồng
            </div>
          </div>

          {/* Medium Feature */}
          <div className="md:col-span-8 bg-slate-100/80 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-900 font-semibold text-xs mb-4 shadow-xs border border-slate-200/60">
                <span className="material-symbols-outlined text-[16px]">balance</span>
                <span>Cân bằng &amp; Tôn trọng</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950">
                Môi trường minh bạch và chủ động
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Chúng tôi đánh giá dựa trên kết quả đầu ra (Output-driven), tin tưởng và trao toàn quyền để mỗi cá nhân tự làm chủ thời gian và phương pháp giải quyết vấn đề.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-6 text-slate-500 font-normal text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>Linh hoạt thời gian</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                <span>Lộ trình thăng tiến rõ ràng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
