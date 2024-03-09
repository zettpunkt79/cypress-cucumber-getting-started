import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit duckduckgo.com", () => {
    cy.visit("https://duckduckgo.com/");
});

Then("I should see a search bar", () => {
    cy.findByRole('combobox', {name: 'Search with DuckDuckGo'}).should('be.visible')
});

Then("I the logo always looks the same", () => {
    cy.get('img').first().matchImageSnapshot();
});
