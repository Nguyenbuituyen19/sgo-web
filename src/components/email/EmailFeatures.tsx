export default function EmailFeatures() {
  const features = [
    {
      icon: "fa-solid fa-shield-halved",
      title: "Bảo Mật & Xác Thực Cao",
      desc: "Hỗ trợ đầy đủ các bản ghi định danh chống giả mạo danh tính: SPF, DKIM, DMARC nghiêm ngặt theo chuẩn quốc tế.",
    },
    {
      icon: "fa-solid fa-filter-circle-xmark",
      title: "Bộ Lọc Spam Đa Tầng",
      desc: "Ứng dụng AI thông minh quét và ngăn chặn tự động các email độc hại, mã độc ransomware, thư rác gửi đến hòm thư nội bộ.",
    },
    {
      icon: "fa-solid fa-paper-plane",
      title: "Tỷ Lệ Vào Inbox 99%",
      desc: "Sử dụng dải IP sạch độc lập, được nuôi dưỡng và giám sát liên tục giúp email giao dịch khách hàng luôn đến đúng đích.",
    },
    {
      icon: "fa-solid fa-laptop",
      title: "Đồng Bộ Đa Thiết Bị",
      desc: "Giao diện Webmail mượt mà, hỗ trợ kết nối đồng bộ hoàn hảo qua Outlook, Thunderbird, Apple Mail, điện thoại iOS/Android.",
    },
  ];

  return (
    <section id="features" className="mb-24">
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Tại Sao Doanh Nghiệp Phải Dùng Email Riêng?
        </h2>
        <p className="text-slate-500 text-sm font-light">
          Giải quyết triệt để các vấn đề rớt hạng uy tín do dùng email cá nhân (Gmail, Yahoo) hoặc hệ thống email kém chất lượng bị đưa vào danh sách đen (Blacklist).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="feature-card bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-3 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-lg shadow-inner">
              <i className={item.icon}></i>
            </div>
            <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
