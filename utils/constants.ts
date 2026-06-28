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

export const CONTACT_FORM = {
  name: 'ShopMate Tester',
  email: 'shopmate.tester@gmail.com',
  subject: 'Test Inquiry from Automation',
  message: 'This is an automated test message sent by the ShopMate QA automation suite.',
  longMessage: 'A'.repeat(1000),
  invalidEmail: 'notanemail',
  xssName: '<script>alert(1)</script>',
  sqlSubject: `'; DROP TABLE users; --`,
};

// Known bugs — update assertions when fixed
export const KNOWN_BUGS = {
  SHOPMATE_BUG_001: 'Contact form accepts submission without required Name field',
};