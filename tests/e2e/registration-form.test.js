import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import { createDriver } from '../../utilities/webdriver';
import { RegistrationPage } from '../../pages/registration-page';

describe('Registration Form Tests', () => {
  let driver;
  let registrationPage;

  beforeAll(async () => {
    try {
      driver = await createDriver();
      await driver.manage().window().maximize();
      await driver.manage().setTimeouts({ implicit: 10000 });

      // Initialize the registration page
      registrationPage = new RegistrationPage(driver);
    } catch (error) {
      console.error('Error creating WebDriver:', error);
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

    // Fill in the form with valid data
    await registrationPage.enterFirstName('John');
    await registrationPage.enterLastName('Doe');
    await registrationPage.enterUsername('johndoe123');
    await registrationPage.enterEmail('john.doe@example.com');
    await registrationPage.enterPassword('Password123');
    await registrationPage.enterPhone('571-123-4567');
    await registrationPage.selectGender('male');
    await registrationPage.enterBirthday('01/15/1990');
    await registrationPage.selectDepartment('DE');
    await registrationPage.selectJobTitle('SDET');
    await registrationPage.selectProgrammingLanguages(['javascript', 'java']);

    // Submit the form
    await registrationPage.submitForm();

    // Verify the landed page contains success message
    const confirmationMessage = await registrationPage.getSuccessMessage();
    expect(confirmationMessage).toContain("You've successfully completed registration!");
  });

  it('should display validation errors for invalid form submission', async () => {
    // Navigate to the registration form page
    await registrationPage.navigateTo();

    // Fill form with invalid data
    await registrationPage.enterFirstName('Jane');
    await registrationPage.enterLastName('Smith');
    await registrationPage.enterUsername('jane'); // Too short username
    await registrationPage.enterEmail('invalid-email'); // Invalid email
    await registrationPage.enterPassword('pass'); // Too short password
    await registrationPage.enterPhone('123-456'); // Invalid phone format

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

    // Create user data object
    const userData = {
      firstName: 'Alice',
      lastName: 'Johnson',
      username: 'alicej2023',
      email: 'alice.j@example.com',
      password: 'SecurePwd123',
      phone: '571-987-6543',
      gender: 'female',
      birthday: '05/20/1995',
      department: 'DE',
      jobTitle: 'SDET',
      programmingLanguages: ['java', 'javascript', 'c++']
    };

    // Fill the entire form with one method call
    await registrationPage.fillEntireForm(userData);

    // Submit the form
    await registrationPage.submitForm();

    // Verify the landed page contains success message
    const confirmationMessage = await registrationPage.getSuccessMessage();
    expect(confirmationMessage).toContain("You've successfully completed registration!");
  });
});
