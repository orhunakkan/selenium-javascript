import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

/**
 * Creates a Chrome WebDriver instance
 * @returns {WebDriver} WebDriver instance
 */
export async function createDriver() {
  console.log('Setting up Chrome WebDriver...');
  const isCI = process.env.CI === 'true';
  let driver;

  try {
    const options = new chrome.Options();
    if (isCI) {
      options.addArguments('--headless=new');
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-dev-shm-usage');
      options.addArguments('--window-size=1920,1080');
    }
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    console.log('Chrome WebDriver created successfully');
    return driver;
  } catch (error) {
    console.error('Error creating Chrome WebDriver:', error);

    // In CI, if browser fails, we don't want to block other tests
    if (!isCI) {
      throw error;
    }
    return null;
  }
}
