export const BASE_URL = 'https://automationexercise.com';

export const VALID_USER = {
  name: 'ShopMate Tester',
  email: 'shopmate.tester@gmail.com',
  password: 'ShopMate@2024',
};

export const TIMEOUTS = {
  short: 5000,
  medium: 10000,
  long: 30000,
};

export const PRODUCTS = {
  searchTerm: 'Top',
  firstProductName: 'Blue Top',
};

export const NAV_OPTIONS = {
  waitUntil: (process.env.CI ? 'domcontentloaded' : 'load') as 'domcontentloaded' | 'load',
  timeout: 60000,
};