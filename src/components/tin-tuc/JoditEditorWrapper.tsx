"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "jodit/es2021/jodit.min.css";

const Jodit = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="h-80 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-500 text-sm">
      <span>⏳ Đang tải trình soạn thảo văn bản...</span>
    </div>
  ),
});

interface JoditEditorWrapperProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number | string;
  disabled?: boolean;
}

export default function JoditEditorWrapper({
  value,
  onChange,
  placeholder = "Nhập nội dung bài viết chi tiết tại đây...",
  height = 380,
  disabled = false,
}: JoditEditorWrapperProps) {
  const editorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const config = useMemo(() => {
    return {
      readonly: disabled,
      placeholder: placeholder,
      height: typeof height === "number" ? height : 380,
      minHeight: 250,
      toolbarButtonSize: "middle" as const,
      toolbarAdaptive: false,
      zIndex: 99999,
      theme: "default",
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: true,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      defaultActionOnPaste: "insert_as_html",
      buttons: [
        "source",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "superscript",
        "subscript",
        "eraser",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "ul",
        "ol",
        "outdent",
        "indent",
        "|",
        "align",
        "lineHeight",
        "|",
        "image",
        "video",
        "table",
        "link",
        "hr",
        "symbol",
        "|",
        "undo",
        "redo",
        "|",
        "find",
        "preview",
        "print",
        "fullsize",
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
    };
  }, [disabled, placeholder, height]);

  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url && editorRef.current) {
        const joditInstance = editorRef.current;
        if (typeof joditInstance.selection?.insertImage === "function") {
          joditInstance.selection.insertImage(base64Url);
        } else if (typeof joditInstance.s?.insertImage === "function") {
          joditInstance.s.insertImage(base64Url);
        } else {
          const imgTag = `<p><img src="${base64Url}" alt="${file.name}" style="max-width: 100%; height: auto;" /></p>`;
          const currentContent = joditInstance.value || value || "";
          onChange(currentContent + imgTag);
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  if (!isClient) {
    return (
      <div className="h-80 bg-slate-50 border border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-500 text-sm">
        <span>⏳ Đang khởi tạo trình soạn thảo...</span>
      </div>
    );
  }

  return (
    <div
      className="w-full relative"
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <Jodit
        ref={editorRef}
        value={value}
        config={config as any}
        onChange={(newContent: string) => onChange(newContent)}
        onBlur={(newContent: string) => onChange(newContent)}
      />

      <div className="mt-2 flex items-center gap-2.5">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleTriggerUpload}
          className="px-3 py-1.5 border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors cursor-pointer"
          title="Tải ảnh từ máy tính và chèn vào bài viết"
        >
          📁 Upload
        </button>
        <span className="text-[11px] text-slate-500">
          (Chọn file ảnh để chèn vào vị trí con trỏ trong bài viết hoặc kéo thả ảnh trực tiếp)
        </span>
      </div>
    </div>
  );
}
