# Selenium JavaScript E2E Test Automation Framework

A comprehensive end-to-end test automation framework built with Selenium WebDriver, Mocha, and Chai following modern JavaScript best practices.

## 🚀 Features

- **Selenium WebDriver 4** - Latest WebDriver API for browser automation
- **Mocha & Chai** - Powerful test runner and assertion library
- **Mochawesome** - Beautiful HTML and JSON test reports
- **Page Object Model** - Maintainable test architecture
- **ES Modules** - Modern JavaScript module system
- **Prettier & ESLint** - Code quality and formatting
- **GitHub Actions** - CI/CD pipeline integration
- **Environment Configuration** - dotenv for environment management

## 📁 Project Structure

```
selenium-javascript/
├── .github/
│   └── workflows/          # CI/CD pipeline configurations
├── pages/                  # Page Object Model classes
├── reports/                # Test execution reports
│   ├── test-report.html    # HTML format reports
│   └── test-report.json    # JSON format reports
├── tests/                  # Test specifications
│   ├── api/                # API tests
│   └── e2e/                # End-to-end tests
├── utilities/              # Helper utilities
│   └── driver-manager.js   # WebDriver management
├── .prettierrc.json        # Prettier configuration
├── .prettierignore         # Files to exclude from formatting
├── .mocharc.json           # Mocha configuration
├── eslint.config.js        # ESLint configuration
├── jsconfig.json           # JavaScript project configuration
├── .env                    # Environment variables
└── package.json            # Project dependencies and scripts
```

## 🛠️ Prerequisites

- Node.js (v24.x recommended)
- npm or yarn
- Chrome/Chromium browser

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd selenium-javascript
```

2. Install dependencies:

```bash
npm install
```

3. Install required ESLint dependencies:

```bash
npm install --save-dev @eslint/js eslint-plugin-mocha
```

4. Create `.env` file in the root directory:

```env
ENV=http://localhost:3000
API_URL=http://localhost:3000/api
```

## 🧪 Running Tests

### Run all tests

```bash
npm test
```

### Run E2E tests only

```bash
npm run test:e2e
```

### Run API tests only

```bash
npm run test:api
```

## 📊 Reports

Test reports are automatically generated in the `reports/` directory:

- `test-report.html` - Interactive HTML report
- `test-report.json` - JSON format for programmatic access

Open `reports/test-report.html` in a browser to view detailed test results.

## 🎨 Code Quality

### Format code

```bash
npm run format
```

### Check code formatting

```bash
npm run format:check
```

### Lint code

```bash
npm run lint:check
```

### Fix linting issues

```bash
npm run lint:fix
```

## 📝 Writing Tests

### Page Object Example

```javascript
import { By } from 'selenium-webdriver';

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameInput = By.id('username');
    this.passwordInput = By.id('password');
    this.loginButton = By.css('[data-testid="login-btn"]');
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }
}

export default LoginPage;
```

### Test Example

```javascript
import { expect } from 'chai';
import { createChromeDriver, quitDriver } from '../../utilities/driver-manager.js';
import LoginPage from '../../pages/login.js';
import dotenv from 'dotenv';

dotenv.config();

describe('Login Tests', () => {
  let driver;
  let loginPage;

  beforeEach(async () => {
    driver = await createChromeDriver();
    loginPage = new LoginPage(driver);
    await driver.get(process.env.ENV + '/login');
  });

  afterEach(async () => {
    await quitDriver(driver);
  });

  it('should login successfully with valid credentials', async () => {
    await loginPage.login('testuser', 'password123');
    expect(await driver.getCurrentUrl()).to.include('/dashboard');
  });
});
```

## 🔧 Configuration

### Mocha Configuration (.mocharc.json)

- Timeout: 60 seconds (configurable for slower tests)
- Reporter: Mochawesome
- Automatic dotenv loading
- Timestamped reports

### ESLint Configuration

- Framework: ESLint 9+ flat config
- Plugin: eslint-plugin-mocha
- Rules: Recommended + Mocha-specific rules

### Prettier Configuration

- Single quotes
- Semicolons enabled
- 2-space indentation
- 200 character line width

## 🚀 CI/CD

This framework includes a GitHub Actions workflow that:

- Runs on push and pull requests to main branch
- Executes all tests
- Uploads test reports as artifacts
- Retains reports for 30 days

## 📚 Best Practices

1. **Always export classes, not instances** from page objects
2. **Use async/await** for all WebDriver operations
3. **Quit drivers in afterEach** to prevent resource leaks
4. **Prefer stable locators**: ID > data-testid > CSS > XPath
5. **Keep tests independent** - no shared state between tests
6. **Use descriptive test names** starting with "should"
7. **Follow Page Object Model** for maintainability

## 🐛 Troubleshooting

### Tests failing to start

- Ensure Chrome/Chromium is installed
- Check if the correct Node.js version is installed

### Driver not quitting

- Always include `afterEach` with `quitDriver(driver)`
- Check for unhandled promise rejections

### Reports not generating

- Verify Mochawesome is installed
- Check `.mocharc.json` configuration
- Ensure `reports/` directory has write permissions

## 📄 License

ISC

## 👤 Author

Orhun Akkan

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
