const invalidEmailMessage = "Email không hợp lệ. Ví dụ: ten@example.com.";

export function getEmailError(value: string): string | undefined {
  const email = value.trim();
  if (!email) return "Vui lòng nhập Email.";

  const parts = email.split("@");
  if (parts.length !== 2) return invalidEmailMessage;

  const [local, domain] = parts;
  const domainLabels = domain.split(".");
  const valid =
    email.length <= 254 &&
    local.length <= 64 &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(local) &&
    !local.startsWith(".") &&
    !local.endsWith(".") &&
    !local.includes("..") &&
    domainLabels.length >= 2 &&
    domainLabels.every(
      (label) => label.length <= 63 && /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(label)
    );

  return valid ? undefined : invalidEmailMessage;
}

export function getPasswordError(value: string): string | undefined {
  if (!value) return "Vui lòng nhập Mật khẩu.";
  if ([...value].length < 12) return "Mật khẩu phải có tối thiểu 12 ký tự.";
  if (value.length > 128) return "Mật khẩu không được vượt quá 128 ký tự.";
  return undefined;
}

export function getUsernameError(value: string): string | undefined {
  const name = value.trim();
  if (!name) return "Vui lòng nhập Tên tài khoản.";
  if (name.length > 160) return "Tên tài khoản không được vượt quá 160 ký tự.";
  return undefined;
}
