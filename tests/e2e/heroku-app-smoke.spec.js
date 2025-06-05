import { By } from "selenium-webdriver";
import { expect } from "chai";
import { createDriver } from "../../utilities/browser.js";

describe("Heroku App - Smoke Suite @smoke", () => {

  let driver;

  beforeEach(async () => {
    driver = await createDriver();
  });

  it("should load the homepage and validate title and basic elements", async () => {
    await driver.get("https://the-internet.herokuapp.com/");
    expect(await driver.getTitle()).to.equal("The Internet");
    expect(await driver.findElement(By.css("h1")).getText()).to.equal("Welcome to the-internet");
    expect(await driver.findElement(By.css("h2")).getText()).to.equal("Available Examples");
  });

  afterEach(async () => {
    await driver.quit();
  });
});
