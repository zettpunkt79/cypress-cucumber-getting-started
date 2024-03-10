Feature: duckduckgo.com

  Scenario: I can see the search bar
    When I visit duckduckgo.com
    Then I can see the search bar

  Scenario: The logo always looks the same
    Given I visit duckduckgo.com
    When I check the logo
    Then the logo always looks the same