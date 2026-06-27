import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  // --- Locators ---
  readonly cartHeading: Locator;
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cartHeading = page.getByText('Shopping Cart');
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.emptyCartMessage = page.getByText('Cart is empty!');
  }

  // --- Actions ---

  async navigate() {
    await this.page.goto('/view_cart');
  }

  async assertCartPageVisible() {
    await expect(this.cartHeading).toBeVisible();
  }

  async assertCartHasItems() {
    await expect(this.cartItems.first()).toBeVisible();
    const count = await this.cartItems.count();
    expect(count).toBeGreaterThan(0);
  }

  async assertCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
}