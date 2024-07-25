const swagsuit = require("../../support/swag-test-suit/swag-test-suit");

describe("Testing basic functionalities in Swag application ", () => {
  before("", () => {});

  it("Checking the log in with different users to check the behavior and to check that we can see the six default products in the list", () => {
    swagsuit.loginOtherUsers();
    cy.loginSwag();
    swagsuit.checkproductList();
    cy.logout();
  });

  it("Testing the buy, add to cart, removing, checkout functionality", () => {
    cy.loginSwag();
    swagsuit.addToCart();
    swagsuit.removeItemFromCart();
    swagsuit.checkOut();
    swagsuit.sortItems()
    // cy.logout();
  });
});
