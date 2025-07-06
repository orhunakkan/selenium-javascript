import { Builder } from "selenium-webdriver";
import edge from "selenium-webdriver/edge.js";

/**
 * Creates and returns a Selenium WebDriver instance for Microsoft Edge.
 * The browser will run in headless mode with a 30-second implicit wait for element finding operations.
 * @returns {Promise<import("selenium-webdriver").WebDriver>} A promise that resolves to a WebDriver instance.
 */
export async function createDriver() {

    const options = new edge.Options();

    options.addArguments("--headless");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--window-size=1920,1080");

    const driver = await new Builder()
        .forBrowser("MicrosoftEdge")
        .setEdgeOptions(options)
        .build();
        
    await driver.manage().setTimeouts({ implicit: 30000 });
        
    return driver;
}
