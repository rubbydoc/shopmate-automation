import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { ApiHelper } from '../utils/apiHelper';

// Define the shape of our custom fixtures
type ShopMateFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  apiHelper: ApiHelper;
};

// Extend Playwright's base test with our custom fixtures
export const test = base.extend<ShopMateFixtures>({

  // Automatically provide a LoginPage instance to any test that needs it
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Automatically provide a ProductsPage instance
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  // Automatically provide a CartPage instance
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // Inject ApiHelper with the built-in Playwright request context
  apiHelper: async ({ request }, use) => {
    await use(new ApiHelper(request));
  },

});

// Re-export expect so test files only need to import from this file
export { expect } from '@playwright/test';