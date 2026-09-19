"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";

export default function ContractFaq() {
  const { faqs, loading, error } = useProvisionFaq("hop-dong");

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Giải Đáp Câu Hỏi Thường Gặp (FAQ)
        </h2>
        <p className="text-slate-500 text-xs md:text-sm mt-2 font-light">
          Tổng hợp thắc mắc hàng đầu về tính pháp lý và vận hành hệ thống hợp đồng điện tử
        </p>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
          <p className="mt-4 text-slate-500 text-sm">Đang tải câu hỏi thường gặp...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500 text-sm">{error}</div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-10 text-slate-500 text-sm">Đang cập nhật câu hỏi thường gặp.</div>
      ) : (
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
          {faqs.map((faq, idx) => (
            <details
              key={faq.id || idx}
              className="group bg-white rounded-2xl border border-slate-200 shadow-sm p-5 cursor-pointer transition-all hover:border-blue-300 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center gap-4 font-bold text-sm text-slate-900 list-none">
                <span>{faq.q}</span>
                <span className="text-blue-600 shrink-0 bg-blue-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-blue-600 group-open:text-white transition-colors duration-200">
                  <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
                </span>
              </summary>
              <p className="mt-3 text-xs text-slate-500 leading-relaxed font-light pt-3 border-t border-slate-100">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
