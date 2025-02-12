import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Builder, By, until } from 'selenium-webdriver';

describe('Example Page UI Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should contain expected body text', async () => {
    await driver.get('https://example.com');
    await driver.wait(until.elementLocated(By.css('body')), 5000);
    const body = await driver.findElement(By.css('body')).getText();
    expect(body).toContain('Example Domain');
  });
});
