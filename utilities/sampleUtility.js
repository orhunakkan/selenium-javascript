import { until } from 'selenium-webdriver';

/**
 * Common assertions for UI and API testing
 */
export class Assertions {
    /**
     * Asserts that a value equals an expected value
     */
    static assertEquals(actual, expected, message = '') {
        if (actual !== expected) {
            throw new Error(`${message} Expected ${expected}, but got ${actual}`);
        }
    }

    /**
     * Asserts that a value contains a substring
     */
    static assertContains(actual, expectedSubstring, message = '') {
        if (!actual.includes(expectedSubstring)) {
            throw new Error(`${message} Expected "${actual}" to contain "${expectedSubstring}"`);
        }
    }

    /**
     * Asserts that a value is truthy
     */
    static assertTrue(condition, message = '') {
        if (!condition) {
            throw new Error(`${message} Expected condition to be true`);
        }
    }

    /**
     * Asserts that a value is falsy
     */
    static assertFalse(condition, message = '') {
        if (condition) {
            throw new Error(`${message} Expected condition to be false`);
        }
    }

    /**
     * Asserts that an API response has a specific status code
     */
    static assertStatusCode(response, expectedStatus) {
        const status = response.status || response.statusCode;
        if (status !== expectedStatus) {
            throw new Error(`Expected status code ${expectedStatus}, but got ${status}`);
        }
    }

    /**
     * Asserts that a web element exists in the page
     */
    static async assertElementExists(driver, locator, timeout = 5000) {
        try {
            await driver.wait(until.elementLocated(locator), timeout);
        } catch (error) {
            throw new Error(`Element not found: ${locator}`);
        }
    }

    /**
     * Asserts that a web element contains specific text
     */
    static async assertElementText(driver, locator, expectedText, timeout = 5000) {
        try {
            const element = await driver.wait(until.elementLocated(locator), timeout);
            const actualText = await element.getText();
            if (actualText !== expectedText) {
                throw new Error(`Expected text "${expectedText}", but got "${actualText}"`);
            }
        } catch (error) {
            throw new Error(`Failed to verify element text: ${error.message}`);
        }
    }
}