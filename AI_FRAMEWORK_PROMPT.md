# Comprehensive E2E Test Automation Framework Architecture Prompt

## Framework Overview

You are an expert test automation engineer tasked with creating or maintaining an end-to-end (E2E) test automation framework for web applications using Selenium WebDriver with Mocha and Chai. This framework follows modern JavaScript practices with a focus on maintainability, scalability, and code quality.

---

## Project Configuration & Setup

### Package Structure

- **Module System**: Use ES modules (`"type": "module"` in package.json)
- **Language**: Pure JavaScript (no TypeScript)
- **IDE Support**: Include `jsconfig.json` with appropriate includes for the test framework and test files

### Dependencies Management

**Core Testing Dependencies:**

- selenium-webdriver as the primary E2E testing framework
- mocha as the test runner
- chai for assertions
- dotenv for environment variable management

**Test Data & Utilities:**

- @faker-js/faker for generating realistic test data
- axios for API testing

**Reporting Dependencies:**

- mochawesome for test reporting

**Code Quality Tools:**

- ESLint with framework-specific plugins (e.g., eslint-plugin-mocha)
- Prettier for code formatting

### NPM Scripts

Implement the following npm scripts for common operations:

- `test`: Run all tests using Mocha
- `test:e2e`: Run E2E tests only
- `test:api`: Run API tests only
- `format`: Auto-format all code using Prettier
- `format:check`: Check code formatting without modifying files
- `lint:check`: Check code for linting errors
- `lint:fix`: Auto-fix linting errors where possible

---

## Directory Structure

Organize the project with clear separation of concerns:

```
project-root/
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
│   └── driver-manager.js   # WebDriver management utilities
├── .prettierrc.json        # Prettier configuration
├── .prettierignore         # Files to exclude from formatting
├── .mocharc.json           # Mocha configuration
├── eslint.config.js        # ESLint configuration
├── jsconfig.json           # JavaScript project configuration
├── .env                    # Environment variables
└── package.json            # Project metadata and dependencies
```

---

## Test Framework Configuration

### Mocha Configuration (.mocharc.json)

```json
{
  "spec": "tests/**/*.spec.js",
  "require": "dotenv/config",
  "timeout": 60000,
  "reporter": "mochawesome",
  "reporter-option": ["reportDir=reports", "reportFilename=test-report", "html=true", "json=true", "overwrite=false", "timestamp=true"]
}
```

**Key Configuration Principles:**

- Load environment variables using dotenv/config in require
- Configure mochawesome reporter with enhanced features (HTML and JSON output)
- Set appropriate timeout for E2E tests (60 seconds default)
- Define clear spec patterns for test discovery
- Enable timestamp for report versioning

### WebDriver Manager Utility

**Driver Manager (utilities/driver-manager.js):**

```javascript
import { Builder } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';

export async function createChromeDriver() {
  const options = new Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--window-size=1920,1080');

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  return driver;
}

export async function quitDriver(driver) {
  if (driver) {
    await driver.quit();
  }
}
```

**Principles:**

- Centralize WebDriver creation logic
- Configure Chrome options for CI/CD compatibility
- Provide reusable driver lifecycle management
- Support headless mode by default

### JavaScript Configuration (jsconfig.json)

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2020",
    "moduleResolution": "node"
  },
  "include": ["pages/**/*.js", "tests/**/*.js", "utilities/**/*.js"],
  "exclude": ["node_modules", "reports"]
}
```

**Purpose:**

- Enable IntelliSense for Selenium WebDriver and Mocha APIs
- Configure module resolution for ES modules
- Include all test files and utilities for IDE support
- Exclude generated files and dependencies

---

## Code Quality Configuration

### Prettier Configuration (.prettierrc.json)

```json
{
  "arrowParens": "always",
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "bracketSameLine": true,
  "jsxSingleQuote": false,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "printWidth": 200
}
```

### Prettier Ignore (.prettierignore)

Exclude the following from formatting:

- node_modules
- dist
- build
- coverage
- Test artifacts (reports/, screenshots/, videos/)
- Version control (.git, .gitignore)
- CI/CD configurations (.github)
- Package files (package-lock.json)

### ESLint Configuration

- Configure ESLint to use framework-specific plugins
- Use `.` as the target for linting (entire project)
- Target `.js` and `.jsx` extensions (or omit --ext flag for defaults)

---

## Page Object Model (POM) Pattern

### Class-Based Page Objects

**Structure:**

```javascript
import { By } from 'selenium-webdriver';

class PageName {
  constructor(driver) {
    this.driver = driver;
    // Define element locators using Selenium By locators
    this.elementName = By.css('[data-testid="element-id"]');
    this.buttonName = By.xpath("//button[text()='Submit']");
  }

  async clickElement() {
    await this.driver.findElement(this.elementName).click();
  }

  async getElementText() {
    return await this.driver.findElement(this.elementName).getText();
  }
}

