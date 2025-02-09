import { expect } from "chai";
import DriverUtil from "../../utilities/sampleUtility.js";
import config from "../../selenium.config.js";

describe('Sample UI Test', function() {
  /** @type {import('selenium-webdriver').WebDriver} */
  let driver;

  // Set timeout to 30 seconds
  this.timeout(30000);

  beforeEach(async function() {
    driver = await DriverUtil.createDriver();
  });

  afterEach(async function() {
    await DriverUtil.quitDriver(driver);
  });

  it('should open the browser and load the page', async function() {
    await driver.get(config.baseUrls.ui);
    const title = await driver.getTitle();
    expect(title).to.equal('Example Domain');
  });
});
