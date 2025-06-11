import { expect } from "chai";
import { createDriver } from "../../utilities/browser.js";
import HerokuHomePage from "../../pages/HerokuHomePage.js";

describe("Heroku App - Smoke Suite", () => {

  let driver;
  let homePage;

  beforeEach(async () => {
    driver = await createDriver();
    homePage = new HerokuHomePage(driver);
    await homePage.navigateToHomePage();
  });

  it("should load the homepage and validate title and basic elements", async () => {
    expect(await homePage.getTitle()).to.equal("The Internet");
    expect(await homePage.getHeaderTitle()).to.equal("Welcome to the-internet");
    expect(await homePage.getSubHeaderTitle()).to.equal("Available Examples");
  });

  afterEach(async () => {
    await driver.quit();
  });
});
