import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('SHOPMATE-001 | should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Automation Exercise/);
    await expect(page.getByRole('img', { name: 'Website for automation practice' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();
  });

});