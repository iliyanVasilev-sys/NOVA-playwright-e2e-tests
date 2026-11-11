# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> Sign In - UI - Login form UI elements
- Location: tests/example.spec.ts:17:1

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Sign in' }) resolved to 3 elements:
    1) <button type="submit" class="ant-btn ant-btn-primary ant-btn-color-primary ant-btn-variant-solid button_button__ze_DF button_primary__zBKSu button_button-middle__MD05Z">…</button> aka getByRole('button', { name: 'Sign In', exact: true })
    2) <button type="button" class="ant-btn ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-block  button_button-middle__MD05Z styles_MSButton__EkLdU">…</button> aka getByRole('button', { name: 'Sign in with Microsoft' })
    3) <button type="button" class="ant-btn ant-btn-text ant-btn-color-default ant-btn-variant-text ant-btn-block  button_button-middle__MD05Z styles_MSButton__EkLdU">…</button> aka getByRole('button', { name: 'Sign in with AWS' })

Call log:
  - waiting for getByRole('button', { name: 'Sign in' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e7]
  - alert [ref=e9]: netFIELD Device Management | Sign In
  - generic [ref=e10]:
    - dialog:
      - generic:
        - generic:
          - generic:
            - generic:
              - generic: Privacy Policy
              - generic: Cookies are used on our website. Some of them are mandatory, while others allow us to improve your user experience on our website.
              - generic:
                - generic:
                  - generic:
                    - checkbox "Essential" [checked] [disabled]
                  - generic: Essential
                - generic:
                  - generic:
                    - checkbox "Statistics" [checked]
                  - generic: Statistics
              - generic:
                - button "Accept all" [active]
                - button "Save and Close"
                - button "Accept only essential cookies"
              - generic:
                - generic:
                  - button "Further information"
              - generic:
                - generic: Privacy Policy
                - text: "|"
                - generic: Imprint
  - generic [ref=e11]:
    - dialog:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - separator [ref=e24]
          - img "hilscher logo" [ref=e26] [cursor=pointer]
        - generic [ref=e27]: Sign in to your account
        - generic [ref=e34]:
          - img "user" [ref=e36]
          - textbox "Email" [ref=e39]
        - generic [ref=e45]:
          - img "lock" [ref=e47]
          - textbox "Password" [ref=e50]
          - img "eye-invisible" [ref=e52] [cursor=pointer]
        - generic [ref=e61] [cursor=pointer]:
          - checkbox "Keep me signed in" [ref=e63]
          - generic [ref=e65]: Keep me signed in
        - button "Sign In" [ref=e71] [cursor=pointer]
        - link "Can't access your account?" [ref=e73] [cursor=pointer]:
          - /url: /password/forgot
        - separator [ref=e74]:
          - generic [ref=e75]: or
        - generic [ref=e76]:
          - button "Sign in with Microsoft" [ref=e77] [cursor=pointer]
          - button "Sign in with AWS" [ref=e86] [cursor=pointer]
```

# Test source

```ts
  1  | /******************************************************************************
  2  |  * Copyright (c) Hilscher Gesellschaft fuer Systemautomation mbH
  3  |  * See Hilscher_netFIELD_Source_Code_License.pdf
  4  |  ******************************************************************************/
  5  | 
  6  | import { test, expect } from '@playwright/test';
  7  | import { HilscherPage } from '../methods/mainMethods.ts';
  8  | 
  9  | test.afterEach(async ({ page }, testInfo) => {
  10 |   await testInfo.attach('End-of-test screenshot', {
  11 |     body: await page.screenshot({ fullPage: true }),
  12 |     contentType: 'image/png',
  13 |   });
  14 | });
  15 | 
  16 | // QMetry test ID: NEPS-TC-10
  17 | test('Sign In - UI - Login form UI elements', async ({ page }) => {
  18 |   const pw = new HilscherPage(page);
  19 | 
  20 |   // Go to main page and login
  21 |   await pw.goToMainPage();
  22 |   // await page.pause(); 
> 23 |   await page.getByRole('button', { name: 'Sign in' }).click();
     |                                                       ^ Error: locator.click: Error: strict mode violation: getByRole('button', { name: 'Sign in' }) resolved to 3 elements:
  24 | 
  25 |   // Check the UI elements on the login form
  26 |   // Header
  27 |   await expect(page.getByRole('img').first()).toBeVisible();
  28 |   await expect(page.getByRole('img', { name: 'hilscher logo' })).toBeVisible();
  29 |   await expect(page.getByText('Sign in to your account')).toBeVisible();
  30 |   await expect(page.locator('#basic')).toContainText('Sign in to your account');
  31 |   // Body
  32 |   await expect(page.getByLabel('user').locator('path')).toBeVisible();
  33 |   await expect(page.getByLabel('lock').locator('svg')).toBeVisible();
  34 |   await expect(page.getByPlaceholder('Email')).toBeVisible();
  35 |   await expect(page.getByPlaceholder('Password')).toBeVisible();
  36 |   await expect(page.getByLabel('eye').locator('svg')).toBeVisible();
  37 |   await expect(page.getByLabel('Keep me signed in')).toBeVisible();
  38 |   await expect(page.getByText('Keep me signed in')).toBeVisible();
  39 |   await expect(page.locator('#basic')).toContainText('Keep me signed in');
  40 |   await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  41 |   await expect(page.getByRole('button')).toContainText('Sign In');
  42 |   await expect(page.getByRole('link', { name: "Can't access your account?" })).toBeVisible();
  43 |   await expect(page.getByRole('link')).toContainText("Can't access your account?");
  44 | });
  45 | 
```