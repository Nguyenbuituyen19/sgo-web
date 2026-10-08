"use client";

import { useRef, useState, type FormEvent } from "react";
import AuthDialog from "./AuthDialog";
import { authApi, type AuthLoginData, type AuthUser } from "@/shared/auth";
import { getEmailError, getPasswordError, getUsernameError } from "@/shared/auth-validation";

interface RegisterModalProps {
  onClose: () => void;
  onAuthenticated: (user: AuthUser) => void;
  onLogin: (options?: { email?: string; message?: string; mfa?: AuthLoginData }) => void;
}

interface RegisterErrors {
  email?: string;
  username?: string;
  password?: string;
}

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2";

function getInputClass(error?: string) {
  return inputClass + (error
    ? " border-red-500 focus:border-red-500 focus:ring-red-100"
    : " border-slate-200 focus:border-blue-500 focus:ring-blue-100");
}

export default function RegisterModal({ onClose, onAuthenticated, onLogin }: RegisterModalProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const emailError = getEmailError(emailRef.current?.value ?? "");
    const usernameError = getUsernameError(usernameRef.current?.value ?? "");
    const passwordError = getPasswordError(passwordRef.current?.value ?? "");
    setErrors({ email: emailError, username: usernameError, password: passwordError });
    setMessage(null);

    if (emailError) {
      emailRef.current?.focus();
      return;
    }
    if (usernameError) {
      usernameRef.current?.focus();
      return;
    }
    if (passwordError) {
      passwordRef.current?.focus();
      return;
    }

    const email = emailRef.current?.value.trim() ?? "";
    const displayName = usernameRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";
    setIsSubmitting(true);
    let accountCreated = false;
    try {
      const registration = await authApi.register({ email, displayName, password });
      if (!registration.success || !registration.data) {
        setMessage(registration.message ?? "Không thể tạo tài khoản. Vui lòng thử lại.");
        return;
      }
      accountCreated = true;
      if (passwordRef.current) passwordRef.current.value = "";
      const login = await authApi.login({ email, password });
      if (login.success && login.data?.user && !login.data.mfaRequired) {
        onAuthenticated(login.data.user);
      } else {
        onLogin({
          email,
          message: "Tài khoản đã được tạo. Vui lòng đăng nhập để tiếp tục.",
          mfa: login.success && login.data?.mfaRequired ? login.data : undefined,
        });
      }
    } catch {
      if (accountCreated) onLogin({ email, message: "Tài khoản đã được tạo. Vui lòng đăng nhập để tiếp tục." });
      else setMessage("Không thể kết nối máy chủ. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (value: string) => {
    setErrors((previous) => ({ ...previous, email: getEmailError(value) }));
  };

  const validateUsername = (value: string) => {
    setErrors((previous) => ({ ...previous, username: getUsernameError(value) }));
  };

  const validatePassword = (value: string) => {
    setErrors((previous) => ({ ...previous, password: getPasswordError(value) }));
  };

  return (
    <AuthDialog title="Đăng ký" onClose={onClose} initialFocusRef={emailRef}>
      <form noValidate onSubmit={handleSubmit} onChange={() => setMessage(null)} className="space-y-5">
        <fieldset disabled={isSubmitting} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="register-email" className="block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              ref={emailRef}
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Nhập email của bạn"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "register-email-error" : undefined}
              onBlur={(event) => validateEmail(event.currentTarget.value)}
              onChange={(event) => {
                if (errors.email) validateEmail(event.currentTarget.value);
              }}
              className={getInputClass(errors.email)}
            />
            {errors.email && (
              <p id="register-email-error" role="alert" className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="register-username" className="block text-sm font-semibold text-slate-700">
              Tên tài khoản
            </label>
            <input
              ref={usernameRef}
              id="register-username"
              name="displayName"
              type="text"
              autoComplete="nickname"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Nhập tên tài khoản"
              required
              aria-invalid={Boolean(errors.username)}
              aria-describedby={errors.username ? "register-username-error" : undefined}
              onBlur={(event) => validateUsername(event.currentTarget.value)}
              onChange={(event) => {
                if (errors.username) validateUsername(event.currentTarget.value);
              }}
              className={getInputClass(errors.username)}
            />
            {errors.username && (
              <p id="register-username-error" role="alert" className="text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="register-password" className="block text-sm font-semibold text-slate-700">
              Mật khẩu
            </label>
            <input
              ref={passwordRef}
              id="register-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Nhập mật khẩu"
              required
              minLength={12}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "register-password-help register-password-error" : "register-password-help"}
              onBlur={(event) => validatePassword(event.currentTarget.value)}
              onChange={(event) => {
                if (errors.password) validatePassword(event.currentTarget.value);
              }}
              className={getInputClass(errors.password)}
            />
            <p id="register-password-help" className="text-xs text-slate-500">Tối thiểu 12 ký tự.</p>
            {errors.password && (
              <p id="register-password-error" role="alert" className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {message && <p role="status" className="text-sm text-amber-700">{message}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? "Đang tạo tài khoản..." : "Đăng ký"}
          </button>
          <p className="text-center text-sm text-slate-600">
            Đã có tài khoản? <button type="button" onClick={() => onLogin()} className="rounded font-semibold text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">Đăng nhập</button>
          </p>
        </fieldset>
      </form>
    </AuthDialog>
  );
}
