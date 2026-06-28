# ShopMate Automation Framework

> End-to-end test automation framework for the ShopMate e-commerce platform.
> Built with Playwright + TypeScript.

## Tech Stack

- **Playwright** — UI and API test automation
- **TypeScript** — Type-safe test code
- **GitHub Actions** — CI/CD pipeline

## Project Structure
shopmate-automation/

├── pages/          # Page Object Model classes

├── tests/

│   ├── ui/         # UI end-to-end tests

│   └── api/        # API tests

├── fixtures/       # Custom Playwright fixtures

├── utils/          # Helpers, constants, API helper



## Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
npm install
npx playwright install
```

### Running Tests

```bash
# Run smoke tests (critical paths)
npx playwright test --grep "@smoke"

# Run full regression suite
npx playwright test --grep "@regression"

# Run API tests only
npx playwright test --grep "@api"

# Run all tests
npx playwright test

# View HTML report
npx playwright show-report
```

## CI/CD Pipeline

| Trigger                | Job                      | Tests Run                    |
|------------------------|--------------------------|------------------------------|
| Push to main           | Smoke Tests              | `@smoke` — Chromium only     |
| Nightly (midnight UTC) | Full Regression          | `@regression` — All browsers |
| Manual trigger         | API / Smoke / Regression | Selectable via dropdown      |

## Test Coverage

| Feature            | UI Tests | API Tests |
|--------------------|----------|-----------|
| Homepage           | ✅      | —         |
| Login / Auth       | ✅      | ✅        |
| Products           | ✅      | ✅        |
| Cart               | ✅      | —         |
| Account            | ✅      | —         |
| Combined API + UI  | ✅      | —         |

## Page Objects

| Class          | Page         |
|----------------|--------------|
| `LoginPage`    | `/login`     |
| `ProductsPage` | `/products`  |
| `CartPage`     | `/view_cart` |

## Author

ShopMate Tester — QA Automation Engineer