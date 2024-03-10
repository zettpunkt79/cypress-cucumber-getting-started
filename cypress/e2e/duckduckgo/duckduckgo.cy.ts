import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor'

Given('I visit duckduckgo.com', () => {
  cy.visit('https://duckduckgo.com/')
})

When('I check the logo', () => {
  cy.get('img').first().as('logo')
})

Then('the logo always looks the same', () => {
  cy.get('@logo').matchImageSnapshot()
})

Then('I can see the search bar', () => {
  cy.findByRole('combobox', { name: 'Search with DuckDuckGo' }).should(
    'be.visible'
  )
})
