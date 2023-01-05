Feature: Process debts list

  Scenario: Receives debts list
    When a request is made to debts route containing an embodied csv file
    Given the file is a valid csv
    Then create debts in database

  Scenario: Process debts list
    When `Receives a debts list` (above) finishes successfully
    Then process each debt
    And for each debt with an expired debt
    Then send an e-mail informing of the debt