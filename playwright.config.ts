import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where your tests live
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in source
  forbidOnly: !!process.env.CI,

  // Retry failed tests once on CI, never locally
  retries: process.env.CI ? 1 : 0,

  // Use 4 workers locally, let CI decide in pipeline
  workers: process.env.CI ? 1 : 4,

  // Reporter: HTML report for local, and line reporter for CI
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],

  use: {
    // Base URL — we'll point this to our test site
    baseURL: 'https://automationexercise.com',

    // Collect traces on test failure for debugging
    trace: 'on-first-retry',

    // Take screenshot on failure
    screenshot: 'only-on-failure',

    // Record video on failure
    video: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});