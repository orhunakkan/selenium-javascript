import { Builder, By, until } from 'selenium-webdriver';

const browsers = ['chrome', 'firefox', 'MicrosoftEdge'];

async function runTestFor(browserName) {
    let driver;
    try {
        console.log(`\n--- Running test in ${browserName} ---`);
        driver = await new Builder().forBrowser(browserName).build();

        // Navigate to example.com
        await driver.get('https://example.com');

        // Wait until the title is "Example Domain"
        await driver.wait(until.titleIs('Example Domain'), 5000);

        // Get and log the page title
        let title = await driver.getTitle();
        console.log(`${browserName} Title: ${title}`);

        // Get and log the main heading (e.g., the <h1> text)
        let heading = await driver.findElement(By.css('h1')).getText();
        console.log(`${browserName} Heading: ${heading}`);
    } catch (err) {
        console.error(`Error running test in ${browserName}:`, err);
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

(async function runTests() {
    // Run tests sequentially for each browser in the list
    for (const browser of browsers) {
        await runTestFor(browser);
    }
})();
