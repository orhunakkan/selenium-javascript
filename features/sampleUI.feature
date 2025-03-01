Feature: Registration Form
  As a website user
  I want to complete a registration form
  So that I can create an account

  Scenario: Successfully complete registration
    Given I navigate to the registration form page
    When I fill in the following information:
      | Field             | Value               |
      | First Name        | John                |
      | Last Name         | Doe                 |
      | Username          | johndoe123          |
      | Email             | john.doe@example.com|
      | Password          | Password!123        |
      | Phone             | 571-000-0000        |
      | Date of Birth     | 01/01/1990          |
    And I select "Male" for gender
    And I select "Department of Engineering" for department
    And I select "Developer" for job title
    And I check the following programming languages:
      | Language   |
      | C++        |
      | Java       |
      | JavaScript |
    And I click the Sign Up button
    Then I should see a success message saying "You've successfully completed registration!"