Feature: Getting Started
  As a test automation engineer
  I would like to see some examples here
  to kick start my testing in no time

  Background:
    Given I visit "/"

  Scenario: I can use global step definitions
    Then I see "Cypress.io: Kitchen Sink" in the title

  Scenario: I can use non-global step definitions
    When I click the navigation link with text "next"
    Then I see "Traversal" in the main headline

  Scenario Outline: I can use scenario outlines with examples
    When I click the navigation link with text "<link text>"
    Then I see "<headline>" in the main headline
    Examples:
      | link text | headline  |
      | next      | Traversal |
      | blur      | Actions   |

  Scenario: I can use visual testing to check against a baseline
    Given I browse on a "macbook-16"
    And I end up on the 404 page
    Then the page always looks the same

  Scenario: I can take a screenshot which is integrated in the report
    When I take a screenshot