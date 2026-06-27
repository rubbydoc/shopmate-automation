import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { PRODUCTS } from '../../utils/constants';

test.describe('Products Feature', () => {

  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await productsPage.navigate();
    await productsPage.assertProductsPageVisible();
  });

  test('SHOPMATE-003a | products page loads with all products', async ({ page }) => {
    await productsPage.assertProductsListLoaded();
  });

  test('SHOPMATE-003b | user can search for a product', async ({ page }) => {
    await productsPage.searchProduct(PRODUCTS.searchTerm);
    await productsPage.assertSearchResultsVisible();
  });

  test('SHOPMATE-003c | user can add a product to the cart', async ({ page }) => {
    // Add first product and go to cart
    await productsPage.addFirstProductAndViewCart();

    // Assert cart has the item
    await cartPage.assertCartPageVisible();
    await cartPage.assertCartHasItems();
  });

});