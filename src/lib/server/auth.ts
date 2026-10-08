import axios, { type AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";
import type { AuthLoginData, AuthResponse, AuthUser } from "@/shared/auth";

interface BackendSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  user: AuthUser;
}

interface BackendLogin {
  mfaRequired: boolean;
  challengeId?: string;
  maskedDestination?: string;
  session?: BackendSession;
}

interface BackendProblem {
  code?: string;
  detail?: string;
  message?: string;
}

const backend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 10_000,
  maxRedirects: 0,
  validateStatus: () => true,
});

const accessCookie = "sgo_access_token";
const refreshCookie = "sgo_refresh_token";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const refreshRequests = new Map<string, Promise<AxiosResponse<BackendSession>>>();
const invalidatedRefreshTokens = new Set<string>();

function invalidateRefresh(token?: string) {
  if (!token) return;
  invalidatedRefreshTokens.add(token);
  setTimeout(() => invalidatedRefreshTokens.delete(token), 30_000);
}

function signedOut() {
  return clearSession(authError("Vui lòng đăng nhập để tiếp tục.", "AUTH_REQUIRED", 401));
}

export function authJson<T>(data: T, status = 200) {
  return NextResponse.json<AuthResponse<T>>({ success: true, data }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function authError(message: string, code: string, status: number) {
  return NextResponse.json<AuthResponse<never>>({ success: false, data: null, message, code }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function validOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const originUrl = new URL(origin);
    const host = request.headers.get("host") || request.nextUrl.host;
    const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim() || request.nextUrl.protocol.replace(":", "");
    return originUrl.host === host && originUrl.protocol === `${protocol}:`;
  } catch {
    return false;
  }
}

function isUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") return false;
  const user = value as Partial<AuthUser>;
  return [user.id, user.email, user.displayName, user.role].every((field) => typeof field === "string");
}

function isSession(value: unknown): value is BackendSession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<BackendSession>;
  return typeof session.accessToken === "string" && Boolean(session.accessToken) &&
    typeof session.refreshToken === "string" && Boolean(session.refreshToken) &&
    typeof session.expiresAt === "string" && Date.parse(session.expiresAt) > Date.now() && isUser(session.user);
}

function setSession(response: NextResponse, session: BackendSession) {
  const expires = new Date(session.expiresAt);
  response.cookies.set(accessCookie, session.accessToken, { ...cookieOptions, expires });
  response.cookies.set(refreshCookie, session.refreshToken, { ...cookieOptions, expires });
  return response;
}

function clearSession(response: NextResponse) {
  for (const name of [accessCookie, refreshCookie]) {
    response.cookies.set(name, "", { ...cookieOptions, maxAge: 0 });
  }
  return response;
}

function backendError(response: AxiosResponse<unknown>) {
  const problem = response.data && typeof response.data === "object" ? response.data as BackendProblem : {};
  const status = response.status >= 400 && response.status < 600 ? response.status : 502;
  return authError(
    problem.detail || problem.message || "Không thể thực hiện yêu cầu. Vui lòng thử lại.",
    problem.code || "AUTH_REQUEST_FAILED",
    status,
  );
}

function unavailable() {
  return authError("Không thể kết nối tới máy chủ. Vui lòng thử lại.", "BACKEND_UNAVAILABLE", 503);
}

export async function registerCustomer(data: { email: string; displayName: string; password: string }) {
  try {
    const response = await backend.post<AuthUser>("/api/v1/auth/register", data);
    if (response.status !== 201) return backendError(response);
    if (!isUser(response.data)) return authError("Không thể đăng ký lúc này. Vui lòng thử lại.", "INVALID_AUTH_RESPONSE", 502);
    return authJson(response.data, 201);
  } catch {
    return unavailable();
  }
}

