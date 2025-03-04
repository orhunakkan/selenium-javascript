import { Builder, By, until } from 'selenium-webdriver';
import { expect, describe, it, beforeAll, afterAll } from 'vitest';

describe('Registration Form Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 10000 });
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should successfully submit the registration form with valid data', async () => {
    // Navigate to the registration form page
    await driver.get('https://practice.cydeo.com/registration_form');

    // Fill in the form with valid data
    await driver.findElement(By.name('firstname')).sendKeys('John');
    await driver.findElement(By.name('lastname')).sendKeys('Doe');
    await driver.findElement(By.name('username')).sendKeys('johndoe123');
    await driver.findElement(By.name('email')).sendKeys('john.doe@example.com');
    await driver.findElement(By.name('password')).sendKeys('Password123');
    await driver.findElement(By.name('phone')).sendKeys('571-123-4567');

    // Select gender
    await driver.findElement(By.css('input[name="gender"][value="male"]')).click();

    // Enter date of birth
    await driver.findElement(By.name('birthday')).sendKeys('01/15/1990');

    // Select department using select dropdown
    const departmentSelect = await driver.findElement(By.name('department'));
    await departmentSelect.click();
    await departmentSelect.findElement(By.css('option[value="DE"]')).click();

    // Select job title
    const jobTitleSelect = await driver.findElement(By.name('job_title'));
    await jobTitleSelect.click();
    await jobTitleSelect.findElement(By.xpath('//option[text()="SDET"]')).click();

    // Select programming languages
    await driver.findElement(By.id('inlineCheckbox2')).click(); // Java
    await driver.findElement(By.id('inlineCheckbox3')).click(); // JavaScript

    // Submit the form
    await driver.findElement(By.id('wooden_spoon')).click();

    // Wait for successful registration page
    await driver.wait(until.urlContains('registration_confirmation'), 5000);

    // Verify the landed page contains You've successfully completed registration!
    const confirmationMessage = await driver.findElement(By.className('alert alert-success')).getText();
    expect(confirmationMessage).toContain("You've successfully completed registration!");
  });

  it('should display validation errors for invalid form submission', async () => {
    // Navigate to the registration form page
    await driver.get('https://practice.cydeo.com/registration_form');

    // Fill form with invalid data - short username (validation requires min 6 chars)
    await driver.findElement(By.name('firstname')).sendKeys('Jane');
    await driver.findElement(By.name('lastname')).sendKeys('Smith');
    await driver.findElement(By.name('username')).sendKeys('jane'); // Too short username
    await driver.findElement(By.name('email')).sendKeys('invalid-email'); // Invalid email
    await driver.findElement(By.name('password')).sendKeys('pass'); // Too short password
    await driver.findElement(By.name('phone')).sendKeys('123-456'); // Invalid phone format

    // Verify validation errors are displayed
    const usernameError = await driver.findElement(By.xpath('//small[contains(text(), "username must be more than 6")]'));
    const emailError = await driver.findElement(By.xpath('//small[contains(text(), "Email format is not correct")]'));
    const passwordError = await driver.findElement(By.xpath('//small[contains(text(), "password must have at least 8 characters")]'));
    const phoneError = await driver.findElement(By.xpath('//small[contains(text(), "Phone format is not correct")]'));

    // Assert validation errors are displayed
    expect(await usernameError.isDisplayed()).toBe(true);
    expect(await emailError.isDisplayed()).toBe(true);
    expect(await passwordError.isDisplayed()).toBe(true);
    expect(await phoneError.isDisplayed()).toBe(true);

    // Verify we are still on the registration page (form not submitted)
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('registration_form');
  });
});
