const ERROR_MAP: Record<string, string> = {
  "auth/invalid_login_credentials": "Invalid email or password",
  "auth/email_already_registered": "An account with this email already exists",
  "auth/user_not_found": "Invalid email or password",
  "auth/wrong_password": "Invalid email or password",
  "auth/email_not_confirmed": "Please verify your email first",
  "auth/too_many_requests": "Too many attempts. Please try again later",
  "auth/weak_password": "Password is too weak. Use at least 8 characters",
  "auth/invalid_email": "Please enter a valid email address",
  "auth/signup_disabled": "Sign ups are currently disabled",
  "auth/link_expired": "This link has expired. Please request a new one",
  "auth/link_invalid": "Invalid verification link",
  "auth/captcha_failed": "Captcha verification failed. Please try again",
};

export function mapAuthError(message: string): string {
  const normalized = message.toLowerCase();

  for (const [key, value] of Object.entries(ERROR_MAP)) {
    if (normalized.includes(key.toLowerCase())) {
      return value;
    }
  }

  if (normalized.includes("email")) {
    return "Please enter a valid email address";
  }

  if (normalized.includes("password")) {
    return "Invalid email or password";
  }

  if (normalized.includes("network") || normalized.includes("fetch")) {
    return "Network error. Please check your connection";
  }

  return "Something went wrong. Please try again";
}
