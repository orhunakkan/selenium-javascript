import { By } from 'selenium-webdriver';
import { BasePage } from './basePage.js';

export class RegistrationPage extends BasePage {
  constructor(driver) {
    super(driver);

    // Page URL
    this.url = 'https://practice.cydeo.com/registration_form';

    // Locators
    this.firstNameInput = By.name('firstname');
    this.lastNameInput = By.name('lastname');
    this.usernameInput = By.name('username');
    this.emailInput = By.name('email');
    this.passwordInput = By.name('password');
    this.phoneInput = By.name('phone');
    this.birthdayInput = By.name('birthday');
    this.genderRadioButton = gender =>
      By.css(`input[name="gender"][value="${gender.toLowerCase()}"]`);
    this.departmentDropdown = By.name('department');
    this.jobTitleDropdown = By.name('job_title');
    this.languageCheckbox = language => {
      const languageMap = {
        'C++': 'inlineCheckbox1',
        Java: 'inlineCheckbox2',
        JavaScript: 'inlineCheckbox3',
        Python: 'inlineCheckbox4'
      };
      return By.id(languageMap[language]);
    };
    this.signUpButton = By.id('wooden_spoon');
    this.successMessage = By.css('div.alert-success');
  }

  async open() {
    await this.navigate(this.url);
  }

  async fillPersonalInfo(
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    birthday
  ) {
    await this.type(this.firstNameInput, firstName);
    await this.type(this.lastNameInput, lastName);
    await this.type(this.usernameInput, username);
    await this.type(this.emailInput, email);
    await this.type(this.passwordInput, password);
    await this.type(this.phoneInput, phone);
    await this.type(this.birthdayInput, birthday);
  }

  async selectGender(gender) {
    await this.click(this.genderRadioButton(gender));
  }

  async selectDepartment(department) {
    // Map the department name to its value
    const departmentMap = {
      'Department of Engineering': 'DE',
      'Department of Agriculture': 'DA',
      'Department of Commerce': 'DC',
      'Department of Defense': 'DD',
      'Department of Education': 'ED',
      'Department of Energy': 'DOE',
      'Department of Labor': 'DOL',
      'Department of Justice': 'DJ'
    };

    await this.selectByValue(
      this.departmentDropdown,
      departmentMap[department]
    );
  }

  async selectJobTitle(jobTitle) {
    await this.selectByVisibleText(this.jobTitleDropdown, jobTitle);
  }

  async selectProgrammingLanguages(languages) {
    for (const language of languages) {
      await this.click(this.languageCheckbox(language));
    }
  }

  async submitForm() {
    await this.waitForElementClickable(this.signUpButton);
    await this.click(this.signUpButton);
  }

  async getSuccessMessage() {
    await this.waitForElementVisible(this.successMessage);
    return await this.getText(this.successMessage);
  }
}
