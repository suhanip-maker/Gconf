import { test, expect } from '@playwright/test';

test('Login to Gconf Dashboard', async ({ page }) => {
  // 1. Go to https://dash.gconf.ai/
  await page.goto('https://dash.gconf.ai/');

  // Wait for page to load fully
  await page.waitForLoadState('networkidle');

  // 2. Locate and fill the email field (supporting fallback selectors for robustness)
  const emailInput = page.locator('input[type="email"], input[placeholder*="email" i], input[name="email"]').first();
  await expect(emailInput).toBeVisible({ timeout: 10000 });
  await emailInput.fill('vimalp@zignuts.com');

  // 3. Locate and fill the password field
  const passwordInput = page.locator('input[type="password"], input[placeholder*="password" i], input[name="password"]').first();
  await expect(passwordInput).toBeVisible({ timeout: 10000 });
  await passwordInput.fill('Qj6PCsiZiTbVadv');

  // 4. Click the Login/Submit button
  const loginButton = page.locator('button[type="submit"], button:has-text("Login"), button:has-text("Sign In"), button:has-text("Sign in")').first();
  await expect(loginButton).toBeVisible({ timeout: 10000 });
  await loginButton.click();

  // 5. Verify successful login by checking for dashboard elements
  const quickAnalyticsHeader = page.getByText('Quick Analytics').first();
  await expect(quickAnalyticsHeader).toBeVisible({ timeout: 15000 });

  // Output current page URL to verify successful navigation
  const finalUrl = page.url();
  console.log('Login attempt completed successfully. Current URL:', finalUrl);

  // Optional assertion: check if we successfully navigated away from the login page or into the dashboard
  // await expect(page).toHaveURL(/.*dashboard.*/, { timeout: 10000 });
});
