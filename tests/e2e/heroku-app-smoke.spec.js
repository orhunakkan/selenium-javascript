import { createDriver } from "../../utilities/driver.js";
import { HerokuAppHomePage } from "../../pages/heroku-app-home-page.js";
import { baseUrl } from "../../utilities/environments.js";
import { ScreenshotUtility } from "../../utilities/screenshot.js";
import { expect } from "chai";

describe("Heroku App - Smoke Suite", () => {

    let driver;
    let homePage;

    beforeEach(async () => {
        driver = await createDriver();
        homePage = new HerokuAppHomePage(driver);
        await driver.get(baseUrl);
    });

    afterEach(async function () {
        if (this.currentTest.state === 'failed') {
            const suiteName = this.currentTest.parent.title;
            const testName = `${suiteName}_${this.currentTest.title}`;
            await ScreenshotUtility.captureScreenshot(driver, testName, 'failed');
        }

        if (driver) {
            await driver.quit();
        }
    });

    it("should load the homepage and validate title and basic elements", async () => {
        expect(await homePage.getPageTitle()).to.equal("The Internet");
        expect(await homePage.getMainHeading()).to.equal("Welcome to the-internet");
        expect(await homePage.getSubtitle()).to.equal("Available Examples");
    });
});
