import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],

  use: {
    baseURL: 'https://automationexercise.com',
    navigationTimeout: 60000,  // add this
    actionTimeout: 15000,       // add this
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    // Run auth setup first
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Unauthenticated project — for login, homepage, registration tests
    {
      name: 'chromium-public',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['**/homepage.spec.ts', '**/login.spec.ts'],
    },

    // Authenticated project — for everything else
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
      testIgnore: ['**/homepage.spec.ts', '**/login.spec.ts'],
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: '.auth/user.json',
      },
      testIgnore: ['**/homepage.spec.ts', '**/login.spec.ts'],
      dependencies: ['setup'],
    },
  ],
});