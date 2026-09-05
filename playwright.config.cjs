const { defineConfig, devices } = require('@playwright/test');
const { baseURL } = require('./e2e/settings.cjs');

module.exports = defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.js',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  forbidOnly: Boolean(process.env.CI),
  timeout: 90000,
  expect: { timeout: 15000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  globalSetup: './e2e/preflight.cjs',
  use: {
    baseURL,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'on',
    launchOptions: { slowMo: Number(process.env.E2E_SLOW_MO || 0) },
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node e2e/serve.cjs',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 15000,
  },
});
