#!/usr/bin/env node
const report = require('multiple-cucumber-html-reporter')

const fs = require('fs')
const path = require('path')

const cucumberJsonDir = './cypress/test-results/cucumber-json'
const screenshotsDir = './cypress/screenshots'
const htmlReportDir = './cypress/test-results/html'
const jsonIndentLevel = 2

const addScreenshots = () => {
  const cucumberReportMap = {}
  const jsonNames = {}

  const files = fs.readdirSync(cucumberJsonDir)
  
  files.forEach(file => {
    const json = JSON.parse(
      fs.readFileSync(path.join(cucumberJsonDir, file))
    )
    const [feature] = json[0].uri.split('/').reverse()
    jsonNames[feature] = file
    cucumberReportMap[feature] = json
  })

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
      myScenarios.forEach(myScenario => {
        const myStep = myScenario.steps.find(
          step => step.result.status === 'failed'
        )
        if (!myStep) {
          //Skip the following if current scenario has no failed step.
          return
        }
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
          path.join(cucumberJsonDir, jsonNames[feature]),
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
    metadata: {
      browser: {
        name: 'Chrome',
        version: '79',
      },
      device: 'VM',
      platform: {
        name: 'Windows',
        version: '10',
      },
    },
    customData: {
      title: 'Run info',
      data: [
        {label: 'Project', value: 'Custom project'},
      ],
    },
  })
}

addScreenshots()
generateReport()