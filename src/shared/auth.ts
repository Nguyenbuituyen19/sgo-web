import axios, { type AxiosRequestConfig } from "axios";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  role: string;
}

export interface AuthLoginData {
  mfaRequired: boolean;
  user?: AuthUser;
  challengeId?: string;
  maskedDestination?: string;
}

export interface AuthResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
  code?: string;
}

const authClient = axios.create({
  baseURL: "/api/auth",
  timeout: 25_000,
  withCredentials: true,
});

async function authRequest<T>(config: AxiosRequestConfig): Promise<AuthResponse<T>> {
  try {
    const response = await authClient.request<AuthResponse<T>>(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<AuthResponse<T>>(error)) {
      const response = error.response?.data;
      return {
        success: false,
        data: null,
        code: response?.code,
        message: response?.message || "Không thể kết nối tới máy chủ. Vui lòng thử lại.",
      };
    }
    return { success: false, data: null, message: "Không thể kết nối tới máy chủ. Vui lòng thử lại." };
  }
}

export const authApi = {
  session: () => authRequest<AuthUser>({ method: "GET", url: "/session" }),
  login: (data: { email: string; password: string; remember?: boolean }) =>
    authRequest<AuthLoginData>({ method: "POST", url: "/login", data }),
  register: (data: { email: string; displayName: string; password: string }) =>
    authRequest<AuthUser>({ method: "POST", url: "/register", data }),
  verifyMfa: (data: { challengeId: string; code: string; remember?: boolean }) =>
    authRequest<AuthLoginData>({ method: "POST", url: "/mfa", data }),
  logout: () => authRequest<null>({ method: "POST", url: "/logout" }),
};
