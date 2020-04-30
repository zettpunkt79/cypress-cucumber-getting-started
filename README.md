# Cypress Cucumber Getting Started

Cypress project readily preconfigured with [cypress-cucumber-preprocessor](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor) and [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter/).

## Installation

```shell
npm install
```

## Configuration

Environment specific variables can be placed in _./cypress/config/environment.json_

## Opening Cypress

```shell
npm run cy:open
```

## Test all features headlessly

```shell
npm test
```

***Please note: This also clears former test results.***

## Generate HTML report with screenshots

```shell
npm run report
```

## E-mail-Testing against Gmail inbox
To enable e-mail testing against a Gmail inbox, first make sure to place the credentials.json and token.json into the folder cypress/plugins/gmail-tester.