"use client";

import { useState, useMemo } from "react";
import { useProvisions } from "@/hooks/useProvisions";
import { useMultipleContents } from "@/hooks/useProvisionContent";

interface ApiFaqItem {
  id: string;
  provisionCode: string;
  category: string;
  categoryLabel: string;
  question: string;
  answer: string;
  displayOrder?: number;
}

/**
 * Mapping từ provision code sang category hiển thị trong trang FAQ
 */
const CATEGORY_MAP: Record<string, { category: string; label: string }> = {
  web: { category: "solutions", label: "Website & VR360 / QR" },
  vr360: { category: "solutions", label: "Website & VR360 / QR" },
  "qr-code": { category: "solutions", label: "Website & VR360 / QR" },
  erp: { category: "erp", label: "CRM / ERP & POS" },
  pos: { category: "erp", label: "CRM / ERP & POS" },
  zns: { category: "solutions", label: "Chăm sóc khách hàng" },
  "truy-xuat": { category: "solutions", label: "Truy xuất nguồn gốc" },
  "hop-dong": { category: "payment", label: "Hợp đồng điện tử" },
  "ha-tang": { category: "cloud", label: "Hạ tầng & Cloud Server" },
  contact: { category: "payment", label: "Liên hệ & Hỗ trợ" },
};

export default function FaqApiContainer({ searchTerm }: { searchTerm: string }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Lấy danh sách tất cả provisions
  const { provisions, loading: provisionsLoading } = useProvisions();

  // Lấy FAQs từ tất cả provisions
  const provisionIds = useMemo(
    () => provisions.map((p) => p.id),
    [provisions]
  );

  const { contents, loading: contentsLoading } = useMultipleContents(provisionIds, 5);

  // Chuyển đổi FAQs từ API thành format hiển thị
  const apiFaqs: ApiFaqItem[] = useMemo(() => {
    const faqs: ApiFaqItem[] = [];

    provisions.forEach((provision) => {
      const content = contents.get(provision.id);
      if (!content?.faqs) return;

      const categoryInfo = CATEGORY_MAP[provision.code.toLowerCase()] || {
        category: "solutions",
        label: provision.name,
      };

      content.faqs.forEach((faq) => {
        faqs.push({
          id: faq.id || `${provision.code}-${faq.q}`,
          provisionCode: provision.code,
          category: categoryInfo.category,
          categoryLabel: categoryInfo.label,
          question: faq.q,
          answer: faq.a,
          displayOrder: faq.displayOrder,
        });
      });
    });

    return faqs.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, [provisions, contents]);

  // Danh mục dựa trên FAQs thực tế từ API
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    apiFaqs.forEach((faq) => categorySet.add(faq.category));

    const allCategories = [
      { id: "all", label: "Tất cả câu hỏi", icon: "fa-solid fa-list-check" },
    ];

    const categoryIcons: Record<string, string> = {
      cloud: "fa-solid fa-server",
      erp: "fa-solid fa-chart-pie",
      solutions: "fa-solid fa-laptop-code",
      payment: "fa-solid fa-credit-card",
    };

    categorySet.forEach((cat) => {
      allCategories.push({
        id: cat,
        label: apiFaqs.find((f) => f.category === cat)?.categoryLabel || cat,
        icon: categoryIcons[cat] || "fa-solid fa-folder",
      });
    });

    return allCategories;
  }, [apiFaqs]);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return apiFaqs.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchTerm.trim() === "" ||
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [apiFaqs, activeCategory, searchTerm]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const loading = provisionsLoading || contentsLoading;

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-20">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-indigo-600"></i>
          <p className="mt-4 text-slate-500 text-sm">Đang tải câu hỏi thường gặp...</p>
        </div>
      </section>
    );
  }

  if (filteredFaqs.length === 0 && apiFaqs.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-20 space-y-4">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-2xl mx-auto">
            <i className="fa-solid fa-circle-info font-bold"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-900">Chưa có câu hỏi nào</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            Backend chưa cung cấp dữ liệu FAQ. Vui lòng liên hệ quản trị viên để seed dữ liệu.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CATEGORY FILTER */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm top-24 space-y-6 sticky">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
              <i className="fa-solid fa-filter text-indigo-600 mr-1.5"></i> Danh mục chủ đề
            </span>
            <div className="space-y-1">
              {categories.map((cat) => {
                const count = filteredFaqs.filter(
                  (f) => cat.id === "all" || f.category === cat.id
                ).length;
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
                      <i
                        className={`${cat.icon} text-sm ${
                          activeCategory === cat.id ? "text-white" : "text-indigo-600"
                        }`}
                      ></i>
                      <span>{cat.label}</span>
                    </div>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        activeCategory === cat.id
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FAQ LIST */}
        <div id="faq-list" className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
              Hiển thị: <strong className="text-slate-900 font-extrabold">{filteredFaqs.length}</strong>{" "}
              câu hỏi phù hợp
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
                Rất tiếc từ khóa &quot;{searchTerm}&quot; chưa có câu hỏi tương ứng. Vui lòng gửi trực tiếp câu hỏi cho chuyên viên hỗ trợ!
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = !!openItems[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                    isOpen
                      ? "border-indigo-600/40 ring-1 ring-indigo-600/20"
                      : "border-slate-200/80 hover:border-slate-300"
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
                        isOpen
                          ? "bg-indigo-600 text-white rotate-180"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                      <p>{faq.answer}</p>
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
