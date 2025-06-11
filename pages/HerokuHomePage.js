import { By } from "selenium-webdriver";

class HerokuHomePage {

    constructor(driver) {
        this.driver = driver;
    }

    async getTitle() {
        return await this.driver.getTitle();
    }

    async getHeaderTitle() {
        return await this.driver.findElement(By.css("h1")).getText();
    }

    async getSubHeaderTitle() {
        return await this.driver.findElement(By.css("h2")).getText();
    }

    async navigateToHomePage() {
        await this.driver.get("https://the-internet.herokuapp.com/");
    }
}

export default HerokuHomePage;
