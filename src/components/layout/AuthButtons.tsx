"use client";

interface AuthButtonsProps {
  mobile?: boolean;
  onLogin: (trigger: HTMLButtonElement) => void;
  onRegister: (trigger: HTMLButtonElement) => void;
}

const linkClass =
  "inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-xl border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2";

export default function AuthButtons({ mobile = false, onLogin, onRegister }: AuthButtonsProps) {
  return (
    <div className={mobile ? "grid grid-cols-2 gap-2" : "flex shrink-0 items-center gap-2"}>
      <button
        type="button"
        onClick={(event) => onLogin(event.currentTarget)}
        aria-haspopup="dialog"
        className={linkClass + " border-blue-200 bg-white text-blue-600 hover:border-blue-300 hover:bg-blue-50"}
      >
        Đăng nhập
      </button>
      <button
        type="button"
        onClick={(event) => onRegister(event.currentTarget)}
        aria-haspopup="dialog"
        className={linkClass + " border-blue-600 bg-blue-600 text-white shadow-sm hover:border-blue-700 hover:bg-blue-700"}
      >
        Đăng ký
      </button>
    </div>
  );
}
