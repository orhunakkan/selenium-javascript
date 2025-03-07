import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import firefox from 'selenium-webdriver/firefox';
import edge from 'selenium-webdriver/edge';

/**
 * Creates a WebDriver instance for the specified browser
 * @param {string} browserName - 'chrome', 'firefox', or 'edge'
 * @returns {WebDriver} WebDriver instance
 */
export async function createDriver(browserName = 'chrome') {
  console.log(`Setting up ${browserName} WebDriver...`);
  const isCI = process.env.CI === 'true';
  let driver;

  try {
    switch (browserName.toLowerCase()) {
      case 'firefox': {
        const options = new firefox.Options();
        if (isCI) {
          // Replace the deprecated headless() method with the new approach
          options.addArguments('-headless');
          options.windowSize({ width: 1920, height: 1080 });
        }
        driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        break;
      }

      case 'edge': {
        const options = new edge.Options();
        if (isCI) {
          options.addArguments('--headless=new');
          options.addArguments('--no-sandbox');
          options.addArguments('--disable-dev-shm-usage');
          options.addArguments('--window-size=1920,1080');
        }
        driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
        break;
      }

      case 'chrome':
      default: {
        const options = new chrome.Options();
        if (isCI) {
          options.addArguments('--headless=new');
          options.addArguments('--no-sandbox');
          options.addArguments('--disable-dev-shm-usage');
          options.addArguments('--window-size=1920,1080');
        }
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
        break;
      }
    }

    console.log(`${browserName} WebDriver created successfully`);
    return driver;
  } catch (error) {
    console.error(`Error creating ${browserName} WebDriver:`, error);
    // In CI, if one browser fails, we don't want to block other browser tests
    if (!isCI) {
      throw error;
    }
    return null;
  }
}
