# Cypress Cucumber Getting Started

Cypress project readily preconfigured with [cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor), TypeScript support, reporting (JSON, HTML) and [cypress-testing-library](https://github.com/testing-library/cypress-testing-library).

## Installation

```shell
npm install
```

## Opening Cypress

```shell
npm run cy:open
```

## Test all features headlessly

```shell
npm test
```

## Skip scenarios with _@ignore_ tag

### Powershell
```
$env:CYPRESS_TAGS = 'not @ignore' ; npm test
```

### Bash
```
CYPRESS_TAGS="not @ignore" npm test
```

## Reporting
JSON and HTML reports will be automatically saved in the cypress/reports folder