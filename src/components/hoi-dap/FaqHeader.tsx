import Link from "next/link";

interface FaqHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function FaqHeader({ searchTerm, setSearchTerm }: FaqHeaderProps) {
  return (
    <section className="bg-gradient-to-r min-h-[600px] from-slate-900 via-indigo-950 to-blue-950 text-white py-12 lg:py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-300">
          <i className="fa-solid fa-circle-question text-indigo-400"></i> Trung tâm Hỗ trợ &amp; Hỏi Đáp Q&amp;A
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white">
          Giải Đáp Mọi Thắc Mắc Về Giải Pháp <span className="text-indigo-400">SGO</span>
        </h1>

        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Tìm kiếm nhanh thông tin phản hồi chính xác về dịch vụ Website, Cloud Server, ERP, Bản quyền phần mềm, QR Code và các giải pháp số hóa doanh nghiệp.
        </p>

        {/* Realtime Search Functionality */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <i className="fa-solid fa-magnifying-glass absolute left-4 text-slate-400 text-base"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập từ khóa tìm kiếm (ví dụ: Cloud Server, Bảo hành, Thanh toán, Domain, ERP...)"
              className="w-full pl-12 pr-10 py-4 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/30 shadow-2xl transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-100 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            )}
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400 font-light">
            <span>Gợi ý tìm kiếm phổ biến:</span>
            <button
              onClick={() => setSearchTerm("Cloud Server")}
              className="underline hover:text-indigo-300 cursor-pointer"
            >
              Cloud Server
            </button>
            <span>•</span>
            <button
              onClick={() => setSearchTerm("bản quyền")}
              className="underline hover:text-indigo-300 cursor-pointer"
            >
              Bản quyền Win/Office
            </button>
            <span>•</span>
            <button
              onClick={() => setSearchTerm("ERP")}
              className="underline hover:text-indigo-300 cursor-pointer"
            >
              ERP
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
