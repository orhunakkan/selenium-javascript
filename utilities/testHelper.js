import fs from 'fs/promises';
import path from 'path';

export class TestHelper {
  static RETRY_ATTEMPTS = 3;
  static RETRY_DELAY = 1000;

  static async retryTest(testFn, testName, options = {}) {
    const {
      attempts = this.RETRY_ATTEMPTS,
      delay = this.RETRY_DELAY,
      driver = null
    } = options;

    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        await testFn();
        return;
      } catch (error) {
        if (attempt === attempts) {
          if (driver) {
            await this.captureScreenshot(driver, testName);
          }
          await this.logError(error, testName);
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
        console.log(`Retrying test "${testName}" - Attempt ${attempt + 1}`);
      }
    }
  }

  static async captureScreenshot(driver, testName) {
    const screenshotDir = './reports/screenshots';
    await fs.mkdir(screenshotDir, { recursive: true });
    
    const screenshot = await driver.takeScreenshot();
    const filename = `${testName}_${new Date().toISOString()}.png`;
    await fs.writeFile(path.join(screenshotDir, filename), screenshot, 'base64');
    return filename;
  }

  static async logError(error, testName) {
    const logDir = './reports/logs';
    await fs.mkdir(logDir, { recursive: true });
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      test: testName,
      error: error.message,
      stack: error.stack
    };

    await fs.appendFile(
      path.join(logDir, 'test-errors.log'),
      JSON.stringify(logEntry) + '\n'
    );
  }
}