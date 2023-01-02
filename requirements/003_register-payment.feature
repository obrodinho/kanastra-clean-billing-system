Feature: Receives a payment confirmation

  Scenario: Receives a payment confirmation
    When a request is made to payment route containing a json at its body
    Given the json is valid
    And the json contains an existent debt information
    And the debt is not closed
    And the total paid is equal to the debt stored at database
    Then register the payment in database
    And update the debt to closed
    And register the payment in debt
    And update debt value to zero

  Scenario: Receives a payment confirmation with wrong value and unsettled debt
    When a request is made to payment route containing a json at its body
    Given the json is valid
    And the json contains an existent debt information
    And the total paid is not equal to the debt stored at database
    When the total paid is less than the debt value
    Then register the payment in debt
    And update debt value from the remainder of the debt minus the paid
    Then sends notification of unsettled debt with updated value
    And update the payment to partial
    When the total paid is more than the debt value
    Then register the payment in debt
    Then sends notification of overpaid debt to financial team for review
    And update the payment to overpaid