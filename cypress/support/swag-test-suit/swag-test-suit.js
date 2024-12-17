const swaglocators = require("../../support/swag-page-objects/swag-locators");

//LogIn negative cases
export function loginOtherUsers() {
  cy.fixture("users").then((users) => {
    users.forEach((user) => {
      // Visit the login page for each user
      cy.visit(swaglocators.SWAG_PAGE_URL);
      if (user.username) {
        cy.get(swaglocators.USERNAME_INPUT).type(user.username);
      }
      if (user.password) {
        cy.get(swaglocators.PASSWORD_INPUN).type(user.password);
      }
      // Click the login button
      cy.get(swaglocators.LOGIN_BUTTON).click();
      if (user.username === "locked_out_user") {
        // Locked out user
        cy.get(swaglocators.ERROR_MESSAGE)
          .should("be.visible")
          .and(
            "contain",
            "Epic sadface: Sorry, this user has been locked out."
          );
      } else {
        // Invalid credentials
        cy.get(swaglocators.ERROR_MESSAGE)
          .should("be.visible")
          .and(
            "contain",
            "Epic sadface: Username and password do not match any user in this service"
          );
      }
    });
  });
}

//It checks that the list of items on the main page is six by default
export function checkproductList(expectedCount) {
  cy.url().should("include", "/inventory.html");
  cy.get(swaglocators.LIST_WITH_ITEMS)
    .should("have.length", expectedCount)
    .then(() => {
      cy.log(`${expectedCount} products are displayed as expected`);
    });
}

//Add 3 products from the list to the cart
export function addToCart() {
  const itemsToAdd = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
  ];
  itemsToAdd.forEach((item) => {
    cy.contains(".inventory_item_name", item)
      .parents(".inventory_item")
      .within(() => {
        cy.get("button").click(); // Click the button
        cy.get("button").should("contain", "Remove"); // Verify it changed to "Remove"
      });
  });
}

export function removeItemFromCart() {
  cy.get(swaglocators.SHOPPING_CART_LINK).click();
  // Verify there are exactly 3 items in the cart
  cy.get(swaglocators.INVENTORY_ITEM).should("have.length", 3);
  // Remove the first item
  cy.get(swaglocators.INVENTORY_ITEM)
    .first()
    .within(() => {
      cy.get("button").contains("Remove").click(); // Ensure it's the correct button
    });
  // Assert that only 2 items remain in the cart
  cy.get(swaglocators.INVENTORY_ITEM).should("have.length", 2);
}

//Testing when empty checkoutinputs to show error message
export function checkOutErrorMessage() {
  cy.get(swaglocators.CHECKOUT_BUTTON).should("be.visible").click();
  cy.get(swaglocators.CONTINUE_BUTTON).should("be.visible").click();
  cy.get(swaglocators.ERROR_MESSAGE)
    .should("be.visible")
    .and("contain", "Error: First Name is required");
}

//Testing the checkout functionality
export function checkOut(firstName, lastName, postCode) {
  cy.get(swaglocators.CONTINUE_BUTTON).should("be.visible").click();
  cy.get(swaglocators.FIRST_NAME_INPUT_CHECKOUT).type(firstName);
  cy.get(swaglocators.LAST_NAME_INPUT_CHECKOUT).type(lastName);
  cy.get(swaglocators.POST_CODE_INPUT_CHECKOUT).type(postCode);
  cy.get(swaglocators.CONTINUE_BUTTON).click();
  cy.get(swaglocators.INVENTORY_ITEM).should("have.length", "2");
  cy.get(swaglocators.FINISH_BUTTON).click();
  cy.get(swaglocators.MESSAGE_FOR_CHECKOUT)
    .should("be.visible")
    .and("contain", "Thank you for your order!");
  cy.get(swaglocators.GO_BACK_TO_PRODUCTS_BUTTON).click();
  cy.url().should("include", "/inventory.html");
  cy.get(swaglocators.INVENTORY_ITEM).should("have.length", "6");
}

//Testing the sorting functionality from A to Z
export function sortItemsAtoZ() {
  cy.get(swaglocators.PRODUCT_SORT_DROPDOWN).select("Name (A to Z)");
  cy.get(swaglocators.INVENTORY_ITEM_NAME).then((items) => {
    const sortedItems = [...items].map((item) => item.innerText).sort();
    const displayedItems = [...items].map((item) => item.innerText);
    expect(displayedItems).to.deep.equal(sortedItems);
  });
}

//Testing the sorting functionality from Z to A
export function sortItemsZtoA() {
  cy.get(swaglocators.PRODUCT_SORT_DROPDOWN).select("Name (Z to A)");
  cy.get(swaglocators.INVENTORY_ITEM_NAME).then((items) => {
    const sortedItems = [...items]
      .map((item) => item.innerText)
      .sort()
      .reverse();
    const displayedItems = [...items].map((item) => item.innerText);
    expect(displayedItems).to.deep.equal(sortedItems);
  });
}

//Testing the sorting functionality by price from low to high
export function sortItemsPriceLowToHigh() {
  cy.get(swaglocators.PRODUCT_SORT_DROPDOWN).select("Price (low to high)");
  cy.get(swaglocators.INVENTORY_ITEM_PRICE).then((items) => {
    const sortedItems = [...items]
      .map((item) => parseFloat(item.innerText.replace("$", "")))
      .sort((a, b) => a - b);
    const displayedItems = [...items].map((item) =>
      parseFloat(item.innerText.replace("$", ""))
    );
    expect(displayedItems).to.deep.equal(sortedItems);
  });
}

//Testing the sorting functionality by price from high to low
export function sortItemsPriceHighToLow() {
  cy.get(swaglocators.PRODUCT_SORT_DROPDOWN).select("Price (high to low)");
  cy.get(swaglocators.INVENTORY_ITEM_PRICE).then((items) => {
    const sortedItems = [...items]
      .map((item) => parseFloat(item.innerText.replace("$", "")))
      .sort((a, b) => b - a);
    const displayedItems = [...items].map((item) =>
      parseFloat(item.innerText.replace("$", ""))
    );
    expect(displayedItems).to.deep.equal(sortedItems);
  });
}