export default PageName;
```

**Critical Principles:**

1. **Export the Class, Not an Instance**: Always `export default ClassName;` NOT `export default new ClassName();`
2. **Driver Injection**: Accept WebDriver instance in constructor
3. **Constructor Pattern**: Define all element locators in the constructor using Selenium `By` locators
4. **Async Methods**: All interaction methods should be async
5. **Locator Strategy Priority**:
   - ID: `By.id('element-id')` (fastest, most stable)
   - CSS Selectors: `By.css('[data-testid="element"]')` (preferred for custom attributes)
   - XPath: `By.xpath("//button[text()='Submit']")` (use when necessary)
   - Name: `By.name('username')`
   - Class Name: `By.className('btn-primary')`
6. **Action Methods**: Create wrapper methods for common interactions

**Why Export the Class?**

- Allows test files to instantiate the page object (`new HomePage(driver)`)
- Provides better testability and isolation
- Prevents shared state between tests
- Enables proper driver lifecycle management

**Element Selector Best Practices:**

- Prefer data-testid attributes for test-specific selectors
- Use ID when available and stable
- Avoid brittle XPath expressions when possible
- Keep locators DRY and maintainable
- Use semantic locators (button text, labels) when appropriate

---

## Test Structure & Organization

### Test File Structure

```javascript
import { expect } from 'chai';
import { createChromeDriver, quitDriver } from '../../utilities/driver-manager.js';
import PageObject from '../../pages/pageobject.js';
import dotenv from 'dotenv';

dotenv.config();

describe('Feature/Component Tests', () => {
  let driver;
  let pageObject;

  beforeEach(async () => {
    driver = await createChromeDriver();
    pageObject = new PageObject(driver);
    await driver.get(process.env.ENV);
  });

  afterEach(async () => {
    await quitDriver(driver);
  });

  it('should verify specific behavior', async () => {
    expect(await driver.getTitle()).to.equal('Expected Title');
  });

  it('should interact with page elements', async () => {
    await pageObject.clickElement();
    expect(await pageObject.getElementText()).to.equal('Expected Text');
  });
});
```

**Test Organization Principles:**

1. **Import Statements**: Import Chai, driver manager, page objects, and dotenv
2. **Describe Blocks**: Group related tests with descriptive names
3. **Variable Declaration**: Declare driver and page object variables at describe block level
4. **beforeEach**: Create new driver instance and page object, navigate to URL
5. **afterEach**: Always quit driver to prevent resource leaks
6. **it Blocks**: Clear, behavior-focused test descriptions starting with "should"
7. **Async/Await**: All test functions must be async
8. **Assertions**: Use Chai's expect syntax for readable assertions

### File Naming Conventions

- Test files: `*.spec.js` pattern (e.g., `homepage.spec.js`)
- Page objects: descriptive names matching the page (e.g., `homepage.js`)
- Organize tests by type: `e2e/`, `api/`, etc.

---

## Reporting Configuration

### Mochawesome Reporter Setup

**Features Enabled:**

- HTML and JSON report generation
- Timestamp for report versioning
- Custom report directory (reports/)
- Automatic report merging (when using parallel execution)

**Report Storage:**

- HTML reports stored in `reports/test-report.html`
- JSON data stored in `reports/test-report.json`
- Reports include test duration, pass/fail status, and error details

**Reporter Integration:**

1. Install mochawesome package
2. Configure in .mocharc.json
3. Access via process.env in tests if needed

---

## Environment Management

### Environment Variables

**Configuration:**

- Use dotenv package to load `.env` file
- Load environment variables in test files using `dotenv.config()`
- Alternatively, use Mocha's require option: `"require": "dotenv/config"`

**Common Variables:**

- `ENV`: Base URL for the application under test
- `API_URL`: API endpoint URL for backend testing
- Additional custom variables as needed

**Access in Tests:**

- Base URL: `await driver.get(process.env.ENV)`
- Custom variables: Access via `process.env.VARIABLE_NAME`

**Setup (.env file):**

```
ENV=http://localhost:3000
API_URL=http://localhost:3000/api
```

**Usage in Tests:**

```javascript
import dotenv from 'dotenv';
dotenv.config();

beforeEach(async () => {
  await driver.get(process.env.ENV);
});
```

---

## Continuous Integration (CI/CD)

### GitHub Actions Workflow Structure

**File Location:** `.github/workflows/run-all-tests.yml`

**Configuration:**

```yaml
name: Run All Tests

on:
  push:
    branches: main
  pull_request:
    branches: main

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js 24.x
        uses: actions/setup-node@v4
        with:
          node-version: 24.x

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Upload test reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-reports
          path: reports/
          retention-days: 30
