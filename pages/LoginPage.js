import { expect } from '@playwright/test';
import { LOGIN_SELECTORS } from '../selectors/loginSelectors';
import { URLS } from '../constants/testData';

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(URLS.LOGIN);
    await this.page.waitForLoadState('networkidle');
  }

  async login(email, password) {
    const emailInput = this.page.locator(LOGIN_SELECTORS.emailInput).first();
    const passwordInput = this.page.locator(LOGIN_SELECTORS.passwordInput).first();
    const loginButton = this.page.locator(LOGIN_SELECTORS.loginButton).first();

    await emailInput.fill(email);
    await passwordInput.fill(password);

    // Set up listener for the login API response BEFORE clicking
    // We look for a POST request to a login endpoint
    const responsePromise = this.page.waitForResponse(response => 
      response.url().includes('login') && response.request().method() === 'POST',
      { timeout: 15000 }
    ).catch(() => null); // Catch timeout in case there's no API call

    await loginButton.click();

    // Wait for the API response and return it so tests can assert on it
    const response = await responsePromise;
    return response;
  }

  async loginWithGoogle() {
    const googleBtn = this.page.locator(LOGIN_SELECTORS.googleLoginButton).first();
    await googleBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async loginWithGithub() {
    const githubBtn = this.page.locator(LOGIN_SELECTORS.githubLoginButton).first();
    await githubBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async loginWithPasskey() {
    const passkeyBtn = this.page.locator(LOGIN_SELECTORS.passkeyLoginButton).first();
    try {
      await passkeyBtn.click({ timeout: 5000 });
      await this.page.waitForTimeout(2000);
    } catch (e) {
      console.log('--- ERROR: PASSKEY BUTTON NOT FOUND ---');
      console.log('We searched for: ' + LOGIN_SELECTORS.passkeyLoginButton);
      const allText = await this.page.locator('body').innerText();
      const fs = require('fs');
      fs.writeFileSync('pageText.txt', allText);
      throw new Error('Passkey button not found. Saved page text to pageText.txt');
    }
  }

  async verifySuccessfulLogin() {
    const quickAnalyticsHeader = this.page.locator(LOGIN_SELECTORS.quickAnalyticsHeader).first();
    await expect(quickAnalyticsHeader).toBeVisible({ timeout: 20000 });
  }
}
