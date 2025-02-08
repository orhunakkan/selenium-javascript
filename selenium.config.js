module.exports = {
  // Selenium WebDriver configurations
  selenium: {
    browser: 'chrome',
    implicitTimeout: 15000,
    pageLoadTimeout: 20000,
  },
  
  // Test framework configurations
  baseUrls: {
    ui: 'www.example.com',
    api: 'www.reqres.in',
  },
  testFiles: './tests/**/*.spec.js',
};