Feature: User API
  As a client
  I want to manage users
  So that I can maintain user data

  Scenario: Create a new user
    Given I have user details
      | name     | job                |
      | John Doe | Software Developer |
    When I send POST request to create user
    Then the response status code should be 201
    And the response should contain user details
