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
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    // Step 1 — Run auth setup first, before any tests
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },

    // Step 2 — Run Chromium tests using the saved auth session
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Load the saved login session for every test
        storageState: '.auth/user.json',
      },
      // Only run after setup is complete
      dependencies: ['setup'],
    },

    // Step 3 — Run Firefox tests using the same saved session
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: '.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});