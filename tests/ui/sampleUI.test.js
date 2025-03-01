import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Builder, By, until } from 'selenium-webdriver';
import { Select } from 'selenium-webdriver/lib/select';

describe('Registration Form Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should successfully complete registration', async () => {
    // Navigate to the registration page
    await driver.get('https://practice.cydeo.com/registration_form');

    // Fill out text inputs
    await driver.findElement(By.name('firstname')).sendKeys('John');
    await driver.findElement(By.name('lastname')).sendKeys('Doe');
    await driver.findElement(By.name('username')).sendKeys('johndoe123');
    await driver.findElement(By.name('email')).sendKeys('john.doe@example.com');
    await driver.findElement(By.name('password')).sendKeys('Password!123');
    await driver.findElement(By.name('phone')).sendKeys('571-000-0000');
    await driver.findElement(By.name('birthday')).sendKeys('01/01/1990');

    // Select a gender radio button
    await driver
      .findElement(By.css('input[name="gender"][value="male"]'))
      .click();

    // Select an option from the Department dropdown
    const departmentDropdown = await driver.findElement(By.name('department'));
    const departmentSelect = new Select(departmentDropdown);
    await departmentSelect.selectByValue('DE');

    // Select an option from the Job title dropdown
    const jobTitleDropdown = await driver.findElement(By.name('job_title'));
    const jobTitleSelect = new Select(jobTitleDropdown);
    await jobTitleSelect.selectByVisibleText('Developer');

    // Check the programming languages checkboxes
    await driver.findElement(By.id('inlineCheckbox1')).click(); // C++
    await driver.findElement(By.id('inlineCheckbox2')).click(); // Java
    await driver.findElement(By.id('inlineCheckbox3')).click(); // JavaScript

    // Wait for the sign up button to be enabled and click it
    const signUpButton = await driver.findElement(By.id('wooden_spoon'));
    await driver.wait(until.elementIsEnabled(signUpButton), 5000);
    await signUpButton.click();

    // Assert the success message appears
    const successMessage = await driver.wait(
      until.elementLocated(By.css('div.alert-success')),
      5000
    );

    const successMessageText = await successMessage.getText();
    expect(successMessageText).toContain(
      "You've successfully completed registration!"
    );
  });
});
