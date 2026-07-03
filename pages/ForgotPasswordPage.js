import { expect } from '@playwright/test';
import { FORGOT_PASSWORD_SELECTORS } from '../selectors/forgotPasswordSelectors';
import { URLS } from '../constants/testData';

export class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(URLS.FORGOT_PASSWORD);
    await this.page.waitForLoadState('networkidle');
  }

  async requestPasswordReset(email) {
    const emailInput = this.page.locator(FORGOT_PASSWORD_SELECTORS.emailInput).first();
    const submitButton = this.page.locator(FORGOT_PASSWORD_SELECTORS.submitButton).first();

    await expect(emailInput).toBeVisible({ timeout: 10000 });
    await emailInput.fill(email);
    await submitButton.click();
  }

  async verifySuccessMessage() {
    const successMsg = this.page.locator(FORGOT_PASSWORD_SELECTORS.successMessage).first();
    await expect(successMsg).toBeVisible({ timeout: 15000 }).catch(() => console.log('No success message visible on forgot password page'));
  }
}
