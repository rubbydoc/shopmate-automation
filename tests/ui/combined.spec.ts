import { test, expect } from '../../fixtures/authenticatedPage';
import { VALID_USER } from '../../utils/constants';

test.describe('Combined API + UI Tests', () => {

    test('SHOPMATE-006a | API confirmed product count matches UI product count @regression', async ({ apiHelper, productsPage }) => {

        // Step 1 — Ask the API how many products exist
        const apiProductCount = await apiHelper.getProductCount();
        console.log(`API reports ${apiProductCount} products`);

        // Step 2 — Go to the products page in the browser
        await productsPage.navigate();
        await productsPage.assertProductsPageVisible();

        // Step 3 — Count how many products are visible in the UI
        const uiProductCount = await productsPage.productsList.count();
        console.log(`UI shows ${uiProductCount} products`);

        // Step 4 — Both should match — same data, two different layers
        expect(uiProductCount).toBe(apiProductCount);
    });

    test('SHOPMATE-006b | API product details match what UI displays @regression', async ({ page, apiHelper }) => {

        // Step 1 — Get product #1 details from the API
        const apiProduct = await apiHelper.getProductById(1);
        console.log(`API product name: ${apiProduct.name}`);
        console.log(`API product price: ${apiProduct.price}`);

        // Step 2 — Navigate to that product's detail page in the UI
        await page.goto('/product_details/1');

        // Step 3 — Assert the UI shows the same product name as the API
        await expect(
            page.getByRole('heading', { name: apiProduct.name })
        ).toBeVisible();

        // Step 4 — Assert the price displayed matches API data
        // The API returns "Rs. 500" format so we check it's on the page
        await expect(
            page.getByText(apiProduct.price)
        ).toBeVisible();
    });

    test('SHOPMATE-006c | API confirms user exists and UI reflects logged in state @smoke @regression', async ({ page, apiHelper }) => {

        // Step 1 — API precondition check: verify user account exists
        const userExists = await apiHelper.verifyUserExists(
            VALID_USER.email,
            VALID_USER.password
        );
        expect(userExists, 'User account must exist before running UI test').toBe(true);

        // Step 2 — Navigate to homepage (session already authenticated)
        await page.goto('/');

        // Step 3 — Assert UI shows the logged in state
        // No need to log in manually — storageState already handles this
        await expect(page.getByText('Logged in as')).toBeVisible();
        await expect(page.getByText(VALID_USER.name)).toBeVisible();
    });

    test('SHOPMATE-006d | API + UI cart validation @regression', async ({ page, apiHelper, productsPage, cartPage }) => {

        // Step 1 — API confirms product #1 exists and get its name
        const apiProduct = await apiHelper.getProductById(1);
        expect(apiProduct).toBeDefined();
        console.log(`Testing with product: ${apiProduct.name}`);

        // Step 2 — UI: navigate to products and add the first product to cart
        await productsPage.navigate();
        await productsPage.assertProductsPageVisible();
        await productsPage.addFirstProductAndViewCart();

        // Step 3 — UI: verify cart page loaded with items
        await cartPage.assertCartPageVisible();
        await cartPage.assertCartHasItems();

        // Step 4 — UI: verify the product name from API appears in the cart
        await expect(
            page.getByRole('link', { name: apiProduct.name })
        ).toBeVisible();
    });

});