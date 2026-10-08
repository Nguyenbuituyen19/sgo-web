import { type NextRequest } from "next/server";
import { authenticate, authError, currentSession, logout, registerCustomer, validOrigin } from "@/lib/server/auth";
import { getEmailError, getPasswordError, getUsernameError } from "@/shared/auth-validation";

export const runtime = "nodejs";

type Context = { params: Promise<{ action: string }> };

export async function GET(request: NextRequest, context: Context) {
  const { action } = await context.params;
  if (action !== "session") return authError("Không tìm thấy yêu cầu.", "NOT_FOUND", 404);
  return currentSession(request);
}

export async function POST(request: NextRequest, context: Context) {
  if (!validOrigin(request)) return authError("Yêu cầu không hợp lệ.", "INVALID_ORIGIN", 403);
  const { action } = await context.params;
  if (action === "logout") return logout(request);
  if (!["login", "register", "mfa"].includes(action)) return authError("Không tìm thấy yêu cầu.", "NOT_FOUND", 404);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("INVALID_BODY");
    body = parsed as Record<string, unknown>;
  } catch {
    return authError("Dữ liệu gửi lên không hợp lệ.", "VALIDATION_FAILED", 400);
  }

  if (action === "mfa") {
    const challengeId = typeof body.challengeId === "string" ? body.challengeId : "";
    const code = typeof body.code === "string" ? body.code.trim() : "";
    if (!challengeId || challengeId.length > 200 || !/^[A-Za-z0-9]{6,12}$/.test(code)) {
      return authError("Vui lòng nhập mã xác thực hợp lệ.", "VALIDATION_FAILED", 400);
    }
    return authenticate("mfa", { challengeId, code, remember: body.remember === true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const validation = getEmailError(email) || getPasswordError(password) ||
    (password.length > 128 ? "Mật khẩu không được vượt quá 128 ký tự." : undefined);
  if (validation) return authError(validation, "VALIDATION_FAILED", 400);

  if (action === "register") {
    const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "";
    const nameError = getUsernameError(displayName) ||
      (displayName.length > 160 ? "Tên tài khoản không được vượt quá 160 ký tự." : undefined);
    if (nameError) return authError(nameError, "VALIDATION_FAILED", 400);
    // Role and tenant are deliberately never forwarded from the public form.
    return registerCustomer({ email, displayName, password });
  }
  return authenticate("login", { email, password, remember: body.remember === true });
}
