import { By } from "selenium-webdriver";
import { expect } from "chai";
import { createDriver } from "../../utils/browser.js";

describe("Heroku App - Smoke Suite @smoke", () => {

  it("should load the homepage and validate title and basic elements", async () => {
    const driver = await createDriver();
    
    try {
      await driver.get("https://the-internet.herokuapp.com/");
      expect(await driver.getTitle()).to.equal("The Internet");
      expect(await driver.findElement(By.css("h1")).getText()).to.equal("Welcome to the-internet");
      expect(await driver.findElement(By.css("h2")).getText()).to.equal("Available Examples");
    } finally {
      await driver.quit();
    }
  });
});
