export default function AboutTeam() {
  const leaders = [
    {
      name: "Nguyễn Thanh Tuấn",
      role: "Founder & CEO",
      roleBg: "text-blue-600 font-semibold",
      desc: "15+ năm kinh nghiệm quản trị chiến lược số và phát triển hạ tầng dữ liệu quy mô lớn.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBP06i0iYIf0nga5W57GxXIiV13Ey3jJlmMH0psD4vzZtsLOJ5JQ7ucP4eptk8h2RgWDBWEkAAJwnAbJ5hW-ztgS_yxLTPX6Ly4X9Hw3qntjugrdXgkVerVXgF54E43NvYUMKEii3uRpMyn-BpesQ2LD63sejjjmuKs5IyOwWyYb9l_eqmP5cme8GTa2n-NGXYGezTTijfHT8Uvxal0fz1BigtZQHBlLVAfTC8JFAWlqxyBP95ovybFSg",
      alt: "Nguyen Thanh Tuan Founder & CEO SGODATA",
    },
    {
      name: "Trần Hoàng Long",
      role: "Chief Technology Officer (CTO)",
      roleBg: "text-indigo-600 font-semibold",
      desc: "Chuyên gia cấp cao về Cloud Native, kiến trúc vi dịch vụ và điện toán hiệu năng cao.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAAUt0qojP4250JGR0p3Nnfw2zNHOSwB9qnw-GM_Yxsm0Rp-vcTOhGbw0b3Q_cSx8E5gOcqHyc5RCdbXZgF01b96SVgkW-HMrXrlG5E0YEiYt5exXnSJs_n9z69YEUd2Oi0kWq1GLDBDMuhVfG31efBbq9tLMBcZVt91OYen1Obmm-tolpJPJrWJ6B3Rabt1Lle9KpWAm4qHIUr-gSM611c1cNvFkYBGBn3lPWITpVs0Y256etb5jofcg",
      alt: "Tran Hoang Long CTO SGODATA",
    },
    {
      name: "Lê Thuỳ Linh",
      role: "Head of Data Engineering",
      roleBg: "text-purple-600 font-semibold",
      desc: "Từng dẫn dắt hàng chục dự án Data Warehouse phân tán cho các ngân hàng và fintech hàng đầu.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBSJFCqzgCKFra2tzxxfXTrgEyNej1ASlahfn77890GYz3UaBLDYA88YSKNyEJV0OnAckE7M5_z5H6EfqL417ZFu31kgUY9zx0i_DsD7MZ-w_jMQYlupKvVTZ4uISyq1SC3Cv-SLGOb7POmz7YlFB_30d-NgJMrm4sZLtq5-oqTWECfx_RXlsYK8LFw4CC3z7wULz3klg_Vq5hDwFNsKpiMEfe1IJ-9ZuvQlaNL3nDhEmYbuDz5MF5ZKg",
      alt: "Le Thuy Linh Head of Data Engineering SGODATA",
    },
    {
      name: "Phạm Minh Đức",
      role: "Product Lead",
      roleBg: "text-sky-600 font-semibold",
      desc: "Chuyên môn sâu về tối ưu trải nghiệm người dùng kỹ thuật và kiến trúc sản phẩm SaaS B2B.",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAE7n0W3EGeQiAZy1-IO13GRxVuyoj9CnJ8ZRIQkefrMz8C84fiUdGX-svbl_6DsvxAHrDYRFh8M8rq0XCnYMWieFqD8quvN27RfNk2hGKdG1pBHwgfUIfxkSzRc8_KtYwLdRnAAJu6jhX1VtXUTgMn1q_djR0RyBeS-9GJh3LXWMt0p0c5t5c893l0P8yR5HLngc2y0gSO_0B0MIMZYpkQV4hAiNAS9efdaeWXgcTxIUPHnnti4hqL5A",
      alt: "Pham Minh Duc Product Lead SGODATA",
    },
  ];

  return (
    <section id="team" className="w-full py-16 lg:py-24 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Nhân lực chất lượng cao
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 mt-1">
            Đội ngũ SGODATA
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Đằng sau mỗi giải pháp bền vững là những kỹ sư, chuyên gia dữ liệu và kiến trúc sư hệ thống giàu tâm huyết.
          </p>
        </div>

        {/* 4 Core Leaders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all group flex flex-col"
            >
              <div className="w-full h-64 overflow-hidden bg-slate-200">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={leader.image}
                  alt={leader.alt}
                />
              </div>
              <div className="p-5 flex flex-col gap-1 flex-1">
                <div className="text-base font-bold text-slate-950">
                  {leader.name}
                </div>
                <div className={`text-xs ${leader.roleBg}`}>
                  {leader.role}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {leader.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Large Teamwork Culture Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-md border border-slate-200/60">
          <img
            className="w-full h-80 object-cover"
            alt="Collaborative teamwork culture at SGODATA"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX_kQWoLa0XbbPH-wk3zVDguD0gNPtSSQFEMcxTJAzq5hahla77CDz2u9Z0VWO6I01rOmOgm9In_MRgDV3Xn9zONvQkF0ukRS7U_UZyh1JnHF5ggbKbOd9JczQ414rOejEz_ATa5t_Wh5m-xOsdvJSyD0c3-GOrIUTY9afwItL2xMt9jj5QsoszfA8Hm3xMnfLg4zsc2vY8kJnrbkOnNpumMnMzJmCHznNUpRQQJbe0m3l3QtHosnybw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-transparent flex items-center p-8 sm:p-12">
            <div className="max-w-md text-white flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-sky-400 font-semibold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">diversity_3</span>
                <span>Tinh thần SGODATA</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Cùng nhau xây dựng những giải pháp công nghệ có giá trị thực tế
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Chúng tôi nuôi dưỡng môi trường tôn trọng sự khác biệt, khích lệ tranh luận kỹ thuật đa chiều để tìm ra phương án tối ưu nhất cho khách hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
