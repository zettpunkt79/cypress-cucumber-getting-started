// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const path = require('path')
const cucumber = require('cypress-cucumber-preprocessor').default
const {addMatchImageSnapshotPlugin} = require('cypress-image-snapshot/plugin')

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('file:preprocessor', cucumber())
  on('task', {
    'gmail:check': async args => {
      const email = await gmail_tester.check_inbox(
        path.resolve(__dirname, 'gmail-tester/credentials.json'),
        path.resolve(__dirname, 'gmail-tester/token.json'),
        args.options
      )
      return email
    }
  })
  addMatchImageSnapshotPlugin(on, config)
}