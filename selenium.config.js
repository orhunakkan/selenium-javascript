const config = {
  selenium: {
    browser: 'chrome',
    implicitTimeout: 15000,
    pageLoadTimeout: 20000,
  },
  baseUrls: {
    ui: 'https://www.example.com',
    api: 'https://reqres.in',
  },
  testFiles: './tests/**/*.spec.js',
};

export default config;