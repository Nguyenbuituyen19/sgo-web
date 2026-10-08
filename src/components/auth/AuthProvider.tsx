"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { authApi, type AuthLoginData, type AuthUser } from "@/shared/auth";
import LoginModal from "@/components/layout/LoginModal";
import RegisterModal from "@/components/layout/RegisterModal";

type AuthMode = "login" | "register";
interface LoginOptions {
  email?: string;
  message?: string;
  mfa?: AuthLoginData;
}
interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  openAuth: (mode: AuthMode, trigger?: HTMLElement) => void;
  requireAuth: (action: () => void, trigger?: HTMLElement) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState<AuthMode | null>(null);
  const [loginOptions, setLoginOptions] = useState<LoginOptions>({});
  const [sessionMessage, setSessionMessage] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const pendingActionRef = useRef<(() => void) | null>(null);
  const checkingSessionRef = useRef(false);
  const loggingOutRef = useRef(false);
  const sessionVersionRef = useRef(0);

  useEffect(() => {
    let active = true;
    const version = sessionVersionRef.current;
    authApi.session().then((response) => {
      if (active && version === sessionVersionRef.current) {
        setUser(response.success ? response.data : null);
      }
    }).finally(() => {
      if (active) setIsLoading(false);
    });
    return () => { active = false; };
  }, []);

  const restoreFocus = useCallback(() => {
    const trigger = triggerRef.current;
    if (trigger?.isConnected) trigger.focus();
  }, []);

  const closeAuth = useCallback(() => {
    setModal(null);
    setLoginOptions({});
    pendingActionRef.current = null;
    restoreFocus();
  }, [restoreFocus]);

  const openAuth = useCallback((mode: AuthMode, trigger?: HTMLElement) => {
    triggerRef.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    pendingActionRef.current = null;
    setLoginOptions({});
    setSessionMessage(null);
    setModal(mode);
  }, []);

  const requireAuth = useCallback(async (action: () => void, trigger?: HTMLElement) => {
    if (checkingSessionRef.current || loggingOutRef.current) return;
    checkingSessionRef.current = true;
    const version = sessionVersionRef.current;
    const activeTrigger = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    try {
      const response = await authApi.session();
      if (version !== sessionVersionRef.current) return;
      if (!response.success && response.code !== "AUTH_REQUIRED") {
        setSessionMessage(response.message ?? "Không thể kiểm tra phiên đăng nhập. Vui lòng thử lại.");
        return;
      }
      sessionVersionRef.current += 1;
      if (response.success && response.data) {
        setUser(response.data);
        action();
        return;
      }
      setUser(null);
      triggerRef.current = activeTrigger;
      pendingActionRef.current = action;
      setLoginOptions({ message: "Vui lòng đăng nhập hoặc đăng ký để tiếp tục mua dịch vụ." });
      setModal("login");
    } catch {
      if (version === sessionVersionRef.current) {
        setSessionMessage("Không thể kiểm tra phiên đăng nhập. Vui lòng thử lại.");
      }
    } finally {
      checkingSessionRef.current = false;
    }
  }, []);

  const authenticated = useCallback((account: AuthUser) => {
    sessionVersionRef.current += 1;
    setUser(account);
    setSessionMessage(null);
    setModal(null);
    setLoginOptions({});
    const action = pendingActionRef.current;
    pendingActionRef.current = null;
    restoreFocus();
    action?.();
  }, [restoreFocus]);

  const logout = useCallback(async () => {
    if (loggingOutRef.current) return;
    loggingOutRef.current = true;
    sessionVersionRef.current += 1;
    pendingActionRef.current = null;
    try {
      const response = await authApi.logout();
      if (response.success) {
        sessionVersionRef.current += 1;
        setUser(null);
        setSessionMessage(response.message ?? null);
      } else {
        setSessionMessage(response.message ?? "Không thể đăng xuất. Vui lòng thử lại.");
      }
    } catch {
      setSessionMessage("Không thể đăng xuất. Vui lòng thử lại.");
    } finally {
      loggingOutRef.current = false;
    }
  }, []);

  const switchToLogin = useCallback((options: LoginOptions = {}) => {
    setLoginOptions(options);
    setModal("login");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, openAuth, requireAuth, logout }}>
      {children}
      {sessionMessage && (
        <div role="alert" className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-red-200 bg-white p-4 text-sm text-red-700 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <p>{sessionMessage}</p>
            <button type="button" onClick={() => setSessionMessage(null)} aria-label="Đóng thông báo" className="font-semibold">Đóng</button>
          </div>
        </div>
      )}
      {modal === "login" && (
        <LoginModal
          onClose={closeAuth}
          onAuthenticated={authenticated}
          onRegister={() => { setLoginOptions({}); setModal("register"); }}
          initialEmail={loginOptions.email}
          initialMessage={loginOptions.message}
          initialMfa={loginOptions.mfa}
        />
      )}
      {modal === "register" && (
        <RegisterModal onClose={closeAuth} onAuthenticated={authenticated} onLogin={switchToLogin} />
      )}
    </AuthContext.Provider>
  );
}
