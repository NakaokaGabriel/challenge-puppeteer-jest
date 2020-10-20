import puppeteer from 'puppeteer';

import { Login } from '../pages/login';

let page, browser, loginPage;

const width = 1920;
const height = 1080;

const timeout = 16000;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true
  });

  page = await browser.newPage();
  await page.setViewport({ width, height });

  loginPage = new Login(page);
});

afterAll(async () => {
  await page.close();

  browser.close();
});

describe('Authentication', () => {
  it('should be able show content when placing the correct credentials', async () => {
    await loginPage.puppeteerPage(page);
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    const loginSuccessfull = await loginPage.message();

    expect(loginSuccessfull).toBe('You logged into a secure area');
  }, timeout);

  it('should not be able login with incorrect username', async () => {
    await loginPage.puppeteerPage(page);
    await loginPage.login('incorrectUsername', 'SuperSecretPassword!');

    const incorrectUsername = await loginPage.message();

    expect(incorrectUsername).toBe('Your username is invalid');
  }, timeout);

  it('should not be able login with incorrect password', async () => {
    await loginPage.puppeteerPage(page);
    await loginPage.login('tomsmith', 'incorrectPassword');

    const incorrectPassword = await loginPage.message();

    expect(incorrectPassword).toBe('Your password is invalid');
  }, timeout);
});
