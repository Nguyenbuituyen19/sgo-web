"use client";

import { useState } from "react";

export default function ShareArticleButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback cho trình duyệt cũ
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-600">Chia sẻ:</span>
      <button
        type="button"
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer text-xs ${
          copied
            ? "bg-emerald-600 text-white shadow-xs"
            : "bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600"
        }`}
        title={copied ? "Đã sao chép liên kết!" : "Sao chép liên kết"}
        onClick={handleCopy}
      >
        <span className="material-symbols-outlined text-[16px]">
          {copied ? "check" : "share"}
        </span>
      </button>
      {copied && (
        <span className="text-[11px] font-medium text-emerald-600 animate-fade-in">
          Đã sao chép liên kết!
        </span>
      )}
    </div>
  );
}
