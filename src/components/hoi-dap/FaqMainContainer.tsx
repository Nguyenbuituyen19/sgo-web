"use client";

import { useState } from "react";

export interface FaqItem {
  id: string;
  category: "cloud" | "erp" | "license" | "solutions" | "payment";
  categoryLabel: string;
  question: string;
  answer: string;
  usefulNote?: string;
}

export default function FaqMainContainer({ searchTerm }: { searchTerm: string }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ "faq-1": true });

  const categories = [
    { id: "all", label: "Tất cả câu hỏi", icon: "fa-solid fa-list-check" },
    { id: "cloud", label: "Hạ tầng & Cloud Server", icon: "fa-solid fa-server" },
    { id: "erp", label: "CRM / ERP & POS", icon: "fa-solid fa-chart-pie" },
    { id: "license", label: "Bản quyền phần mềm", icon: "fa-solid fa-key" },
    { id: "solutions", label: "Website & VR360 / QR", icon: "fa-solid fa-laptop-code" },
    { id: "payment", label: "Thanh toán & Bảo hành", icon: "fa-solid fa-credit-card" },
  ];

  const faqData: FaqItem[] = [
    // CLOUD & HOSTING
    {
      id: "faq-1",
      category: "cloud",
      categoryLabel: "Hạ tầng & Cloud Server",
      question: "Cloud Server tại SGO Việt Nam sử dụng hạ tầng ảo hóa gì? Có cam kết Uptime không?",
      answer:
        "SGO Cloud Server hoạt động trên nền tảng ảo hóa toàn phần KVM tiên tiến nhất hiện nay, cam kết 100% tài nguyên CPU, RAM và SSD NVMe được cấp phát độc lập. Chúng tôi cam kết chỉ số Uptime 99.99% bằng hợp đồng SLA rõ ràng với hệ thống tự động dự phòng Cluster.",
      usefulNote: "Hệ thống hỗ trợ khởi tạo tự động trong 30 giây và Hot-resize nâng cấp dung lượng trong 3 phút.",
    },
    {
      id: "faq-2",
      category: "cloud",
      categoryLabel: "Hạ tầng & Cloud Server",
      question: "Dữ liệu trên Cloud Server và Hosting có được sao lưu (Backup) tự động không?",
      answer:
        "Có. Toàn bộ hệ thống máy chủ Cloud và Hosting tại SGO đều được cài đặt cơ chế tự động sao lưu Snapshot/Backup định kỳ mỗi tuần 1 lần. Khách hàng cũng có thể chủ động tạo Snapshot tức thì qua Control Panel bất cứ lúc nào.",
    },
    {
      id: "faq-3",
      category: "cloud",
      categoryLabel: "Hạ tầng & Cloud Server",
      question: "SGO có hỗ trợ di chuyển (Migrate) dữ liệu từ nhà cung cấp cũ về không?",
      answer:
        "Hoàn toàn miễn phí. Đội ngũ kỹ sư hạ tầng của SGO Việt Nam hỗ trợ trọn gói việc chuyển đổi toàn bộ mã nguồn Website, Database và cấu hình Email Doanh nghiệp từ nhà cung cấp cũ về máy chủ mới mà không làm gián đoạn truy cập.",
    },

    // CRM / ERP & POS
    {
      id: "faq-4",
      category: "erp",
      categoryLabel: "CRM / ERP & POS",
      question: "Hệ thống CRM / ERP của SGO có thể tùy chỉnh (Customize) theo ngành nghề đặc thù không?",
      answer:
        "Có. Hệ thống CRM / ERP SGO được xây dựng theo mô hình Module hóa linh hoạt. Chúng tôi có đội ngũ lập trình viên khảo sát bài toán thực tế của doanh nghiệp để may đo thêm các phân hệ kế toán, kho bãi, nhân sự, bán hàng phù hợp 100% với quy trình vận hành.",
    },
    {
      id: "faq-5",
      category: "erp",
      categoryLabel: "CRM / ERP & POS",
      question: "Phần mềm bán hàng POS có hoạt động ổn định khi mất kết nối Internet không?",
      answer:
        "Có. Phần mềm POS SGO tích hợp chế độ Offline Mode thông minh. Khi mất mạng Internet, cửa hàng vẫn thu tiền, in hóa đơn bình thường. Dữ liệu sẽ tự động đồng bộ lên mây ngay khi có kết nối trở lại.",
    },

    // BẢN QUYỀN KEY
    {
      id: "faq-6",
      category: "license",
      categoryLabel: "Bản quyền phần mềm",
      question: "Key bản quyền Windows, Office tại sgodata.com là loại gì? Có bị mất khi Reinstall Win?",
      answer:
        "Tất cả sản phẩm key tại SGO là bản quyền chính hãng chuẩn Digital/Retail/MAK kích hoạt trực tiếp từ Server Microsoft. Đối với key Retail và Office liên kết tài khoản MS, bạn hoàn toàn tái sử dụng khi cài lại Win hoặc thay ổ cứng.",
      usefulNote: "SGO cam kết bảo hành 1 đổi 1 suốt quá trình sử dụng và hỗ trợ kích hoạt tận nơi qua UltraViewer/AnyDesk.",
    },
    {
      id: "faq-7",
      category: "license",
      categoryLabel: "Bản quyền phần mềm",
      question: "Sau khi thanh toán thì bao lâu tôi nhận được mã key bản quyền?",
      answer:
        "Thời gian xử lý tự động giao key diễn ra chỉ từ 3 đến 5 phút. Mã kích hoạt cùng hướng dẫn từng bước sẽ được gửi qua Email / Zalo của quý khách lập tức.",
    },

    // WEBSITES & VR360 / QR
    {
      id: "faq-8",
      category: "solutions",
      categoryLabel: "Website & VR360 / QR",
      question: "Dịch vụ thiết kế Website tại SGO có bàn giao trọn gói mã nguồn (Source Code) không?",
      answer:
        "Có. SGO bàn giao đầy đủ 100% mã nguồn và quyền quản trị cao nhất (Admin/Root). Website được thiết kế chuẩn SEO, bảo mật chống tấn công SQL Injection/XSS và tương thích hoàn hảo mọi thiết bị di động.",
    },
    {
      id: "faq-9",
      category: "solutions",
      categoryLabel: "Website & VR360 / QR",
      question: "Giải pháp VR360 Thực tế ảo phù hợp với những lĩnh vực kinh doanh nào?",
      answer:
        "VR360 cực kỳ hiệu quả cho Khách sạn, Resort, Đô thị Bất động sản, Khu du lịch, Trường học, Showroom ô tô và Nhà hàng. Khách hàng có thể trải nghiệm không gian 3D tương tác sa bàn ảo trực tiếp ngay trên trình duyệt điện thoại.",
    },

    // THANH TOÁN & BẢO HÀNH
    {
      id: "faq-10",
      category: "payment",
      categoryLabel: "Thanh toán & Bảo hành",
      question: "SGO hỗ trợ những hình thức thanh toán nào? Có xuất hóa đơn VAT không?",
      answer:
        "Chúng tôi hỗ trợ chuyển khoản ngân hàng (QR VietQR tự động gạch nợ), Ví MoMo, ZaloPay, Thẻ ATM/Visa/MasterCard. SGO Việt Nam hỗ trợ xuất hóa đơn điện tử (VAT) hợp pháp đầy đủ cho mọi đơn hàng doanh nghiệp.",
    },
    {
      id: "faq-11",
      category: "payment",
      categoryLabel: "Thanh toán & Bảo hành",
      question: "Chính sách dùng thử và hoàn tiền tại SGO Việt Nam như thế nào?",
      answer:
        "SGO Việt Nam áp dụng chính sách dùng thử miễn phí đối với một số dịch vụ Cloud Server / Hosting và bảo hành hoàn tiền 100% trong vòng 7 ngày nếu dịch vụ phát sinh lỗi hạ tầng từ phía nhà cung cấp mà không được khắc phục.",
    },
  ];

  // Filter items based on activeCategory and searchTerm
  const filteredFaqs = faqData.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      searchTerm.trim() === "" ||
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CATEGORY SEGMENTATION & TABLE OF CONTENTS */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm top-24 space-y-6">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
              <i className="fa-solid fa-filter text-indigo-600 mr-1.5"></i> Danh mục chủ đề
            </span>
            <div className="space-y-1">
              {categories.map((cat) => {
                const count = faqData.filter((f) => cat.id === "all" || f.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <i className={`${cat.icon} text-sm ${activeCategory === cat.id ? "text-white" : "text-indigo-600"}`}></i>
                      <span>{cat.label}</span>
                    </div>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        activeCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table of contents quick anchor index */}
          <div className="pt-4 border-t border-slate-100 hidden md:block">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              <i className="fa-solid fa-list-ol text-indigo-600 mr-1.5"></i> Chỉ mục tìm kiếm nhanh
            </span>
            <ul className="space-y-1.5 text-xs text-slate-500 font-light">
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-chevron-right text-[9px] text-indigo-500"></i>
                <a href="#faq-list" className="hover:text-indigo-600">Danh sách câu hỏi ({filteredFaqs.length})</a>
              </li>
              <li className="flex items-center gap-2">
                <i className="fa-solid fa-chevron-right text-[9px] text-indigo-500"></i>
                <a href="#contact-support" className="hover:text-indigo-600">Liên hệ trực tiếp hỗ trợ 24/7</a>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: ACCORDION LIST OF QUESTIONS */}
        <div id="faq-list" className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Hiển thị: <strong className="text-slate-900 font-extrabold">{filteredFaqs.length}</strong> câu hỏi phù hợp
            </span>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer"
              >
                Xóa bộ lọc danh mục &times;
              </button>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-2xl mx-auto">
                <i className="fa-solid fa-magnifying-glass font-bold"></i>
              </div>
              <h3 className="text-lg font-bold text-slate-900">Không tìm thấy câu hỏi phù hợp</h3>
              <p className="text-slate-500 text-xs font-light max-w-md mx-auto">
                Rất tiếc từ khóa &quot;{searchTerm}&quot; chưa có câu hỏi tương ứng trong hệ thống. Vui lòng gửi trực tiếp câu hỏi cho chuyên viên hỗ trợ bên dưới!
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                    isOpen ? "border-indigo-600/40 ring-1 ring-indigo-600/20" : "border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {faq.categoryLabel}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs transition-transform duration-200 ${
                        isOpen ? "bg-indigo-600 text-white rotate-180" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                      <p>{faq.answer}</p>
                      {faq.usefulNote && (
                        <div className="bg-indigo-50/80 border-l-4 border-indigo-600 p-3 rounded-r-xl text-xs text-indigo-900 font-normal">
                          <i className="fa-solid fa-lightbulb text-amber-500 mr-1.5"></i>
                          {faq.usefulNote}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
