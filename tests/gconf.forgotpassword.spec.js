import { test } from '@playwright/test';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { CREDENTIALS } from '../constants/testData';

test('Successfully request a password reset link', async ({ page }) => {
  const forgotPasswordPage = new ForgotPasswordPage(page);

  await forgotPasswordPage.navigate();
  await forgotPasswordPage.requestPasswordReset(CREDENTIALS.VALID_USER.email);
  await forgotPasswordPage.verifySuccessMessage();
});