export async function authenticate(action: "login" | "mfa", data: Record<string, unknown>) {
  try {
    const response = await backend.post<BackendLogin | BackendSession>(`/api/v1/auth/${action}`, data);
    if (response.status !== 200) return backendError(response);

    // The MFA endpoint returns SessionResponse; login may return a challenge instead.
    const payload = response.data;
    const session = isSession(payload) ? payload : (payload as BackendLogin).session;
    if (isSession(session)) {
      return setSession(authJson<AuthLoginData>({ mfaRequired: false, user: session.user }), session);
    }
    const challenge = payload as BackendLogin;
    if (challenge.mfaRequired && typeof challenge.challengeId === "string" && challenge.challengeId) {
      return authJson<AuthLoginData>({
        mfaRequired: true,
        challengeId: challenge.challengeId,
        maskedDestination: challenge.maskedDestination,
      });
    }
    return authError("Không thể đăng nhập lúc này. Vui lòng thử lại.", "INVALID_AUTH_RESPONSE", 502);
  } catch {
    return unavailable();
  }
}

function refresh(token: string) {
  let pending = refreshRequests.get(token);
  if (!pending) {
    pending = backend.post<BackendSession>("/api/v1/auth/refresh", { refreshToken: token });
    refreshRequests.set(token, pending);
    // Concurrent session checks must not rotate the same refresh token twice.
    setTimeout(() => refreshRequests.delete(token), 10_000);
  }
  return pending;
}

export async function currentSession(request: NextRequest) {
  const refreshToken = request.cookies.get(refreshCookie)?.value;
  const invalidated = () => Boolean(refreshToken && invalidatedRefreshTokens.has(refreshToken));
  try {
    if (invalidated()) return signedOut();
    const accessToken = request.cookies.get(accessCookie)?.value;
    if (accessToken) {
      const response = await backend.get<AuthUser>("/api/v1/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (invalidated()) return signedOut();
      if (response.status === 200 && isUser(response.data)) return authJson(response.data);
      if (response.status !== 401 && response.status !== 403) return backendError(response);
    }

    if (refreshToken) {
      const response = await refresh(refreshToken);
      if (invalidated()) return signedOut();
      if (response.status === 200 && isSession(response.data)) {
        if (invalidatedRefreshTokens.has(response.data.refreshToken)) return signedOut();
        return setSession(authJson(response.data.user), response.data);
      }
      if (response.status !== 401 && response.status !== 403) return backendError(response);
    }
    return signedOut();
  } catch {
    return unavailable();
  }
}

export async function logout(request: NextRequest) {
  const token = request.cookies.get(accessCookie)?.value;
  const refreshToken = request.cookies.get(refreshCookie)?.value;
  invalidateRefresh(refreshToken);
  const tokens = new Set<string>(token ? [token] : []);
  let revocationUnconfirmed = false;
  try {
    const pending = refreshToken ? refreshRequests.get(refreshToken) || (!token ? refresh(refreshToken) : undefined) : undefined;
    if (pending) {
      try {
        const rotated = await pending;
        if (rotated.status === 200 && isSession(rotated.data)) {
          invalidateRefresh(rotated.data.refreshToken);
          tokens.add(rotated.data.accessToken);
        }
      } catch {
        // Still revoke the original access token if rotation failed.
        revocationUnconfirmed = true;
      }
    }
    const results = await Promise.all([...tokens].map((accessToken) => backend.post("/api/v1/auth/logout", undefined, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })));
    const failed = results.find((response) => ![200, 204, 401, 403].includes(response.status));
    if (failed || revocationUnconfirmed) return localLogoutWarning();
    return clearSession(authJson(null));
  } catch {
    return localLogoutWarning();
  }
}

function localLogoutWarning() {
  return clearSession(NextResponse.json<AuthResponse<null>>({
    success: true,
    data: null,
    message: "Đã đăng xuất trên thiết bị này. Máy chủ chưa phản hồi việc kết thúc phiên.",
  }, { headers: { "Cache-Control": "no-store" } }));
}
