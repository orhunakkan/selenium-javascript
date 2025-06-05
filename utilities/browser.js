import { Builder, Capabilities } from "selenium-webdriver";
import { Options } from "selenium-webdriver/edge.js";

export async function createDriver() {

  const isCI = process.env.CI === 'true';
  const capabilities = Capabilities.edge();
  const options = new Options();

  if (isCI) {
    options.addArguments('--headless');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');
  }

  return new Builder()
    .forBrowser('MicrosoftEdge')
    .setEdgeOptions(options)
    .withCapabilities(capabilities)
    .build();
}
