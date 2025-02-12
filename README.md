# JavaScript Testing Framework

A comprehensive testing framework featuring API and UI testing capabilities using Cucumber, Vitest, and Selenium WebDriver.

## 🚀 Features

- API testing with fetch and Vitest
- UI testing with Selenium WebDriver
- BDD testing with Cucumber
- Code formatting with Prettier
- Test coverage reporting

## 📋 Prerequisites

- Node.js (v18 or higher)
- Chrome browser (for UI tests)

## 🛠️ Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## 🧪 Running Tests

### Unit Tests

```bash
npm test              # Run tests in watch mode
npm run test:run     # Run tests once
npm run test:ui      # Run tests with UI
npm run coverage     # Generate coverage report
```

### BDD Tests

```bash
npm run test:cucumber
```

## 📁 Project Structure

```
├── features/                # Cucumber feature files
│   └── step_definitions/    # Step definitions
├── tests/                   # Test files
│   ├── api/                 # API tests
│   └── ui/                  # UI tests
├── pages/                   # Page Object Models
├── utilities/               # Helper utilities
└── payloads/                # Test data
```

## 🔧 Configuration

- cucumber.config.js - Cucumber configuration
- vitest.config.js - Vitest configuration
- .prettierrc.json - Prettier configuration

## 📈 Reports

- Cucumber HTML reports: `cucumber-report.html`
- Coverage reports: `coverage/index.html`

## 🤝 Contributing

1. Format code before committing:

```bash
npm run format
```

2. Verify formatting:

```bash
npm run format:check
```

## 👥 Author

- Orhun Akkan
