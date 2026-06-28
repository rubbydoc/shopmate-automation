// Notice — we import from our fixture, not from @playwright/test
import { test, expect } from '../../fixtures/authenticatedPage';

test.describe('Account Feature — Authenticated', () => {

  test('SHOPMATE-004a | logged in user sees their username in navbar @smoke @regression', async ({ page }) => {
    await page.goto('/');
    // This assertion only passes if the user is actually logged in
    await expect(page.getByText('Logged in as')).toBeVisible();
    await expect(page.getByText(` ShopMate Tester`)).toBeVisible();
  });

  test('SHOPMATE-004b | logged in user can access account details @regression', async ({ page }) => {
    await page.goto('/account');
    // Should not be redirected to login — user is already authenticated
    await expect(page).not.toHaveURL(/login/);
  });

  // This test uses our custom fixture — productsPage is injected automatically
  test('SHOPMATE-004c | logged in user can add product to cart @regression', async ({ page, productsPage, cartPage }) => {
    await productsPage.navigate();
    await productsPage.assertProductsPageVisible();
    await productsPage.addFirstProductAndViewCart();
    await cartPage.assertCartPageVisible();
    await cartPage.assertCartHasItems();
  });

});