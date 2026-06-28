import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  // --- Locators ---
  readonly productsHeading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchedProductsHeading: Locator;
  readonly productsList: Locator;
  readonly firstProductAddToCart: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productsHeading = page.getByRole('heading', { name: 'All Products' });
    this.searchInput = page.getByPlaceholder('Search Product');
    this.searchButton = page.locator('#submit_search');
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.productsList = page.locator('.productinfo');
    this.firstProductAddToCart = page.locator('.productinfo').first().getByText('Add to cart');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });

    // Scope View Cart link inside the modal only — not the navbar
    this.viewCartLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
  }

  // --- Actions ---

  async navigate() {
    await this.page.goto('/products');
  }

  async assertProductsPageVisible() {
    await expect(this.productsHeading).toBeVisible();
  }

  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async assertSearchResultsVisible() {
    await expect(this.searchedProductsHeading).toBeVisible();
    await expect(this.productsList.first()).toBeVisible();
  }

  async assertProductsListLoaded() {
    // Wait for at least one product to be visible
    await expect(this.productsList.first()).toBeVisible();
    // Assert there are multiple products on the page
    const count = await this.productsList.count();
    expect(count).toBeGreaterThan(0);
  }

  async addFirstProductToCart() {
    await this.firstProductAddToCart.click();
    // After clicking, a modal appears — click Continue Shopping
    await this.continueShoppingButton.click();
  }

  async addFirstProductAndViewCart() {
    await this.firstProductAddToCart.click();

    // Wait for modal to appear, then click View Cart inside it
    const modal = this.page.locator('#cartModal');
    await expect(modal).toBeVisible();
    await modal.getByRole('link', { name: 'View Cart' }).click();
  }
}