import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';

export async function createChromeDriver() {
  const options = new Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  return driver;
}

export async function quitDriver(driver) {
  if (driver) {
    await driver.quit();
  }
}
