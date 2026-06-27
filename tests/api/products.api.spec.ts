import { test, expect } from '../../fixtures/authenticatedPage';

test.describe('Products API', () => {

  test('SHOPMATE-005a | GET all products returns 200 and product list', async ({ apiHelper }) => {
    const response = await apiHelper.getAllProducts();

    // Assert the response status is 200 OK
    expect(response.status()).toBe(200);

    // Parse the response body as JSON
    const body = await response.json();

    // This API wraps products in a responseCode/products structure
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeDefined();
    expect(Array.isArray(body.products)).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('SHOPMATE-005b | GET all products response has correct product structure', async ({ apiHelper }) => {
    const response = await apiHelper.getAllProducts();
    const body = await response.json();

    // Pick the first product and validate its structure
    const firstProduct = body.products[0];

    // Every product should have these fields
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
  });

  test('SHOPMATE-005c | GET all brands returns 200 and brands list', async ({ apiHelper }) => {
    const response = await apiHelper.getAllBrands();

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.brands).toBeDefined();
    expect(Array.isArray(body.brands)).toBeTruthy();
    expect(body.brands.length).toBeGreaterThan(0);
  });

});