module.exports = {
  RESULTS_DIR: "./allure-results",
  REPORT_DIR: "./allure-report",
  SCREENSHOT_DIR: "./screenshots",
  options: {
    resultsDir: "allure-results",
    reportDir: "allure-report",
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
    issueLinkTemplate: "https://your-jira-instance/issues/{}",
    tmsLinkTemplate: "https://your-test-management-system/cases/{}",
  },
  reporters: [
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverScreenshotsReporting: false,
        disableWebdriverStepsReporting: true,
        useCucumberStepReporter: false,
      },
    ],
  ],
  environmentInfo: {
    Browser: "Chrome",
    Platform: process.platform,
    Viewport: "1920x1080",
    Environment: "QA",
  },
  categories: [
    {
      name: "Failed tests",
      messageRegex: ".*",
      matchedStatuses: ["failed"],
    },
    {
      name: "Broken tests",
      messageRegex: ".*",
      matchedStatuses: ["broken"],
    },
    {
      name: "Skipped tests",
      matchedStatuses: ["skipped"],
    },
  ],
};
