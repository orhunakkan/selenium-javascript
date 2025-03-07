import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import edge from 'selenium-webdriver/edge';

/**
 * Creates a WebDriver instance for the specified browser
 * @param {string} browserName - 'chrome', 'firefox', or 'edge'
 * @returns {WebDriver} WebDriver instance
 */
export function createDriver(browserName = 'chrome') {
  // Check if we're in CI environment
  const isCI = process.env.CI === 'true';

  switch (browserName.toLowerCase()) {
    case 'firefox': {
      const options = new firefox.Options();
      if (isCI) {
        options.addArguments('-headless');
        options.addArguments('--window-size=1920,1080');
        return new Builder().forBrowser('firefox').usingServer('http://localhost:4444').setFirefoxOptions(options).build();
      }
      return new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    }

    case 'edge': {
      const options = new edge.Options();
      if (isCI) {
        options.addArguments('--headless=new');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--window-size=1920,1080');
        return new Builder().forBrowser('MicrosoftEdge').usingServer('http://localhost:4444').setEdgeOptions(options).build();
      }
      return new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
    }

    case 'chrome':
    default: {
      const options = new chrome.Options();
      if (isCI) {
        options.addArguments('--headless=new');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        options.addArguments('--window-size=1920,1080');
        return new Builder().forBrowser('chrome').usingServer('http://localhost:4444').setChromeOptions(options).build();
      }
      return new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }
  }
}
