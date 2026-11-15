import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

const isWindows = process.platform === 'win32';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  reporter: [['allure-playwright']],
  use: {
    headless: !isWindows,
  },

  projects: isWindows
    ? [
        {
          name: 'Google Chrome',
          use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        },
      ]
    : [
        {
          name: 'Microsoft Edge',
          use: { ...devices['Desktop Edge'], channel: 'msedge' },
        },
        {
          name: 'Google Chrome',
          use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        },
        {
          name: 'Safari',
          use: { ...devices['Desktop Safari'] },
        },
        {
          name: 'Firefox',
          use: { ...devices['Desktop Firefox'] },
        },
      ],
});
