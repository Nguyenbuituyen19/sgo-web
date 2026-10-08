"use client";

import { useEffect, useId, useRef, type MouseEvent, type ReactNode, type RefObject } from "react";

interface AuthDialogProps {
  title: string;
  onClose: () => void;
  initialFocusRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}

export default function AuthDialog({ title, onClose, initialFocusRef, children }: AuthDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    initialFocusRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [initialFocusRef]);

  const close = () => dialogRef.current?.close();

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-slate-100 bg-white p-6 text-slate-800 shadow-2xl backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 id={titleId} className="text-2xl font-bold text-slate-900">{title}</h2>
        <button
          type="button"
          onClick={close}
          aria-label={`Đóng popup ${title.toLowerCase()}`}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5" aria-hidden="true">
            <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      {children}
    </dialog>
  );
}
