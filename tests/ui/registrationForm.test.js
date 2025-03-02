// tests/ui/registrationForm.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { DriverFactory } from '../../utilities/driverFactory.js';
import { RegistrationPage } from '../../pages/registrationPage.js';
import { TestDataFactory } from '../../utilities/testDataFactory.js';

describe('Registration Form Tests', () => {
  let driver;
  let registrationPage;

  beforeAll(async () => {
    driver = await DriverFactory.build('chrome');
    registrationPage = new RegistrationPage(driver);
  });

  afterAll(async () => {
    await DriverFactory.quit(driver);
  });

  it('should successfully complete registration', async () => {
    // Get test data
    const userData = TestDataFactory.getRegistrationData();

    // Navigate to the registration page
    await registrationPage.open();

    // Fill in personal information
    await registrationPage.fillPersonalInfo(
      userData.firstName,
      userData.lastName,
      userData.username,
      userData.email,
      userData.password,
      userData.phone,
      userData.birthday
    );

    // Select gender, department, job title
    await registrationPage.selectGender(userData.gender);
    await registrationPage.selectDepartment(userData.department);
    await registrationPage.selectJobTitle(userData.jobTitle);

    // Select programming languages
    await registrationPage.selectProgrammingLanguages(
      userData.programmingLanguages
    );

    // Submit the form
    await registrationPage.submitForm();

    // Verify success message
    const successMessageText = await registrationPage.getSuccessMessage();
    expect(successMessageText).toContain(
      "You've successfully completed registration!"
    );
  });
});
