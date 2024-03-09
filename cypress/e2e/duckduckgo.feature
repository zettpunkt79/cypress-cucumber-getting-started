Feature: duckduckgo.com

  Scenario: I can visit the frontpage
    When I visit duckduckgo.com
    Then I should see a search bar

  Scenario: The logo always looks the same
    When I visit duckduckgo.com
    Then I the logo always looks the same    