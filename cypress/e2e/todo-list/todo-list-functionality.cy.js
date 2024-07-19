const todosuit = require("../..//support/todo-list-test-suit/todo-list-test-suit");
const todolocators = require("../../support/todo-list-page-objects/todo-list-locators");

describe("Testing basic functionalities in GitHub.com ", () => {
  before("Setting up the test environment before tests run", () => {
    cy.visit("https://example.cypress.io/todo#/");
  });

  it("To-do list functionality", () => {
    todosuit.deleteExistingItems();
    todosuit.createItemsOnTheList();
    todosuit.storeListValues();
    todosuit.uncheckOneOfTheItems();
  });
});
