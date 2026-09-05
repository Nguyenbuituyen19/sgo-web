export default function AboutOriginStory() {
  const steps = [
    {
      num: "01",
      numBg: "bg-red-100 text-red-700",
      title: "Bài toán thực tế",
      desc: "Đối mặt với thực trạng các doanh nghiệp phân mảnh dữ liệu, chi phí phần mềm ngoại đắt đỏ và thiếu khả năng tùy biến cục bộ.",
      tag: "Giai đoạn thử nghiệm",
      tagStyle: "text-slate-400 font-mono text-xs",
    },
    {
      num: "02",
      numBg: "bg-blue-100 text-blue-700",
      title: "Tìm kiếm lời giải",
      desc: "Đội ngũ kỹ sư nòng cốt tập trung nghiên cứu kiến trúc Lakehouse thế hệ mới, tối ưu hóa mô hình Cloud Native tương thích hạ tầng nội địa.",
      tag: "Nghiên cứu R&D",
      tagStyle: "text-slate-400 font-mono text-xs",
    },
    {
      num: "03",
      numBg: "bg-indigo-100 text-indigo-700",
      title: "SGODATA ra đời",
      desc: "Chính thức định vị thương hiệu SGODATA với hệ sinh thái quản trị dữ liệu, cung cấp giải pháp chuyển đổi số toàn diện.",
      tag: "Khởi sắc thương hiệu",
      tagStyle: "text-slate-400 font-mono text-xs",
    },
    {
      num: "04",
      numBg: "bg-purple-100 text-purple-700",
      title: "Mở rộng quy mô",
      desc: "Mở rộng hệ đối tác chiến lược và liên tục đồng hành cùng hơn hàng trăm doanh nghiệp trong các ngành tài chính, sản xuất và bán lẻ.",
      tag: "Bứt phá triển khai",
      tagStyle: "text-slate-400 font-mono text-xs",
    },
    {
      num: "05",
      numBg: "bg-blue-600 text-white",
      title: "Hướng tới tương lai",
      desc: "Phát triển các trung tâm dữ liệu AI chuyên sâu, khẳng định vị thế nhà cung cấp giải pháp hạ tầng số uy tín hàng đầu khu vực.",
      tag: "Tầm vóc mới",
      tagStyle: "text-slate-400 font-mono text-xs",
    },
  ];

  return (
    <section id="origin-story" className="w-full py-10 lg:py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 flex flex-col gap-2">
          <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
            Chặng đường định hình
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950">
            Câu chuyện của chúng tôi
          </h2>
          <p className="text-base text-slate-600 font-normal">
            Mọi hành trình đều bắt đầu từ một vấn đề cần được giải quyết.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-10 h-10 rounded-full ${step.numBg} font-bold text-sm flex items-center justify-center mb-4`}
                >
                  {step.num}
                </div>
                <h3 className="text-base font-bold text-slate-950 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className={`mt-6 pt-3 border-t border-slate-100 ${step.tagStyle}`}>
                {step.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
