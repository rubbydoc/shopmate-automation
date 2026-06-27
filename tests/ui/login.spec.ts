import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { VALID_USER } from '../../utils/constants';

test.describe('Login Feature', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.assertLoginPageVisible();
  });

  test('SHOPMATE-002a | valid user can login successfully', async ({ page }) => {
    await loginPage.login(VALID_USER.email, VALID_USER.password);
    await loginPage.assertLoginSuccess();
  });

  test('SHOPMATE-002b | invalid credentials show error message', async ({ page }) => {
    await loginPage.login('wrong@email.com', 'wrongpassword');
    await loginPage.assertLoginError();
  });

  test('SHOPMATE-002c | empty fields show validation error', async ({ page }) => {
    await loginPage.login('', '');
    // Browser native validation prevents submission with empty fields
    // We verify we are still on the login page
    await loginPage.assertLoginPageVisible();
  });

});