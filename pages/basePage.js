import { until } from 'selenium-webdriver';

export class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.timeout = 10000;
  }

  // Reusable navigation method
  async navigate(url) {
    await this.driver.get(url);
  }

  // Reusable element interaction methods
  async findElement(locator) {
    return await this.driver.findElement(locator);
  }

  async findElements(locator) {
    return await this.driver.findElements(locator);
  }

  async click(locator) {
    const element = await this.findElement(locator);
    await element.click();
    return element;
  }

  async type(locator, text) {
    const element = await this.findElement(locator);
    await element.clear();
    await element.sendKeys(text);
    return element;
  }

  async selectByValue(locator, value) {
    const element = await this.findElement(locator);
    const select = new (await import('selenium-webdriver/lib/select')).Select(
      element
    );
    await select.selectByValue(value);
    return element;
  }

  async selectByVisibleText(locator, text) {
    const element = await this.findElement(locator);
    const select = new (await import('selenium-webdriver/lib/select')).Select(
      element
    );
    await select.selectByVisibleText(text);
    return element;
  }

  async waitForElementVisible(locator) {
    return await this.driver.wait(until.elementLocated(locator), this.timeout);
  }

  async waitForElementClickable(locator) {
    await this.waitForElementVisible(locator);
    return await this.driver.wait(
      until.elementIsEnabled(await this.findElement(locator)),
      this.timeout
    );
  }

  async getText(locator) {
    const element = await this.findElement(locator);
    return await element.getText();
  }

  async isDisplayed(locator) {
    try {
      const element = await this.findElement(locator);
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }
}
