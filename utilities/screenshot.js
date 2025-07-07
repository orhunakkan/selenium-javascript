import fs from 'fs';
import path from 'path';

export class ScreenshotUtility {
  /**
   * Takes a screenshot and saves it to the screenshots folder
   * @param {WebDriver} driver - The Selenium WebDriver instance
   * @param {string} testName - The name of the test (will be cleaned for filename)
   * @param {string} status - The test status (e.g., 'failed', 'passed')
   * @returns {Promise<string>} The path to the saved screenshot
   */
  static async captureScreenshot(driver, testName, status = 'failed') {
    const screenshotsDir = 'screenshots';
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const cleanTestName = testName.replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `Screenshot_${cleanTestName}_${status}_${timestamp}.png`;
    const filePath = path.join(screenshotsDir, filename);
    const image = await driver.takeScreenshot();
    fs.writeFileSync(filePath, image, 'base64');
    return filePath;
  }
}
