export default function AboutMissionValues() {
  const coreValues = [
    {
      icon: "group",
      iconBg: "bg-blue-100 text-blue-700",
      title: "Khách hàng là trọng tâm",
      desc: "Luôn bắt đầu từ nhu cầu thực tế và hiệu quả kinh doanh của khách hàng, lấy sự thành công của đối tác làm thước đo cho chất lượng giải pháp.",
    },
    {
      icon: "lightbulb",
      iconBg: "bg-indigo-100 text-indigo-700",
      title: "Đổi mới sáng tạo",
      desc: "Liên tục nghiên cứu và ứng dụng những công nghệ tiên tiến nhất từ Lakehouse đến AI Ops, dám dấn thân tìm kiếm lối đi tối ưu hơn.",
    },
    {
      icon: "verified_user",
      iconBg: "bg-purple-100 text-purple-700",
      title: "Minh bạch & Tin cậy",
      desc: "Xây dựng mối quan hệ hợp tác dựa trên sự rõ ràng và trung thực tuyệt đối về năng lực, chi phí triển khai và cam kết bảo mật.",
    },
    {
      icon: "workspace_premium",
      iconBg: "bg-blue-50 text-blue-700",
      title: "Chất lượng vượt trội",
      desc: "Đặt chất lượng sản phẩm và độ ổn định hệ thống lên hàng đầu, thiết kế theo tiêu chuẩn công nghiệp với kiến trúc chịu tải cao.",
    },
    {
      icon: "handshake",
      iconBg: "bg-cyan-100 text-cyan-800",
      title: "Đồng hành dài lâu",
      desc: "Không chỉ là đơn vị gia công dịch vụ, SGODATA định vị là đối tác chiến lược lâu dài, sẵn sàng hỗ trợ bảo trợ kỹ thuật toàn chu kỳ.",
    },
    {
      icon: "auto_stories",
      iconBg: "bg-slate-100 text-slate-800",
      title: "Học hỏi không ngừng",
      desc: "Nâng cao năng lực chuyên môn không ngừng, thấu hiểu bài toán thị trường biến đổi để liên tục nâng cấp hệ sinh thái sản phẩm.",
    },
  ];

  return (
    <>
      {/* 5. MISSION & VISION */}
      <section className="w-full py-10 lg:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Sứ mệnh cốt lõi
                </span>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-slate-950">
                  Đơn giản hóa công nghệ vì giá trị thực tế
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Ứng dụng công nghệ để tạo ra những giải pháp đơn giản, hiệu quả và có giá trị thực tế cho doanh nghiệp, loại bỏ rào cản kỹ thuật để tổ chức tập trung vào tăng trưởng cốt lõi.
                </p>
              </div>
              <div className="flex items-center gap-2 text-blue-600 text-sm font-medium pt-2">
                <span>Thực thi chuẩn xác</span>
                <span className="material-symbols-outlined text-[18px]">trending_flat</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/60 border border-indigo-100 shadow-xs flex flex-col justify-between gap-6 relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Tầm nhìn chiến lược
                </span>
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">visibility</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-slate-950">
                  Đối tác công nghệ tin cậy hàng đầu
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Trở thành đối tác công nghệ đáng tin cậy, đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số toàn diện, kiến tạo tiêu chuẩn hạ tầng đám mây và dữ liệu tiêu chuẩn khu vực.
                </p>
              </div>
              <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium pt-2">
                <span>Bền vững &amp; Tiên phong</span>
                <span className="material-symbols-outlined text-[18px]">trending_flat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORE VALUES */}
      <section className="w-full py-10 lg:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
              Văn hóa &amp; Nguyên tắc
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 mt-1">
              Giá trị chúng tôi theo đuổi
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Những kim chỉ nam định hình mọi quyết định kỹ thuật, quy trình phát triển sản phẩm và văn hóa dịch vụ tại SGODATA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-3"
              >
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
