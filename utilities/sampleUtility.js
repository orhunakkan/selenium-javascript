import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import config from '../selenium.config.js';

class DriverUtil {
  static async createDriver() {
    const options = new chrome.Options();
    options.addArguments('--start-maximized');

    const driver = await new Builder()
      .forBrowser(config.selenium.browser)
      .setChromeOptions(options)
      .build();

    // Set timeouts from config
    await driver.manage().setTimeouts({
      implicit: config.selenium.implicitTimeout,
      pageLoad: config.selenium.pageLoadTimeout,
    });

    return driver;
  }

  /**
   * @param {import('selenium-webdriver').WebDriver} driver
   */
  static async quitDriver(driver) {
    if (driver) {
      await driver.quit();
    }
  }
}

export default DriverUtil;