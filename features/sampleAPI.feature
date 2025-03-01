Feature: Reqres API Operations
  As a client application
  I want to interact with the Reqres API
  So that I can manage user data effectively

  Scenario: List Users
    When I send GET request to "/users?page=2"
    Then the response status code should be 200
    And the response should contain "page" property
    And the response should contain "data" property

  Scenario: Single User - Found
    When I send GET request to "/users/2"
    Then the response status code should be 200
    And the response should contain "data" property

  Scenario: Single User - Not Found
    When I send GET request to "/users/23"
    Then the response status code should be 404

  Scenario: Create User
    Given I have the following user data:
      | name     | job    |
      | morpheus | leader |
    When I send POST request to "/users" with user data
    Then the response status code should be 201
    And the response should contain "id" property
    And the response should contain "createdAt" property

  Scenario: Update User with PUT
    Given I have the following user data:
      | name     | job           |
      | morpheus | zion resident |
    When I send PUT request to "/users/2" with user data
    Then the response status code should be 200
    And the response should contain "updatedAt" property

  Scenario: Update User with PATCH
    Given I have the following user data:
      | name     | job           |
      | morpheus | zion resident |
    When I send PATCH request to "/users/2" with user data
    Then the response status code should be 200
    And the response should contain "updatedAt" property

  Scenario: Delete User
    When I send DELETE request to "/users/2"
    Then the response status code should be 204

  Scenario: List Resources
    When I send GET request to "/unknown"
    Then the response status code should be 200
    And the response should contain "data" property

  Scenario: Single Resource - Found
    When I send GET request to "/unknown/2"
    Then the response status code should be 200
    And the response should contain "data" property

  Scenario: Single Resource - Not Found
    When I send GET request to "/unknown/23"
    Then the response status code should be 404

  Scenario: Register - Successful
    Given I have the following registration data:
      | email              | password |
      | eve.holt@reqres.in | pistol   |
    When I send POST request to "/register" with registration data
    Then the response status code should be 200
    And the response should contain "token" property
    And the response should contain "id" property

  Scenario: Register - Unsuccessful
    Given I have the following registration data:
      | email       |
      | sydney@fife |
    When I send POST request to "/register" with registration data
    Then the response status code should be 400
    And the response should contain "error" property

  Scenario: Login - Successful
    Given I have the following login data:
      | email              | password   |
      | eve.holt@reqres.in | cityslicka |
    When I send POST request to "/login" with login data
    Then the response status code should be 200
    And the response should contain "token" property

  Scenario: Login - Unsuccessful
    Given I have the following login data:
      | email         |
      | peter@klaven |
    When I send POST request to "/login" with login data
    Then the response status code should be 400
    And the response should contain "error" property

  Scenario: List Users with Delay
    When I send GET request to "/users?delay=3"
    Then the response status code should be 200
    And the response should contain "data" property
