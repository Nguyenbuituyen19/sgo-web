"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";

export default function EmailFaq() {
  const { faqs, loading, error } = useProvisionFaq("zns");

  return (
    <section className="max-w-3xl mx-auto mt-20 space-y-6">
      <h3 className="text-lg font-bold text-slate-950 text-center">
        <i className="fa-solid fa-circle-question text-amber-600 mr-2"></i>
        Câu hỏi thường gặp về Email Doanh Nghiệp
      </h3>

      {loading ? (
        <div className="text-center py-8">
          <i className="fa-solid fa-spinner fa-spin text-2xl text-amber-600"></i>
          <p className="mt-3 text-slate-500 text-xs">Đang tải câu hỏi thường gặp...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500 text-xs">{error}</div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-xs">Đang cập nhật câu hỏi thường gặp.</div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <details
              key={faq.id || idx}
              className="group bg-white border border-slate-200/60 rounded-xl p-4 cursor-pointer shadow-sm [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between font-semibold text-sm text-slate-900 list-none">
                <span>{faq.q}</span>
                <span className="text-amber-600 shrink-0">
                  <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
                </span>
              </summary>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed font-light pt-2 border-t border-slate-50">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
