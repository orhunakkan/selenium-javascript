// utilities/driverFactory.js
import { Builder } from 'selenium-webdriver';

export class DriverFactory {
  static async build(browserName = 'chrome') {
    return await new Builder().forBrowser(browserName).build();
  }

  static async quit(driver) {
    if (driver) {
      await driver.quit();
    }
  }
}
