const config = {
  selenium: {
    browser: 'chrome',
    implicitTimeout: process.env.CI ? 30000 : 15000,
    pageLoadTimeout: process.env.CI ? 30000 : 20000,
  },
  baseUrls: {
    ui: 'https://www.example.com',
    api: 'https://reqres.in',
  },
  testFiles: './tests/**/*.spec.js',
};

export default config;