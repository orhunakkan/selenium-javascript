import { By } from "selenium-webdriver";
import { getEnvironment } from "../utilities/environments.js";

export class HerokuAppHomePage {

    constructor(driver) {

        this.driver = driver;
        const env = process.env.ENV || 'dev';
        const environment = getEnvironment(env);
        this.url = environment.baseURL;

        this.locators = {
            pageTitle: By.css("h1"),
            subtitle: By.css("h2")
        };
    }

    async navigate() {
        await this.driver.get(this.url);
    }

    async getPageTitle() {
        return await this.driver.getTitle();
    }

    async getMainHeading() {
        const element = await this.driver.findElement(this.locators.pageTitle);
        return await element.getText();
    }

    async getSubtitle() {
        const element = await this.driver.findElement(this.locators.subtitle);
        return await element.getText();
    }
}
