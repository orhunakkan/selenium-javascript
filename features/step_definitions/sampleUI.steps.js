import { Given, Then, Before, After } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { Builder, By } from 'selenium-webdriver';

let driver;

Before(async function () {
  driver = await new Builder().forBrowser('chrome').build();
});

After(async function () {
  await driver.quit();
});

Given('I navigate to example.com', async function () {
  await driver.get('https://example.com');
});

Then('I should see {string} text on the page', async function (expectedText) {
  const body = await driver.findElement(By.css('body')).getText();
  assert.ok(body.includes(expectedText));
});