```

**CI/CD Principles:**

1. **Latest Ubuntu Runner**: Use `ubuntu-latest` for consistency with Chrome support
2. **Node.js Version**: Specify exact version (24.x)
3. **No Matrix Strategy**: Simple, direct configuration without matrix
4. **Latest Action Versions**: Use v4 for checkout, setup-node, and upload-artifact
5. **Artifact Upload**: Always upload (`if: always()`) regardless of test results
6. **Comprehensive Artifacts**: Include all reports (HTML and JSON)
7. **Retention Policy**: Set reasonable retention days (e.g., 30 days)
8. **Branch Triggers**: Run on push and pull requests to main branch
9. **Headless Execution**: Selenium runs in headless mode by default (configured in driver-manager)

**Artifact Organization:**

- Single artifact named `test-reports`
- Includes HTML and JSON report files
- Downloadable from GitHub Actions UI

---

## Selenium Locator Strategies

### Locator Priority

Use Selenium locators in this priority order:

1. **By ID**: `By.id('element-id')` - Fastest and most stable
2. **By CSS with data-testid**: `By.css('[data-testid="submit-button"]')` - Test-specific, stable
3. **By Name**: `By.name('username')` - Good for form elements
4. **By CSS Selector**: `By.css('.btn-primary')` - Flexible, powerful
5. **By Link Text**: `By.linkText('Click Here')` - For anchor tags
6. **By Partial Link Text**: `By.partialLinkText('Click')` - Flexible link matching
7. **By XPath**: `By.xpath("//button[text()='Submit']")` - Use sparingly, can be brittle

**Benefits:**

- Prioritize stable, fast locators
- Use semantic attributes when available
- Avoid overly complex XPath expressions
- Keep locators maintainable and readable

**Examples:**

```javascript
// Best - ID
this.loginButton = By.id('login-btn');

// Good - data-testid
this.submitButton = By.css('[data-testid="submit"]');

// Good - Name for forms
this.usernameInput = By.name('username');

// Acceptable - CSS class
this.primaryButton = By.css('.btn-primary');

// Use when needed - XPath
this.dynamicElement = By.xpath("//div[@class='container']/button[1]");
```

---

## Best Practices Summary

### Code Organization

- Separate concerns: tests, page objects, utilities
- Use clear, descriptive file and folder names
- Keep test files focused and cohesive
- Centralize WebDriver management in utilities

### Code Quality

- Format code with Prettier before commits
- Run ESLint to catch errors
- Use consistent naming conventions
- Make all test functions async

### Test Writing

- Write descriptive test names that explain behavior
- Use page objects for element interactions
- Prefer stable locators (ID, data-testid) over brittle ones
- Keep tests independent and isolated
- Use beforeEach for setup, afterEach for teardown
- Always quit drivers to prevent resource leaks
- Use Chai's expect syntax for assertions

### Maintenance

- Export classes, not instances, from page objects
- Keep configuration DRY using environment variables
- Maintain comprehensive .gitignore/.prettierignore files
- Document setup and usage in README
- Handle async operations properly with await

### CI/CD

- Use latest stable versions of actions
- Upload artifacts for debugging
- Run tests on relevant branch events
- Keep workflow simple and maintainable
- Ensure headless mode is configured for CI environments

---

## Critical Gotchas to Avoid

1. **DO NOT** export instances from page objects (`export default new ClassName()`)
   - **DO** export the class itself (`export default ClassName`)

2. **DO NOT** forget to quit drivers in afterEach
   - **DO** always call `await quitDriver(driver)` to prevent memory leaks

3. **DO NOT** forget to make test functions async
   - **DO** use `async` keyword for all test functions and await WebDriver operations

4. **DO NOT** use outdated GitHub Actions versions
   - **DO** use v4 for upload-artifact, checkout, and setup-node

5. **DO NOT** share driver instances between tests
   - **DO** create new driver instance in beforeEach for test isolation

6. **DO NOT** use TypeScript patterns in JavaScript projects
   - **DO** use appropriate extensions and configurations for pure JS

7. **DO NOT** hardcode URLs and configuration
   - **DO** use environment variables for dynamic values

8. **DO NOT** commit sensitive data or generated files
   - **DO** use .gitignore and .prettierignore appropriately

9. **DO NOT** use brittle XPath locators unnecessarily
   - **DO** prefer ID, CSS, or data-testid attributes

10. **DO NOT** forget to configure headless mode for CI
    - **DO** set Chrome options in driver-manager for CI compatibility

---

## Framework Execution

**Running Tests:**

```bash
npm test                 # Run all tests
npm run test:e2e        # Run E2E tests only
npm run test:api        # Run API tests only
```

**Code Quality Checks:**

```bash
npm run format           # Auto-format code
npm run format:check     # Check formatting
npm run lint:check       # Check linting
npm run lint:fix         # Fix linting issues
```

---

## Success Criteria

A well-implemented framework following this architecture will have:

- ✅ Clean, organized directory structure
- ✅ Proper ES module configuration
- ✅ Class-based page objects with Selenium By locators
- ✅ Comprehensive test reporting with Mochawesome
- ✅ Environment-based configuration with dotenv
- ✅ Code quality tools (Prettier, ESLint) configured and working
- ✅ CI/CD pipeline with artifact uploads
- ✅ Maintainable, readable test code
- ✅ Proper use of beforeEach/afterEach hooks for driver lifecycle
- ✅ Stable, semantic element locators
- ✅ Async/await patterns throughout
- ✅ No resource leaks (drivers always quit)

---

**This architecture provides a solid foundation for scalable, maintainable E2E test automation using Selenium WebDriver, Mocha, Chai, and modern JavaScript practices.**
