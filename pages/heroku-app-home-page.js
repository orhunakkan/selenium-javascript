import { By } from "selenium-webdriver";

export class HerokuAppHomePage {

    constructor(driver) {

        this.driver = driver;

        this.locators = {
            pageTitle: By.css("h1"),
            subtitle: By.css("h2")
        };
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
