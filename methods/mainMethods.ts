/******************************************************************************
 * Copyright (c) Hilscher Gesellschaft fuer Systemautomation mbH
 * See Hilscher_netFIELD_Source_Code_License.pdf
 ******************************************************************************/

import { Page, expect, request } from '@playwright/test';
import { faker } from '@faker-js/faker';
import * as path from 'path';

export class HilscherPage {
  // Fields
  readonly page: Page;
  static insertLoginCredentialsAndLogin: any;

  // Construct page type of Page
  constructor(page: Page) {
    this.page = page;
  }

  // Go to main page
  async goToMainPage() {
    await this.page.goto(process.env.URL);
    await this.page.getByRole('button', { name: 'Accept all' }).click();
  }

  //Login
  async insertLoginCredentialsAndLogin() {
    await this.page.getByPlaceholder('Email').click();
    await this.page.getByPlaceholder('Email').fill(process.env.VALID_EMAIL);
    await this.page.getByPlaceholder('Password').click();
    await this.page.getByPlaceholder('Password').fill(process.env.VALID_PASS);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await expect(this.page.getByLabel('Overview')).toContainText('Welcome to the netFIELD Cloud dashboard');
  }

  // Logout
  async logout() {
    await this.page.locator(`.header_dropdown__fmv_r`).click();
    await this.page.getByText('Sign Out').click();
  }

  // Navigate to the Profile Page
  async navigateToProfilePage() {
    await this.page.locator(`.header_dropdown__fmv_r`).click();
    await this.page.getByText('Profile').click();
    await expect(this.page.getByLabel('Profile')).toContainText('Profile Settings');
  }

  // Navigate to the OS Manger Page and verify that the page is loaded
  async navigateToOSmanagerPage() {
    await expect(this.page.getByText('OS manager')).toBeVisible();
    await expect(this.page.getByRole('menuitem', { name: 'OS manager' }).locator('span').nth(2)).toBeVisible();
    await this.page.getByText('OS manager').click();

    // Page Title
    await this.page.waitForTimeout(3000);
    await expect(this.page.getByText('OS Manager', { exact: true })).toBeVisible();
    await expect(this.page.getByRole('main')).toContainText('OS Manager');
  }

  //Open the main page and login
  async openMainPageAndLogin(email: string, password: string) {
    await this.page.goto(process.env.URL);
    await this.page.getByRole('button', { name: 'Accept all' }).click();
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.page.getByPlaceholder('Email').click();
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').click();
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await expect(this.page.getByLabel('Overview')).toContainText('Welcome to the netFIELD Cloud dashboard');
  }
}
