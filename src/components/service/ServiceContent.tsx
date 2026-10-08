"use client";

import { useProvisionContentByCode } from "@/hooks/useProvisionContent";

interface ServiceContentProps {
  /** Code hoặc slug của provision (chính là segment trên URL). */
  code: string;
}

/**
 * Nội dung landing page của dịch vụ, lấy từ `provision_details.htmlContent`.
 *
 * Backend hiện chưa seed `provision_details` nên gần như mọi trang sẽ rơi vào
 * nhánh "đang cập nhật" — đây là trạng thái dữ liệu, không phải lỗi hiển thị.
 */
export default function ServiceContent({ code }: ServiceContentProps) {
  const { content, loading, error } = useProvisionContentByCode(code);

  if (loading) {
    return (
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="text-center py-10">
          <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-600"></i>
          <p className="mt-4 text-slate-500 text-sm">Đang tải nội dung dịch vụ...</p>
        </div>
      </section>
    );
  }

  if (error || !content?.htmlContent) {
    return (
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="text-center py-10 space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Giới Thiệu Dịch Vụ
          </h2>
          <p className="text-slate-500 text-sm font-light">
            Nội dung chi tiết đang được cập nhật. Vui lòng liên hệ để được tư vấn.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 max-w-4xl mx-auto px-4">
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
        {content.seoMetadata?.metaTitle || "Giới Thiệu Dịch Vụ"}
      </h2>
      {/* htmlContent được biên tập qua trang quản trị của SGO nên được coi là nội
          dung tin cậy; nếu sau này cho phép người ngoài nhập thì cần sanitize. */}
      <div
        className="prose prose-slate max-w-none text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content.htmlContent }}
      />
    </section>
  );
}
