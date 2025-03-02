import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { Builder, By, until } from 'selenium-webdriver';
import { Select } from 'selenium-webdriver/lib/select.js';
import assert from 'node:assert/strict';

let driver;

// Setup and teardown hooks
Before(async function () {
  driver = await new Builder().forBrowser('chrome').build();
});

After(async function () {
  if (driver) {
    await driver.quit();
  }
});

// Step definitions
Given('I navigate to the registration form page', async function () {
  await driver.get('https://practice.cydeo.com/registration_form');
});

When('I fill in the following information:', async function (dataTable) {
  const formData = {};

  // Convert data table to a more usable format
  dataTable.hashes().forEach(row => {
    formData[row.Field] = row.Value;
  });

  // Fill out text inputs
  await driver
    .findElement(By.name('firstname'))
    .sendKeys(formData['First Name']);
  await driver.findElement(By.name('lastname')).sendKeys(formData['Last Name']);
  await driver.findElement(By.name('username')).sendKeys(formData['Username']);
  await driver.findElement(By.name('email')).sendKeys(formData['Email']);
  await driver.findElement(By.name('password')).sendKeys(formData['Password']);
  await driver.findElement(By.name('phone')).sendKeys(formData['Phone']);
  await driver
    .findElement(By.name('birthday'))
    .sendKeys(formData['Date of Birth']);
});

When('I select {string} for gender', async function (gender) {
  const genderValue = gender.toLowerCase();
  await driver
    .findElement(By.css(`input[name="gender"][value="${genderValue}"]`))
    .click();
});

When('I select {string} for department', async function (department) {
  const departmentDropdown = await driver.findElement(By.name('department'));
  const departmentSelect = new Select(departmentDropdown);

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

  await departmentSelect.selectByValue(departmentMap[department]);
});

When('I select {string} for job title', async function (jobTitle) {
  const jobTitleDropdown = await driver.findElement(By.name('job_title'));
  const jobTitleSelect = new Select(jobTitleDropdown);
  await jobTitleSelect.selectByVisibleText(jobTitle);
});

When(
  'I check the following programming languages:',
  async function (dataTable) {
    const languages = dataTable.hashes().map(row => row.Language);

    // Map languages to their corresponding checkbox IDs
    const languageMap = {
      'C++': 'inlineCheckbox1',
      Java: 'inlineCheckbox2',
      JavaScript: 'inlineCheckbox3',
      Python: 'inlineCheckbox4'
    };

    // Check each language checkbox
    for (const language of languages) {
      const checkboxId = languageMap[language];
      if (checkboxId) {
        await driver.findElement(By.id(checkboxId)).click();
      }
    }
  }
);

When('I click the Sign Up button', async function () {
  const signUpButton = await driver.findElement(By.id('wooden_spoon'));
  await driver.wait(until.elementIsEnabled(signUpButton), 5000);
  await signUpButton.click();
});

Then(
  'I should see a success message saying {string}',
  async function (expectedMessage) {
    const successMessage = await driver.wait(
      until.elementLocated(By.css('div.alert-success')),
      5000
    );

    const successMessageText = await successMessage.getText();
    assert.ok(
      successMessageText.includes(expectedMessage),
      `Expected message to contain "${expectedMessage}" but got "${successMessageText}"`
    );
  }
);
