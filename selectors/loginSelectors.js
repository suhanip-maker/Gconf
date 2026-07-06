export const LOGIN_SELECTORS = {
  emailInput: 'input[type="email"], input[placeholder*="email" i], input[name="email"]',
  passwordInput: 'input[type="password"], input[placeholder*="password" i], input[name="password"]',
  loginButton: 'button[type="submit"], button:has-text("Login"), button:has-text("Sign In"), button:has-text("Sign in")',
  googleLoginButton: 'button:has-text("Google"), a:has-text("Google"), [aria-label*="Google" i]',
  githubLoginButton: 'button:has-text("GitHub"), a:has-text("GitHub"), [aria-label*="GitHub" i]',
  passkeyLoginButton: 'text="Passkey", text="use a save pass key", text="use a saved passkey", [aria-label*="Passkey" i]',
  quickAnalyticsHeader: 'text="Quick Analytics"',
  toastError: '.toast-error, .alert-danger, .error-message',
  emailError: '.email-error, .invalid-feedback',
  passwordError: '.password-error, .invalid-feedback'
};
