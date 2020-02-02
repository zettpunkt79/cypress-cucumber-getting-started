#!/usr/bin/env node

/** 
 * This script augments the cucumber report file with screenshots of test failured 
 * and generates a HTML report afterwards. Inspired by:
 * https://github.com/jcundill/cypress-cucumber-preprocessor/blob/master/fixJson.js
 */

const report = require('multiple-cucumber-html-reporter')

const fs = require('fs')
const path = require('path')

const cucumberJsonDir = './cypress/test-results/cucumber-json'
const cucumberReportFileMap = {}
const cucumberReportMap = {}
const jsonIndentLevel = 2
const htmlReportDir = './cypress/test-results/html'
const screenshotsDir = './cypress/screenshots'

const getCucumberReportMaps = () => {
  const files = fs.readdirSync(cucumberJsonDir)
  files.forEach(file => {
    const json = JSON.parse(
      fs.readFileSync(path.join(cucumberJsonDir, file))
    )
    const [feature] = json[0].uri.split('/').reverse()
    cucumberReportFileMap[feature] = file
    cucumberReportMap[feature] = json
  })
}

const addScreenshots = () => {
  const failingFeatures = fs.readdirSync(screenshotsDir)
  failingFeatures.forEach(feature => {
    const screenshots = fs.readdirSync(path.join(screenshotsDir, feature))
    screenshots.forEach(screenshot => {
      const scenarioName = screenshot
        .match(/(?<=--\ ).+?((?=\ \(example\ #\d+\))|(?=\ \(failed\)))/)[0]
        .trim()
      //Find all scenarios matching the scenario name of the screenshot.
      //This is important when using the scenario outline mechanism
      const myScenarios = cucumberReportMap[feature][0].elements.filter(
        e => e.name === scenarioName
      )
      if (!myScenarios) {return}
      myScenarios.forEach(myScenario => {
        const myStep = myScenario.steps.find(
          step => step.result.status === 'failed'
        )
        if (!myStep) {return}
        const data = fs.readFileSync(
          path.join(screenshotsDir, feature, screenshot)
        )
        if (data) {
          const base64Image = Buffer.from(data, 'binary').toString('base64')
          if (!myStep.embeddings) {myStep.embeddings = []}
          myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' })
        }
        //Write JSON with screenshot back to report file.
        fs.writeFileSync(
          path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
          JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
        )
      })
    })
  })
}

const generateReport = () => {
  report.generate({
    jsonDir: cucumberJsonDir,
    reportPath: htmlReportDir,
    displayDuration: true,
    pageTitle: 'Cypress Cucumber Test Report',
    reportName: `Cypress Cucumber Test Report - ${new Date().toLocaleString()}`,
    metadata: {
      browser: {
        name: 'chrome'
      },
      device: 'VM',
      platform: {
        name: 'linux'
      } 
    }
  })
}

getCucumberReportMaps()
addScreenshots()
generateReport()