export function validateEmail(email: string): string | null {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!pattern.test(email)) return "Invalid email format";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[a-z]/.test(password)) return "Must contain a lowercase letter";
  if (!/[A-Z]/.test(password)) return "Must contain an uppercase letter";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Must contain a special character";
  return null;
}

export function validateConfirmPassword(
  confirm: string,
  password: string
): string | null {
  if (!confirm) return "Confirm your password";
  if (password !== confirm) return "Passwords do not match";
  return null;
}
