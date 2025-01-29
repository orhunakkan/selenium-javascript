const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

class DriverManager {
  static async getDriver() {
    const options = new chrome.Options();

    // Add common options
    options.addArguments("--start-maximized");
    options.addArguments("--disable-notifications");

    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    return driver;
  }
}

module.exports = DriverManager;
