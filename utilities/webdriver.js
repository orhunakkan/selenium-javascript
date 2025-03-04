import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export function createDriver() {
  // Check if we're in CI environment
  const isCI = process.env.CI === 'true';

  const options = new chrome.Options();

  if (isCI) {
    // Configure for headless mode in CI
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');

    // Use remote server in CI
    return new Builder().forBrowser('chrome').usingServer('http://localhost:4444').setChromeOptions(options).build();
  } else {
    // Local development configuration
    return new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }
}
