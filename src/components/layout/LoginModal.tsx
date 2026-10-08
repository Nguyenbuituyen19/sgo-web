"use client";

import { useRef, useState, type FormEvent } from "react";
import { authApi, type AuthLoginData, type AuthUser } from "@/shared/auth";
import { getEmailError, getPasswordError } from "@/shared/auth-validation";
import AuthDialog from "./AuthDialog";

interface LoginModalProps {
  onClose: () => void;
  onAuthenticated: (user: AuthUser) => void;
  onRegister: () => void;
  initialEmail?: string;
  initialMessage?: string;
  initialMfa?: AuthLoginData;
}

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50";

function getInputClass(error?: string) {
  return inputClass + (error
    ? " border-red-500 focus:border-red-500 focus:ring-red-100"
    : " border-slate-200 focus:border-blue-500 focus:ring-blue-100");
}

export default function LoginModal({ onClose, onAuthenticated, onRegister, initialEmail, initialMessage, initialMfa }: LoginModalProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [mfa, setMfa] = useState<AuthLoginData | null>(initialMfa ?? null);
  const [errors, setErrors] = useState<{ email?: string; password?: string; code?: string }>({});
  const [message, setMessage] = useState<string | null>(initialMessage ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const acceptLogin = (data: AuthLoginData) => {
    if (data.mfaRequired && data.challengeId) {
      if (passwordRef.current) passwordRef.current.value = "";
      setMfa(data);
      setErrors({});
      setMessage(null);
    } else if (!data.mfaRequired && data.user) {
      onAuthenticated(data.user);
    } else {
      setMessage("Không thể đăng nhập lúc này. Vui lòng thử lại.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setMessage(null);

    if (mfa) {
      const code = codeRef.current?.value.trim() ?? "";
      if (!/^[A-Za-z0-9]{6,12}$/.test(code)) {
        setErrors({ code: "Vui lòng nhập mã xác thực hoặc mã khôi phục gồm 6–12 ký tự chữ hoặc số." });
        codeRef.current?.focus();
        return;
      }
      setErrors({});
      setIsSubmitting(true);
      try {
        const response = await authApi.verifyMfa({ challengeId: mfa.challengeId ?? "", code });
        if (response.success && response.data) acceptLogin(response.data);
        else setMessage(response.message ?? "Mã xác thực không hợp lệ hoặc đã hết hạn.");
      } catch {
        setMessage("Không thể kết nối máy chủ. Vui lòng thử lại.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const email = emailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";
    const emailError = getEmailError(email);
    const passwordError = isForgotPassword ? undefined : getPasswordError(password);
    setErrors({ email: emailError, password: passwordError });
    if (emailError) { emailRef.current?.focus(); return; }
    if (passwordError) { passwordRef.current?.focus(); return; }

    if (isForgotPassword) {
      setMessage("Khôi phục mật khẩu hiện chưa khả dụng. Vui lòng liên hệ SGO để được hỗ trợ.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authApi.login({ email, password });
      if (response.success && response.data) acceptLogin(response.data);
      else setMessage(response.message ?? "Không thể đăng nhập. Vui lòng kiểm tra thông tin.");
    } catch {
      setMessage("Không thể kết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchForm = (forgotPassword: boolean) => {
    if (passwordRef.current) passwordRef.current.value = "";
    setIsForgotPassword(forgotPassword);
    setMfa(null);
    setErrors({});
    setMessage(null);
    emailRef.current?.focus();
  };

  const validateEmail = (value: string) => setErrors((previous) => ({ ...previous, email: getEmailError(value) }));
  const validatePassword = (value: string) => setErrors((previous) => ({ ...previous, password: getPasswordError(value) }));

  return (
    <AuthDialog title={mfa ? "Xác thực đăng nhập" : isForgotPassword ? "Quên mật khẩu" : "Đăng nhập"} onClose={onClose} initialFocusRef={mfa ? codeRef : emailRef}>
      {isForgotPassword && <p className="mb-5 text-sm text-slate-600">Nhập Email đã đăng ký để khôi phục mật khẩu.</p>}
      {mfa && <p className="mb-5 text-sm text-slate-600">Nhập mã từ ứng dụng xác thực hoặc mã khôi phục{mfa.maskedDestination ? " cho tài khoản " + mfa.maskedDestination : ""} để hoàn tất đăng nhập.</p>}

      <form noValidate onSubmit={handleSubmit} onChange={() => setMessage(null)} className="space-y-5">
        <fieldset disabled={isSubmitting} className="space-y-5">
          {mfa ? (
            <div className="space-y-2">
              <label htmlFor="login-mfa-code" className="block text-sm font-semibold text-slate-700">Mã xác thực hoặc mã khôi phục</label>
              <input ref={codeRef} id="login-mfa-code" name="code" type="text" autoComplete="one-time-code" autoCapitalize="none" spellCheck={false} maxLength={12} required aria-invalid={Boolean(errors.code)} aria-describedby={errors.code ? "login-code-error" : undefined} className={getInputClass(errors.code)} />
              {errors.code && <p id="login-code-error" role="alert" className="text-sm text-red-600">{errors.code}</p>}
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="login-email" className="block text-sm font-semibold text-slate-700">Email</label>
                <input ref={emailRef} id="login-email" name="email" type="email" defaultValue={initialEmail} autoComplete={isForgotPassword ? "email" : "username"} inputMode="email" autoCapitalize="none" spellCheck={false} placeholder="Nhập email của bạn" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "login-email-error" : undefined} onBlur={(event) => validateEmail(event.currentTarget.value)} onChange={(event) => { if (errors.email) validateEmail(event.currentTarget.value); }} className={getInputClass(errors.email)} />
                {errors.email && <p id="login-email-error" role="alert" className="text-sm text-red-600">{errors.email}</p>}
              </div>
              {!isForgotPassword && (
                <>
                  <div className="space-y-2">
                    <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700">Mật khẩu</label>
                    <input ref={passwordRef} id="login-password" name="password" type="password" autoComplete="current-password" placeholder="Nhập mật khẩu" required minLength={12} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? "login-password-help login-password-error" : "login-password-help"} onBlur={(event) => validatePassword(event.currentTarget.value)} onChange={(event) => { if (errors.password) validatePassword(event.currentTarget.value); }} className={getInputClass(errors.password)} />
                    <p id="login-password-help" className="text-xs text-slate-500">Tối thiểu 12 ký tự.</p>
                    {errors.password && <p id="login-password-error" role="alert" className="text-sm text-red-600">{errors.password}</p>}
                  </div>
                  <div className="text-right">
                    <button type="button" onClick={() => switchForm(true)} className="rounded text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">Quên mật khẩu?</button>
                  </div>
                </>
              )}
            </>
          )}

          {message && <p role="status" className="text-sm text-amber-700">{message}</p>}
          <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60">
            {isSubmitting ? "Đang xử lý..." : mfa ? "Xác nhận" : isForgotPassword ? "Gửi yêu cầu khôi phục" : "Đăng nhập"}
          </button>
          {isForgotPassword || mfa ? (
            <button type="button" onClick={() => switchForm(false)} className="w-full rounded-xl px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Quay lại đăng nhập</button>
          ) : (
            <p className="text-center text-sm text-slate-600">Chưa có tài khoản? <button type="button" onClick={onRegister} className="rounded font-semibold text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Đăng ký</button></p>
          )}
        </fieldset>
      </form>
    </AuthDialog>
  );
}
