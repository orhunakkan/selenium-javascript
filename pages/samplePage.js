import { By, until } from 'selenium-webdriver';
import { WebDriverError } from '../utilities/sampleUtility.js';

/**
 * Page Object Model for Example.com page
 */
export class ExamplePage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://example.com';
        
        // Page elements
        this.selectors = {
            title: By.css('title'),
            heading: By.css('h1'),
            body: By.css('body')
        };
    }

    /**
     * Navigate to the example page
     */
    async navigate() {
        try {
            await this.driver.get(this.url);
            await this.driver.wait(until.titleIs('Example Domain'), 5000);
        } catch (error) {
            throw new WebDriverError(
                `Failed to navigate to ${this.url}`,
                { browser: await this.driver.getCapabilities() },
                error
            ); 
        }
    }

    /**
     * Get the page title
     */
    async getTitle() {
        return await this.driver.getTitle();
    }

    /**
     * Get the main heading text
     */
    async getHeadingText() {
        try {
            const heading = await this.driver.findElement(this.selectors.heading);
            return await heading.getText();
        } catch (error) {
            throw new WebDriverError(
                'Failed to get heading text',
                { selector: this.selectors.heading },
                error
            );
        }
    }

    /**
     * Get the body text
     */
    async getBodyText() {
        const body = await this.driver.findElement(this.selectors.body);
        return await body.getText();
    }

    /**
     * Check if heading element exists
     */
    async isHeadingPresent() {
        try {
            await this.driver.wait(
                until.elementLocated(this.selectors.heading),
                5000
            );
            return true;
        } catch (error) {
            return false;
        }
    }
}