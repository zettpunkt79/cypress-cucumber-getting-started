# Cypress Cucumber Getting Started

Cypress project readily preconfigured with [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor) and [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter/).

*Please note:*
This repo's sole purpose is to demo how cypress-cucumber-preprocessor can be integrated with multiple cucumber reporter.

## Installation

```shell
npm install --legacy-peer-deps
```

## Opening Cypress

```shell
npm run cy:open
```

## Test all features headlessly

```shell
npm test
```

***Please note: This also clears former test results.***

## Skip scenarios with _@ignore_ tag

### Powershell
```
$env:CYPRESS_TAGS = 'not @ignore' ; npm test
```

### Bash
```
CYPRESS_TAGS="not @ignore" npm test
```

## Generate HTML report with screenshots

```shell
npm run report
```