/// <reference types="Cypress" />

// eslint-disable-next-line no-unused-vars
import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps'
import {alias} from '../common/common-aliases'

When('I click the navigation link with text {string}', linkText => {
  cy.get(alias.navigationLinks).contains(linkText).click()
})

Then('I see {string} in the main headline', headlineText => {
  cy.get(alias.mainHeadline).should('contain', headlineText)
})