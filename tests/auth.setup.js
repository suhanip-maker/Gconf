import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CREDENTIALS } from '../constants/testData';
import fs from 'fs';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Ensure the .auth directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(CREDENTIALS.VALID_USER.email, CREDENTIALS.VALID_USER.password);
  await loginPage.verifySuccessfulLogin();

  // Save the authentication state
  await page.context().storageState({ path: authFile });
});
