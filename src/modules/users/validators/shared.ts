export const isEmailValid = (v: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const passwordRules = [
  {
    name: "lowercase",
    validate: (v: string) => /[a-z]/.test(v),
    message: "Password must contain at least one lowercase letter",
  },
  {
    name: "uppercase",
    validate: (v: string) => /[A-Z]/.test(v),
    message: "Password must contain at least one uppercase letter",
  },
  {
    name: "number",
    validate: (v: string) => /\d/.test(v),
    message: "Password must contain at least one number",
  },
  {
    name: "special",
    validate: (v: string) => /[!@#$%^&*]/.test(v),
    message: "Password must contain at least one special character",
  },
  {
    name: "spaces",
    validate: (v: string) => !/\s/.test(v),
    message: "Password cannot contain spaces",
  },
];
