import { By, until } from 'selenium-webdriver';

export class RegistrationPage {
  constructor(driver) {
    this.driver = driver;
    this.url = 'https://practice.cydeo.com/registration_form';

    // Define all locators used on this page
    this.firstNameInput = By.name('firstname');
    this.lastNameInput = By.name('lastname');
    this.usernameInput = By.name('username');
    this.emailInput = By.name('email');
    this.passwordInput = By.name('password');
    this.phoneInput = By.name('phone');
    this.genderMaleRadio = By.css('input[name="gender"][value="male"]');
    this.genderFemaleRadio = By.css('input[name="gender"][value="female"]');
    this.genderOtherRadio = By.css('input[name="gender"][value="other"]');
    this.birthdayInput = By.name('birthday');
    this.departmentSelect = By.name('department');
    this.jobTitleSelect = By.name('job_title');
    this.javaCheckbox = By.id('inlineCheckbox2');
    this.javascriptCheckbox = By.id('inlineCheckbox3');
    this.cPlusCheckbox = By.id('inlineCheckbox1');
    this.submitButton = By.id('wooden_spoon');

    // Validation error message locators
    this.usernameError = By.xpath('//small[contains(text(), "username must be more than 6")]');
    this.emailError = By.xpath('//small[contains(text(), "Email format is not correct")]');
    this.passwordError = By.xpath('//small[contains(text(), "password must have at least 8 characters")]');
    this.phoneError = By.xpath('//small[contains(text(), "Phone format is not correct")]');

    // Success message locator
    this.successMessage = By.className('alert alert-success');
  }

  /**
   * Opens the registration form page
   */
  async navigateTo() {
    await this.driver.get(this.url);
  }

  /**
   * Enters first name in the form
   * @param {string} firstName
   */
  async enterFirstName(firstName) {
    await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
  }

  /**
   * Enters last name in the form
   * @param {string} lastName
   */
  async enterLastName(lastName) {
    await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
  }

  /**
   * Enters username in the form
   * @param {string} username
   */
  async enterUsername(username) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
  }

  /**
   * Enters email in the form
   * @param {string} email
   */
  async enterEmail(email) {
    await this.driver.findElement(this.emailInput).sendKeys(email);
  }

  /**
   * Enters password in the form
   * @param {string} password
   */
  async enterPassword(password) {
    await this.driver.findElement(this.passwordInput).sendKeys(password);
  }

  /**
   * Enters phone number in the form
   * @param {string} phone
   */
  async enterPhone(phone) {
    await this.driver.findElement(this.phoneInput).sendKeys(phone);
  }

  /**
   * Selects gender
   * @param {string} gender - 'male', 'female', or 'other'
   */
  async selectGender(gender) {
    if (gender.toLowerCase() === 'male') {
      await this.driver.findElement(this.genderMaleRadio).click();
    } else if (gender.toLowerCase() === 'female') {
      await this.driver.findElement(this.genderFemaleRadio).click();
    } else {
      await this.driver.findElement(this.genderOtherRadio).click();
    }
  }

  /**
   * Enters birthday in the form
   * @param {string} birthday - Format: MM/DD/YYYY
   */
  async enterBirthday(birthday) {
    await this.driver.findElement(this.birthdayInput).sendKeys(birthday);
  }

  /**
   * Selects department from dropdown
   * @param {string} departmentValue - Value attribute of the option
   */
  async selectDepartment(departmentValue) {
    const select = await this.driver.findElement(this.departmentSelect);
    await select.click();
    await this.driver.findElement(By.css(`option[value="${departmentValue}"]`)).click();
  }

  /**
   * Selects job title from dropdown
   * @param {string} jobTitle - Text of the option
   */
  async selectJobTitle(jobTitle) {
    const select = await this.driver.findElement(this.jobTitleSelect);
    await select.click();
    await this.driver.findElement(By.xpath(`//option[text()="${jobTitle}"]`)).click();
  }

  /**
   * Selects programming languages
   * @param {Array} languages - Array of languages ('java', 'javascript', 'c++')
   */
  async selectProgrammingLanguages(languages) {
    if (languages.includes('java')) {
      await this.driver.findElement(this.javaCheckbox).click();
    }
    if (languages.includes('javascript')) {
      await this.driver.findElement(this.javascriptCheckbox).click();
    }
    if (languages.includes('c++')) {
      await this.driver.findElement(this.cPlusCheckbox).click();
    }
  }

  /**
   * Submits the registration form
   */
  async submitForm() {
    await this.driver.findElement(this.submitButton).click();
  }

  /**
   * Checks if username error is displayed
   * @returns {Promise<boolean>}
   */
  async isUsernameErrorDisplayed() {
    try {
      return await this.driver.findElement(this.usernameError).isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if email error is displayed
   * @returns {Promise<boolean>}
   */
  async isEmailErrorDisplayed() {
    try {
      return await this.driver.findElement(this.emailError).isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if password error is displayed
   * @returns {Promise<boolean>}
   */
  async isPasswordErrorDisplayed() {
    try {
      return await this.driver.findElement(this.passwordError).isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Checks if phone error is displayed
   * @returns {Promise<boolean>}
   */
  async isPhoneErrorDisplayed() {
    try {
      return await this.driver.findElement(this.phoneError).isDisplayed();
    } catch (error) {
      return false;
    }
  }

  /**
   * Gets the success message after successful registration
   * @returns {Promise<string>}
   */
  async getSuccessMessage() {
    await this.driver.wait(until.urlContains('registration_confirmation'), 5000);
    return await this.driver.findElement(this.successMessage).getText();
  }

  /**
   * Gets the current URL
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return await this.driver.getCurrentUrl();
  }

  /**
   * Fill the entire form with given data
   * @param {Object} userData - User data object containing all form fields
   */
  async fillEntireForm(userData) {
    await this.enterFirstName(userData.firstName);
    await this.enterLastName(userData.lastName);
    await this.enterUsername(userData.username);
    await this.enterEmail(userData.email);
    await this.enterPassword(userData.password);
    await this.enterPhone(userData.phone);
    await this.selectGender(userData.gender);
    await this.enterBirthday(userData.birthday);
    await this.selectDepartment(userData.department);
    await this.selectJobTitle(userData.jobTitle);
    await this.selectProgrammingLanguages(userData.programmingLanguages);
  }
}
