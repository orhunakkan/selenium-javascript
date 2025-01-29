const { By, until } = require("selenium-webdriver");
const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.usernameInput = By.id("username");
    this.passwordInput = By.id("password");
    this.loginButton = By.css('button[type="submit"]');
  }

  async login(username, password) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }
}

module.exports = LoginPage;
