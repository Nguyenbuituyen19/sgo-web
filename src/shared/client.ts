import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  timeout: 10_000,
});

// Loại bỏ các param undefined/rỗng trước khi gửi
api.interceptors.request.use((config) => {
  if (config.params) {
    config.params = Object.fromEntries(
      Object.entries(config.params).filter(
        ([, v]) => v !== undefined && v !== null && v !== ""
      )
    );
  }
  return config;
});

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
}

/**
 * Backend trả về payload thuần (không bọc envelope) và lỗi theo RFC 7807
 * problem-json ({ code, detail, status }). Wrapper này chuẩn hoá cả hai:
 * - 2xx -> { success: true, data }
 * - 404 -> { success: true, data: null } (không coi "không tìm thấy" là lỗi hệ thống)
 * - khác -> { success: false, message }
 */
export async function request<T>(
  config: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const res = await api.request<T>(config);
    return { success: true, data: res.data };
  } catch (err) {
    const axiosError = err as AxiosError<{ code?: string; detail?: string; message?: string }>;

    if (axiosError.response?.status === 404) {
      return { success: true, data: null };
    }

    const problem = axiosError.response?.data;
    const message =
      problem?.detail ||
      problem?.message ||
      axiosError.message ||
      "Không thể kết nối tới máy chủ";

    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[api] ${config.method?.toUpperCase()} ${config.url} failed:`,
        problem?.code || axiosError.code || message
      );
    }

    return { success: false, data: null, message };
  }
}

export interface SubmitConsultationPayload {
  provisionCode?: string;
  provisionId?: string;
  /** @deprecated Sử dụng provisionCode thay cho serviceType */
  serviceType?: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  extraFields?: Record<string, unknown>;
}

export async function submitConsultation(
  payload: SubmitConsultationPayload
): Promise<ApiResponse<unknown>> {
  const { serviceType, provisionCode, provisionId, customerName, phoneNumber, email, extraFields } = payload;
  
  const body: Record<string, unknown> = {
    customerName: customerName ? customerName.trim() : "",
    phoneNumber: phoneNumber ? phoneNumber.trim() : "",
    email: email ? email.trim() : undefined,
    extraFields: extraFields || {},
  };

  if (provisionId && String(provisionId).trim()) {
    body.provisionId = String(provisionId).trim();
  } else {
    const effectiveCode = provisionCode || serviceType || "contact";
    body.provisionCode = String(effectiveCode).trim();
  }

  return request({
    method: "POST",
    url: "/api/v1/consultation",
    data: body,
  });
}
