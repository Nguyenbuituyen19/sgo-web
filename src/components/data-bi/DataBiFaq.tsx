"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";

export default function DataBiFaq() {
  const { faqs, loading, error } = useProvisionFaq("erp");

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            GIẢI ĐÁP THẮC MẮC
          </span>
          <h2 className="text-3xl font-bold text-slate-900">Câu Hỏi Thường Gặp</h2>
          <p className="text-slate-600 text-xs md:text-sm font-light">
            Những thắc mắc phổ biến của doanh nghiệp khi bắt đầu chuẩn hóa hạ tầng dữ liệu và ứng dụng BI.
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
                className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm cursor-pointer transition-all hover:border-indigo-300 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex justify-between items-center font-bold text-slate-900 text-sm md:text-base list-none">
                  <span>{faq.q}</span>
                  <span className="text-indigo-600 shrink-0 bg-indigo-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-indigo-600 group-open:text-white transition-colors duration-200">
                    <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
                  </span>
                </summary>
                <p className="mt-3 text-xs md:text-sm text-slate-600 leading-relaxed font-light pt-3 border-t border-slate-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
