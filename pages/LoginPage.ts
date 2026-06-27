import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // The Playwright page object — represents the browser tab
  readonly page: Page;

  // --- Locators ---
  // These represent elements on the login page
  readonly loginHeading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loggedInUsername: Locator;

  constructor(page: Page) {
  this.page = page;

  // Scope all login locators inside the login form section only
  const loginForm = page.locator('.login-form');

  this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
  this.emailInput = loginForm.getByPlaceholder('Email Address');
  this.passwordInput = loginForm.getByPlaceholder('Password');
  this.loginButton = loginForm.getByRole('button', { name: 'Login' });
  this.errorMessage = page.getByText('Your email or password is incorrect!');
  this.loggedInUsername = page.getByText('Logged in as');
}
  // --- Actions ---
  // These are reusable steps that tests can call

  async navigate() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginPageVisible() {
    await expect(this.loginHeading).toBeVisible();
  }

  async assertLoginSuccess() {
    await expect(this.loggedInUsername).toBeVisible();
  }

  async assertLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}