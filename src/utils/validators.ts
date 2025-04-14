export function validateEmail(email: string): string | null {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!pattern.test(email)) return "Invalid email format";
  return null;
}

export enum PasswordValidationMessages {
  REQUIRED = "Password is required",
  MIN_LENGTH = "Password must be at least 8 characters",
  LOWERCASE = "Must contain a lowercase letter",
  UPPERCASE = "Must contain an uppercase letter",
  SPECIAL_CHAR = "Must contain a special character",
}

export function getPasswordHints(password: string): string[] {
  const hints: string[] = [];

  if (!password) hints.push(PasswordValidationMessages.REQUIRED);
  if (password.length < 8) hints.push(PasswordValidationMessages.MIN_LENGTH);
  if (!/[a-z]/.test(password)) hints.push(PasswordValidationMessages.LOWERCASE);
  if (!/[A-Z]/.test(password)) hints.push(PasswordValidationMessages.UPPERCASE);
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    hints.push(PasswordValidationMessages.SPECIAL_CHAR);

  return hints;
}

export function validatePassword(password: string) {
  return getPasswordHints(password)[0] || null;
}

export function validateUsername(username: string): string | null {
  if (!username) return "Username is required";
  if (username.length < 6 || !/^[0-9A-Za-z]{6,16}$/.test(username))
    return "Must be at least 6 characters, and can contain only letters and numbers";
  return null;
}
