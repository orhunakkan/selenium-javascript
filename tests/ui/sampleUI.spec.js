import { Builder, By, until } from 'selenium-webdriver';
import { Assertions } from '../../utilities/sampleUtility.js';

(async function exampleTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://example.com');

        // Assert page title
        await driver.wait(until.titleIs('Example Domain'), 5000);
        const title = await driver.getTitle();
        Assertions.assertEquals(title, 'Example Domain', 'Page title does not match');

        // Assert h1 element exists and has correct text
        const h1Locator = By.css('h1');
        await Assertions.assertElementExists(driver, h1Locator);
        await Assertions.assertElementText(driver, h1Locator, 'Example Domain');

        // Assert page contains expected text
        const bodyText = await driver.findElement(By.css('body')).getText();
        Assertions.assertContains(bodyText, 'for use in illustrative examples');

        console.log('All assertions passed successfully!');
    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await driver.quit();
    }
})();

