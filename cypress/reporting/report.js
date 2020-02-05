#!/usr/bin/env node
/**
 * This script is executed by the 'yarn report' step and augments the cucumber report 
 * files of failed features with screenshots and snapshots. Mechanism was inspired by:
 * https://github.com/jcundill/cypress-cucumber-preprocessor/blob/master/fixJson.js
 * It also leverages the multiple-cucumber-html-reporter library to generate a HTML 
 * report based on the augmented cucumber report files.
 */

const report = require('multiple-cucumber-html-reporter')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const cucumberJsonDir = './cypress/test-results/cucumber-json'
const cucumberReportFileMap = {}
const cucumberReportMap = {}
const jsonIndentLevel = 2
const htmlReportDir = './cypress/test-results/html'
const screenshotsDir = './cypress/screenshots'
const snapshotDir = './cypress/snapshots'

getCucumberReportMaps()
addScreenshots()
addSnapshots()
generateReport()

function getCucumberReportMaps() {
  const files = fs.readdirSync(cucumberJsonDir).filter(file => {
    return file.indexOf('.json') > -1
  })
  files.forEach(file => {
    const json = JSON.parse(
      fs.readFileSync(path.join(cucumberJsonDir, file))
    )
    if(!json[0]) {return}
    const [feature] = json[0].uri.split('/').reverse()
    cucumberReportFileMap[feature] = file
    cucumberReportMap[feature] = json
  })
}

function addScreenshots() {
  const failingFeatures = fs.readdirSync(screenshotsDir)
  failingFeatures.forEach(feature => {
    const screenshots = fs.readdirSync(path.join(screenshotsDir, feature)).filter(file => {
      return file.indexOf('.png') > -1
    })
    screenshots.forEach(screenshot => {
      // regex to parse 'I can use scenario outlines with examples' from either of these:
      // Getting Started -- I can use scenario outlines with examples (example #1) (failed).png
      // Getting Started -- I can use scenario outlines with examples (failed).png
      const regex = /(?<=--\ ).+?((?=\ \(example\ #\d+\))|(?=\ \(failed\)))/g
      const [scenarioName] = screenshot.match(regex)
      console.info(chalk.blue('\n    Adding screenshot to cucumber-json report for'))
      console.info(chalk.blue(`    '${scenarioName}'`))
      //Find all scenarios matching the scenario name of the screenshot.
      //This is important when using the scenario outline mechanism
      const myScenarios = cucumberReportMap[feature][0].elements.filter(
        e => scenarioName.includes(e.name)
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
          if (!myStep.embeddings) {
            myStep.embeddings = []
          } else {
            //remove existing screenshot
            myStep.embeddings.pop()
          }
          myStep.embeddings.push({data: base64Image, mime_type: 'image/png'})
        }
      })
      //Write JSON with screenshot back to report file.
      fs.writeFileSync(
        path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
        JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
      )
    })
  })
}

function addSnapshots () {
  fs.ensureDirSync(snapshotDir)
  failingFeatures = fs.readdirSync(snapshotDir)
  failingFeatures.forEach(feature => {
    if (fs.existsSync(path.join(snapshotDir, feature, '__diff_output__'))) {
      const snapshots = fs.readdirSync(path.join(snapshotDir, feature, '__diff_output__')).filter(file => {
        return file.indexOf('.png') > -1
      })
      snapshots.forEach(snapshot => {
        // regex to parse 'I can use visual testing to check against a baseline' from
        // Getting Started -- I can use visual testing to check against a baseline.diff.png
        const regex = /(?<=--\s)[\w\s\,]+/g
        const [scenarioName] = snapshot.match(regex)
        console.info(chalk.blue('\n    Adding snapshot to cucumber-json report for'))
        console.info(chalk.blue(`    '${scenarioName}'`))
        const myScenarios = cucumberReportMap[feature][0].elements.filter(
          e => scenarioName.includes(e.name)
        )
        if(!myScenarios) {return}
        myScenarios.forEach(myScenario => {
          const myStep = myScenario.steps.find(
            step => step.result.status === 'failed'
          )
          if (!myStep) {return}
          const data = fs.readFileSync(
            path.join(snapshotDir, feature, '__diff_output__', snapshot)
          )
          if (data) {
            if (!myStep.embeddings) {
              myStep.embeddings = []
            } else {
              //remove existing screenshot
              myStep.embeddings.pop()
            }
            const base64Image = Buffer.from(data, 'binary').toString('base64')
            myStep.embeddings.push({mime_type: 'image/png', data: base64Image})
          }
        })
        //Write JSON with snapshot back to report file.
        fs.writeFileSync(
          path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
          JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
        )
      })
    }
  })
}

function generateReport() {
  if (!fs.existsSync(cucumberJsonDir)) {
    console.warn(chalk.yellow(`WARNING: Folder './${cucumberJsonDir}' not found. REPORT CANNOT BE CREATED!`))
  } else {
    report.generate({
      jsonDir: cucumberJsonDir,
      reportPath: htmlReportDir,
      displayDuration: true,
      pageTitle: 'System-Test Report',
      reportName: `System-Test Report - ${new Date().toLocaleString()}`,
      metadata:{
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
}