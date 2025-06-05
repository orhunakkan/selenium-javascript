import { test, expect } from 'vitest';
import { Builder, By } from 'selenium-webdriver';

test('Heroku App - Smoke Test', async () => {
  const driver = await new Builder().forBrowser('MicrosoftEdge').build();
  await driver.get('https://the-internet.herokuapp.com/');
  expect(await driver.getTitle()).toBe('The Internet');
  expect(await driver.findElement(By.css('h1')).getText()).toBe('Welcome to the-internet');
  expect(await driver.findElement(By.css('h2')).getText()).toBe('Available Examples');
  await driver.quit();
});
