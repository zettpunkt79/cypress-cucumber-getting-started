/// <reference types="Cypress" />
/**
 * Common steps for plain html elements go here
 */

// eslint-disable-next-line no-unused-vars
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I browse on a {string}', (viewport) => {
  cy.viewport(viewport)
})

Given('I visit {string}', (url) => {
  cy.visit(url)
})

Then('I see {string} in the title', titleText => {
  cy.title().should('include', titleText)
})

Then('the page always looks the same', () => {
  cy.get('body').matchImageSnapshot()
})