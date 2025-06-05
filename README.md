# Selenium JavaScript Framework

A test automation framework using Selenium WebDriver with JavaScript.

## Installation

```bash
npm install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run only smoke tests:
```bash
npm run test:smoke
```

## CI/CD

This project uses GitHub Actions to run smoke tests automatically at 3 AM every day. The workflow configuration can be found in `.github/workflows/smoke-tests.yml`.

You can also trigger the smoke tests manually through the GitHub Actions interface.

## Test Tags

Tests can be tagged using the following format in the describe block:

```javascript
describe("Test Suite Name @tagname", () => {
  // Test cases
});
```

Current tags:
- `@smoke`: For smoke tests that verify basic functionality
