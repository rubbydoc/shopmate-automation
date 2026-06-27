import { test, expect } from '../../fixtures/authenticatedPage';
import { VALID_USER } from '../../utils/constants';

test.describe('Auth API', () => {

  test('SHOPMATE-005d | POST verifyLogin with valid credentials returns success', async ({ apiHelper }) => {
    const response = await apiHelper.verifyLogin(
      VALID_USER.email,
      VALID_USER.password
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    // This API returns responseCode 200 for success
    expect(body.responseCode).toBe(200);
    expect(body.message).toContain('User exists');
  });

  test('SHOPMATE-005e | POST verifyLogin with invalid credentials returns error', async ({ apiHelper }) => {
    const response = await apiHelper.verifyLoginWithInvalidDetails();

    expect(response.status()).toBe(200);

    const body = await response.json();

    // API returns responseCode 404 when user not found
    expect(body.responseCode).toBe(404);
    expect(body.message).toContain('User not found');
  });

  test('SHOPMATE-005f | POST verifyLogin with missing password returns error', async ({ apiHelper }) => {
    // Send request with empty password
    const response = await apiHelper.verifyLogin(VALID_USER.email, '');

    expect(response.status()).toBe(200);

    const body = await response.json();

    // API returns 400 for bad/missing parameters
    expect(body.responseCode).toBe(404);
    expect(body.message).toContain('User not found');
  });

});