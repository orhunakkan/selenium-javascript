import {Browser, Builder} from "selenium-webdriver";
import {expect} from "chai";

describe('Homepage URL validation', () => {
    it('should go to homepage and verify its URL', async () => {
        let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://bonigarcia.dev/selenium-webdriver-java/index.html');
        expect(await driver.getTitle()).equal('Hands-On Selenium WebDriver with Java');
        await driver.quit();
    });
})