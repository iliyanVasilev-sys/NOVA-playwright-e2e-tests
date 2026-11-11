/******************************************************************************
 * Copyright (c) Hilscher Gesellschaft fuer Systemautomation mbH
 * See Hilscher_netFIELD_Source_Code_License.pdf
 ******************************************************************************/

import { test, expect } from '@playwright/test';
import { HilscherPage } from '../methods/mainMethods.ts';

test.afterEach(async ({ page }, testInfo) => {
  await testInfo.attach('End-of-test screenshot', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
});

// QMetry test ID: NEPS-TC-10
test('Sign In - UI - Login form UI elements', async ({ page }) => {
  const pw = new HilscherPage(page);

  // Go to main page and login
  await pw.goToMainPage();
  // await page.pause(); 
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Check the UI elements on the login form
  // Header
  await expect(page.getByRole('img').first()).toBeVisible();
  await expect(page.getByRole('img', { name: 'hilscher logo' })).toBeVisible();
  await expect(page.getByText('Sign in to your account')).toBeVisible();
  await expect(page.locator('#basic')).toContainText('Sign in to your account');
  // Body
  await expect(page.getByLabel('user').locator('path')).toBeVisible();
  await expect(page.getByLabel('lock').locator('svg')).toBeVisible();
  await expect(page.getByPlaceholder('Email')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByLabel('eye').locator('svg')).toBeVisible();
  await expect(page.getByLabel('Keep me signed in')).toBeVisible();
  await expect(page.getByText('Keep me signed in')).toBeVisible();
  await expect(page.locator('#basic')).toContainText('Keep me signed in');
  await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  await expect(page.getByRole('button')).toContainText('Sign In');
  await expect(page.getByRole('link', { name: "Can't access your account?" })).toBeVisible();
  await expect(page.getByRole('link')).toContainText("Can't access your account?");
});
