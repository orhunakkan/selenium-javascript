const allure = require('allure-mocha/runtime');

class AllureHelper {
    static addScreenshot(driver, name) {
        return driver.takeScreenshot().then((screenshot) => {
            allure.attachment(name, Buffer.from(screenshot, 'base64'), 'image/png');
        });
    }

    static addLabel(name, value) {
        allure.label(name, value);
    }

    static addDescription(description) {
        allure.description(description);
    }
}

module.exports = AllureHelper;