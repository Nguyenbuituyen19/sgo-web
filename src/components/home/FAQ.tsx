"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";

export default function FAQ() {
  const { faqs, loading, error } = useProvisionFaq("contact");

  return (
    <section id="ho-tro" className="max-w-4xl mx-auto space-y-8 mb-8">
      <div className="text-center space-y-3">
        <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">
          Hỗ trợ khách hàng
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Câu Hỏi Thường Gặp
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed font-light">
          Tổng hợp những thắc mắc phổ biến của các chủ doanh nghiệp khi tìm hiểu
          và ứng dụng hệ sinh thái số của SGO Việt Nam.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-600"></i>
          <p className="mt-4 text-slate-500 text-sm">Đang tải câu hỏi thường gặp...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500 text-sm">{error}</div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-10 text-slate-500 text-sm">Đang cập nhật câu hỏi thường gặp.</div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={faq.id || idx}
              className="group bg-white border border-slate-200/60 rounded-2xl p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm"
            >
              <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-base">
                <span>{faq.q}</span>
                <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
                  <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
                </span>
              </summary>
              <p className="mt-3 text-slate-500 text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
