import { APIRequestContext, expect } from '@playwright/test';

// This class wraps all API calls for the ShopMate app
// Think of it like a Page Object, but for the API instead of the UI
export class ApiHelper {

  // The Playwright API request context — this is what makes HTTP calls
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // --- Products API ---

  async getAllProducts() {
    const response = await this.request.get('/api/productsList');
    return response;
  }

  async getAllBrands() {
    const response = await this.request.get('/api/brandsList');
    return response;
  }

  // --- Auth API ---

  async verifyLogin(email: string, password: string) {
    const response = await this.request.post('/api/verifyLogin', {
      // form data — this API uses form encoding, not JSON
      form: {
        email,
        password,
      },
    });
    return response;
  }

  async verifyLoginWithInvalidDetails() {
    const response = await this.request.post('/api/verifyLogin', {
      form: {
        email: 'invalid@email.com',
        password: 'wrongpassword',
      },
    });
    return response;
  }

  async getUserDetails(email: string, password: string) {
    const response = await this.request.get('/api/getUserDetailByEmail', {
      params: { email },
    });
    return response;
  }
}