"use client";

import { useProvisionFaq } from "@/hooks/useProvisionFaq";

export default function VrFaq() {
  const { faqs, loading, error } = useProvisionFaq("vr360");

  return (
    <section className="max-w-4xl mx-auto px-4 pb-20 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900">Giải Đáp Thắc Mắc</h3>
        <p className="text-slate-500 text-xs font-light">
          Những câu hỏi phổ biến từ các chủ doanh nghiệp khi triển khai Tour thực tế ảo VR360.
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
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={faq.id || idx}
              className="group bg-white border border-slate-200/60 rounded-2xl p-5 cursor-pointer shadow-xs [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between gap-4 font-semibold text-slate-900 list-none text-sm md:text-base">
                <span>{faq.q}</span>
                <span className="text-blue-600 shrink-0 bg-blue-50 w-7 h-7 flex items-center justify-center rounded-lg group-open:bg-blue-600 group-open:text-white transition-colors duration-200">
                  <i className="fa-solid fa-chevron-down text-xs transition-transform duration-200"></i>
                </span>
              </summary>
              <p className="mt-3 text-slate-500 text-xs md:text-sm leading-relaxed font-light pt-3 border-t border-slate-100">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
