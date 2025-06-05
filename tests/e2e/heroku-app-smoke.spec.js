import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";

describe("Heroku App - Smoke Suite", () => {

  it("should load the homepage and validate title and basic elements", async () => {
    const driver = await new Builder().forBrowser('MicrosoftEdge').build();
    await driver.get("https://the-internet.herokuapp.com/");
    expect(await driver.getTitle()).to.equal("The Internet");
    expect(await driver.findElement(By.css("h1")).getText()).to.equal("Welcome to the-internet");
    expect(await driver.findElement(By.css("h2")).getText()).to.equal("Available Examples");
    await driver.quit();
  });
});
