import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { VALID_USER } from '../utils/constants';
import path from 'path';

// This is the file where Playwright will save the login session
export const AUTH_FILE = path.join(__dirname, '../.auth/user.json');

setup('authenticate as valid user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Perform login
  await loginPage.navigate();
  await loginPage.login(VALID_USER.email, VALID_USER.password);
  await loginPage.assertLoginSuccess();

  // Save the browser's cookies and storage to a file
  // Next time, Playwright loads this file instead of logging in again
  await page.context().storageState({ path: AUTH_FILE });
});