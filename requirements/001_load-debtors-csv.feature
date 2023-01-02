Feature: Process debtors list

  Scenario: Receives debtors list
    When a request is made to debtors route containing an attached csv file
    Given the file is a valid csv
    Then create debtors in database

  Scenario: Process debtors list
    When `Receives a debtors list` (above) finishes successfully
    Then process each debtor
    And for each debtor with an expired debt
    Then send an e-mail informing of the debt