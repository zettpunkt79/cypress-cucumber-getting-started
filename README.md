# Cypress Cucumber Getting Started

Cypress project readily preconfigured with 
- [cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) with
- reporting (JSON, HTML) enabled
- TypeScript support, 
- [cypress-testing-library](https://github.com/testing-library/cypress-testing-library)
- [cypress-image-snapshot](https://github.com/simonsmith/cypress-image-snapshot)

## Installation

```shell
npm install
```

## Recommended and preconfigured addons for VS Code
- [Cucumber](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official)
- [Pettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

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