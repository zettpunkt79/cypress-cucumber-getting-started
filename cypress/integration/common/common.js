/// <reference types="Cypress" />

// eslint-disable-next-line no-unused-vars
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

Given('I visit {string}', (url) => {
  cy.visit(url)
})

Then('I see {string} in the title', titleText => {
  cy.title().should('include', titleText)
})