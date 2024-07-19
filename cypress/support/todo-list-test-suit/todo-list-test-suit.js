const todolocators = require("../../support/todo-list-page-objects/todo-list-locators");

export function deleteExistingItems() {
  cy.get(todolocators.ITEMS_LIST).then((itemsInList) => {
    const itemCount = itemsInList.length;
    if (itemCount === 2) {
      cy.get(todolocators.ITEMS_LIST).each(($el) => {
        cy.wrap($el).find(".destroy").invoke("show").click();
      });
      cy.get(todolocators.ITEMS_LIST).should("have.length", 0);
    } else {
      cy.log(`There are ${itemCount} items in the list`);
    }
  });
}

export function createItemsOnTheList() {
  const items = ["item1", "item2", "item3"];
  items.forEach((item) => {
    cy.get(todolocators.NEW_ITEM_INPUT)
      .should("be.empty")
      .type(item)
      .type("{enter}");
    cy.contains(item).should("be.visible");
  });
  cy.get(todolocators.ITEMS_LIST).should("have.length", 3);
  cy.get(todolocators.ITEMS_LIST).each(($el) => {
    cy.wrap($el).find(todolocators.ITEM_CHECKBOX).should("not.be.checked");
  });
  cy.get(todolocators.ITEMS_LIST).each(($el) => {
    cy.wrap($el).find(todolocators.ITEM_CHECKBOX).check();
  });
}

export function storeListValues() {
  let liValues = []; // Have to check why is let and not const and what is the difference
  cy.get(todolocators.ITEMS_LIST)
    .each(($li) => {
      liValues.push($li.text());
    })
    .then(() => {
      cy.log("Stored <li> values:", liValues);
    });
}

export function uncheckOneOfTheItems() {
  cy.get(todolocators.ITEMS_LIST)
    .find(todolocators.ITEM_CHECKBOX)
    .each(($checkbox) => {
      if ($checkbox.is(":checked")) {
        cy.get(todolocators.ITEMS_LIST)
          .eq(1)
          .find(todolocators.ITEM_CHECKBOX)
          .uncheck();
      }
    });
}