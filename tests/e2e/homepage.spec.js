import { expect } from 'chai';
import { createChromeDriver, quitDriver } from '../../utilities/driver-manager.js';
import HomePage from '../../pages/homepage.js';
import dotenv from 'dotenv';

dotenv.config();

describe('Homepage Test', () => {
  let driver;
  let homePage;

  beforeEach(async () => {
    driver = await createChromeDriver();
    homePage = new HomePage(driver);
    await driver.get(process.env.ENV);
  });

  afterEach(async () => {
    await quitDriver(driver);
  });

  it('should verify the title of the page', async () => {
    expect(await driver.getTitle()).to.equal('Hands-On Selenium WebDriver with Java');
  });
});
