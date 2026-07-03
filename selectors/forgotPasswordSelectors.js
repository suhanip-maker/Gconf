export const FORGOT_PASSWORD_SELECTORS = {
  emailInput: 'input[type="email"], input[placeholder*="email" i], input[name="email"]',
  submitButton: 'button[type="submit"], button:has-text("Send"), button:has-text("Reset"), button:has-text("Recover"), button:has-text("Submit")',
  successMessage: '.toast-success, .alert-success, :has-text("sent"), :has-text("check your email")',
  backToLoginLink: 'a:has-text("Back to login"), a:has-text("Log in"), a[href*="login"]'
};
