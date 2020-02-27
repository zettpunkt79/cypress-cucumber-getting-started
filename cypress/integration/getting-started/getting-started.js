/// <reference types="Cypress" />
/**
 * Steps specific to the getting-started feature go here
 */

// eslint-disable-next-line no-unused-vars
import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
import {alias} from '../common/common-aliases'

Given('I end up on the 404 page', () => {
  cy.visit('/404', {failOnStatusCode: false})
})

When('I click the navigation link with text {string}', linkText => {
  cy.get(alias.navigationLinks).contains(linkText).click()
})

When('I take a screenshot', () => {
  cy.screenshot()
})

Then('I see {string} in the main headline', headlineText => {
  cy.get(alias.mainHeadline).should('contain', headlineText)
})