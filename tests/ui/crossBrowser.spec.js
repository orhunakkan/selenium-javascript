import { Builder, By, until } from 'selenium-webdriver';
import { Assertions } from '../../utilities/sampleUtility.js';

const browsers = ['chrome', 'firefox', 'MicrosoftEdge'];

async function runTestFor(browserName) {
    let driver;
    try {
        console.log(`\n--- Running test in ${browserName} ---`);
        driver = await new Builder().forBrowser(browserName).build();

        await driver.get('https://example.com');

        // Assert page title
        await driver.wait(until.titleIs('Example Domain'), 5000);
        const title = await driver.getTitle();
        Assertions.assertEquals(title, 'Example Domain', `${browserName}: Page title does not match`);

        // Assert h1 element exists and has correct text
        const h1Locator = By.css('h1');
        await Assertions.assertElementExists(driver, h1Locator);
        await Assertions.assertElementText(driver, h1Locator, 'Example Domain');

        console.log(`${browserName}: All assertions passed!`);
    } catch (err) {
        console.error(`Error running test in ${browserName}:`, err);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

(async function runTests() {
    for (const browser of browsers) {
        await runTestFor(browser);
    }
})();
