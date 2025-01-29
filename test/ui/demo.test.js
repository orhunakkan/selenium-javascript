const { describe, it, before, after } = require("mocha");
const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");
const DriverManager = require("../../utils/driver");
const AllureHelper = require("../../utils/allureHelper");

describe("Demo Website Test", function () {
  let driver;

  before(async function () {
    driver = await DriverManager.getDriver();
  });

  it("should navigate to demo website", async function () {
    AllureHelper.addDescription("Test to verify demo website navigation");
    AllureHelper.addLabel("feature", "UI Navigation");

    // Navigate to a reliable demo website
    await driver.get("https://the-internet.herokuapp.com/");

    // Wait for and verify the page title
    const pageTitle = await driver.findElement(By.css("h1")).getText();
    expect(pageTitle).to.equal("Welcome to the-internet");

    // Take a screenshot for the report
    await AllureHelper.addScreenshot(driver, "Demo Page Loaded");
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });
});
