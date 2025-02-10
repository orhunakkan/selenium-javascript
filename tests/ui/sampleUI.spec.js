import { Builder, By, until } from 'selenium-webdriver';

(async function exampleTest() {
    // Initialize the browser (Chrome in this example)
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to example.com
        await driver.get('https://example.com');

        // Wait until the title is "Example Domain"
        await driver.wait(until.titleIs('Example Domain'), 5000);

        // Get the page title and log it
        let title = await driver.getTitle();
        console.log('Page Title:', title);

        // Optionally, find and log the main heading text (usually within an <h1> tag)
        let heading = await driver.findElement(By.css('h1')).getText();
        console.log('Heading:', heading);
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        // Quit the browser
        await driver.quit();
    }
})();

