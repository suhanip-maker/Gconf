import { test, expect } from '@playwright/test';

// Base URL for the target environment
const LOGIN_URL = 'https://develop.dash.gconf.ai/login';

test.describe('Gconf Login Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the login page before each test
    await page.goto(LOGIN_URL);
    await page.waitForLoadState('networkidle');
  });

  test('1. Login with valid credentials', async ({ page }) => {
    // Locate credentials inputs
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i], input[name="email"]').first();
    const passwordInput = page.locator('input[type="password"], input[placeholder*="password" i], input[name="password"]').first();
    const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In"), button:has-text("Sign in")').first();

    // Fill credentials
    await emailInput.fill('suhanip@zignuts.com');
    await passwordInput.fill('Test@123');

    // Submit form
    await loginButton.click();

    // Verify successful login by checking for dashboard element
    const quickAnalyticsHeader = page.getByText('Quick Analytics').first();
    await expect(quickAnalyticsHeader).toBeVisible({ timeout: 20000 });

    // Verify URL navigated away from /login
    expect(page.url()).not.toContain('/login');
  });



  test('3. Login with Google redirect', async ({ page }) => {
    const googleButton = page.locator('button:has-text("Continue with Google"), a:has-text("Continue with Google")').first();
    await expect(googleButton).toBeVisible();

    // Click Google SSO button and wait for the navigation
    await googleButton.click();

    // Verify we are redirected to Supabase Auth which initiates Google OAuth
    await page.waitForURL(/.*(supabase\.co|accounts\.google\.com).*/, { timeout: 15000 });
    expect(page.url()).toMatch(/.*(supabase\.co|accounts\.google\.com).*/);
  });

  test('4. Login with GitHub redirect', async ({ page }) => {
    const githubButton = page.locator('button:has-text("Continue with GitHub"), a:has-text("Continue with GitHub")').first();
    await expect(githubButton).toBeVisible();

    // Click GitHub SSO button and wait for the navigation
    await githubButton.click();

    // Verify we are redirected to Supabase Auth which initiates GitHub OAuth
    await page.waitForURL(/.*(supabase\.co|github\.com).*/, { timeout: 15000 });
    expect(page.url()).toMatch(/.*(supabase\.co|github\.com).*/);
  });

  test('5. Forgot password flow', async ({ page }) => {
    const forgotPasswordLink = page.getByText('Forgot password?').first();
    await expect(forgotPasswordLink).toBeVisible();

    // Click forgot password link
    await forgotPasswordLink.click();

    // Wait for the navigation to forgot password view/page
    await page.waitForURL(/.*forgot-password.*/, { timeout: 15000 });
    expect(page.url()).toContain('forgot-password');

    // Verify forgot password elements are loaded (e.g. Email input field and Reset button)
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i], input[name="email"]').first();
    await expect(emailInput).toBeVisible();
    
    const resetButton = page.locator('button[type="submit"], button:has-text("Reset"), button:has-text("Send")').first();
    await expect(resetButton).toBeVisible();
  });

  test('6. UI layout integrity check', async ({ page }) => {
    // Verify logo/branding header is present
    const logo = page.locator('img, svg, .logo, .brand, :has-text("CryptoHub"), :has-text("Crypto Hub")').first();
    await expect(logo).toBeVisible();

    // Verify the primary container card is visible
    const loginCard = page.locator('form, .card, .login-container').first();
    await expect(loginCard).toBeVisible();

    // Verify essential login controls exist and are visible
    await expect(page.locator('input[type="email"]').first()).toBeVisible();
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
    await expect(page.locator('button[type="submit"]').first()).toBeVisible();

    // Verify Social Buttons are properly rendered
    await expect(page.locator('button:has-text("Continue with Google"), a:has-text("Continue with Google")').first()).toBeVisible();
    await expect(page.locator('button:has-text("Continue with GitHub"), a:has-text("Continue with GitHub")').first()).toBeVisible();

    // Verify footer/version elements are visible
    const footerText = page.locator('text=v2.').first();
    await expect(footerText).toBeVisible();

    // Verify theme toggle icon exists
    const themeToggle = page.locator('.theme-toggle, [aria-label*="theme" i], button i.fa-moon, button i.fa-sun, .fa-moon, .fa-sun').first();
    await expect(themeToggle).toBeVisible();
  });

});
