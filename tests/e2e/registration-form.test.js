import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import { createDriver } from '../../utilities/webdriver';
import { RegistrationPage } from '../../pages/registration-page';
import userData from '../../fixtures/user-data.json';

describe('Registration Form Tests', () => {
  let driver;
  let registrationPage;

  // Get browser from environment variable or default to chrome
  const browser = process.env.BROWSER || 'chrome';

  beforeAll(async () => {
    try {
      driver = await createDriver(browser);
      await driver.manage().window().maximize();
      await driver.manage().setTimeouts({ implicit: 10000 });

      // Initialize the registration page
      registrationPage = new RegistrationPage(driver);
    } catch (error) {
      console.error(`Error creating ${browser} WebDriver:`, error);
    }
  });

  afterAll(async () => {
    if (driver) {
      try {
        await driver.quit();
      } catch (error) {
        console.error('Error quitting WebDriver:', error);
      }
    }
  });

  it('should successfully submit the registration form with valid data', async () => {
    // Navigate to the registration form page
    await registrationPage.navigateTo();

    // Get valid user data from fixture
    const validUser = userData.validUser;

    // Fill in the form with valid data
    await registrationPage.enterFirstName(validUser.firstName);
    await registrationPage.enterLastName(validUser.lastName);
    await registrationPage.enterUsername(validUser.username);
    await registrationPage.enterEmail(validUser.email);
    await registrationPage.enterPassword(validUser.password);
    await registrationPage.enterPhone(validUser.phone);
    await registrationPage.selectGender(validUser.gender);
    await registrationPage.enterBirthday(validUser.birthday);
    await registrationPage.selectDepartment(validUser.department);
    await registrationPage.selectJobTitle(validUser.jobTitle);
    await registrationPage.selectProgrammingLanguages(validUser.programmingLanguages);

    // Submit the form
    await registrationPage.submitForm();

    // Verify the landed page contains success message
    const confirmationMessage = await registrationPage.getSuccessMessage();
    expect(confirmationMessage).toContain("You've successfully completed registration!");
  });

  it('should display validation errors for invalid form submission', async () => {
    // Navigate to the registration form page
    await registrationPage.navigateTo();

    // Get invalid user data from fixture
    const invalidUser = userData.invalidUser;

    // Fill form with invalid data
    await registrationPage.enterFirstName(invalidUser.firstName);
    await registrationPage.enterLastName(invalidUser.lastName);
    await registrationPage.enterUsername(invalidUser.username);
    await registrationPage.enterEmail(invalidUser.email);
    await registrationPage.enterPassword(invalidUser.password);
    await registrationPage.enterPhone(invalidUser.phone);

    // Verify validation errors are displayed
    expect(await registrationPage.isUsernameErrorDisplayed()).toBe(true);
    expect(await registrationPage.isEmailErrorDisplayed()).toBe(true);
    expect(await registrationPage.isPasswordErrorDisplayed()).toBe(true);
    expect(await registrationPage.isPhoneErrorDisplayed()).toBe(true);

    // Verify we are still on the registration page (form not submitted)
    const currentUrl = await registrationPage.getCurrentUrl();
    expect(currentUrl).toContain('registration_form');
  });

  // Optional test to demonstrate the fillEntireForm utility method
  it('should submit form successfully using fillEntireForm method', async () => {
    // Navigate to the registration form page
    await registrationPage.navigateTo();

    // Get valid user data from fixture
    const validUser = userData.validUser;

    // Fill the entire form with one method call
    await registrationPage.fillEntireForm(validUser);

    // Submit the form
    await registrationPage.submitForm();

    // Verify the landed page contains success message
    const confirmationMessage = await registrationPage.getSuccessMessage();
    expect(confirmationMessage).toContain("You've successfully completed registration!");
  });
});
