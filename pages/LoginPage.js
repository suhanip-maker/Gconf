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
    await loginButton.click();
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
    await passkeyBtn.click();
    // Passkey prompts native OS dialogs, so we just wait a bit for it to trigger
    await this.page.waitForTimeout(2000);
  }

  async verifySuccessfulLogin() {
    const quickAnalyticsHeader = this.page.locator(LOGIN_SELECTORS.quickAnalyticsHeader).first();
    await expect(quickAnalyticsHeader).toBeVisible({ timeout: 20000 });
  }
}
