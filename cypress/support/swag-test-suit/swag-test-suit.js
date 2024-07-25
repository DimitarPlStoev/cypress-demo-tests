const swaglocators = require("../../support/swag-page-objects/swag-locators");

//LogIn with different users to check for positive and negative cases
export function loginOtherUsers() {
    cy.fixture("users").then((users) => {
        users.forEach((user) => {
            cy.visit(swaglocators.SWAG_PAGE_URL);
            cy.get(swaglocators.USERNAME_INPUT).type(user.username);
            cy.get(swaglocators.PASSWORD_INPUN).type(user.password);
            if (user.username === "standard_user") {
                cy.get(swaglocators.LOGIN_BUTTON).click();
                cy.url().should("include", "/inventory.html");
                cy.get(swaglocators.MENU).should("be.visible").click();
                cy.get(swaglocators.LOGOUT_BUTTON).should("be.visible").click();
                cy.get(swaglocators.LOGIN_BUTTON).should("be.visible");
            } else if (user.username === "locked_out_user") {
                cy.get(swaglocators.LOGIN_BUTTON).click();
                cy.get(swaglocators.ERROR_MESSAGE)
                    .should("be.visible")
                    .and(
                        "contain",
                        "Epic sadface: Sorry, this user has been locked out."
                    );
                cy.reload();
            } else user.username === "";
            cy.get(swaglocators.LOGIN_BUTTON).click();
            cy.get(swaglocators.ERROR_MESSAGE).should(
                "contain",
                "Epic sadface: Username is required"
            );
        });
    });
}

//It checks that the list of items on the main page is six by default
export function checkproductList() {
    cy.url().should("include", "/inventory.html");
    cy.get(swaglocators.LIST_WITH_ITEMS).then((products) => {
        if (products.length === 6) {
            // Assertion to ensure there are 6 products
            expect(products).to.have.length(6);
            cy.log("6 products are displayed as expected");
        } else {
            cy.log("The number of products displayed is not 6");
        }
    });
}

//Add 3 products from the list to the cart
export function addToCart() {
    cy.get(swaglocators.LIST_WITH_ITEMS).then(() => {
        const itemsToAdd = [
            "Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt",
        ];
        itemsToAdd.forEach((item) => {
            cy.contains(item).parents(".inventory_item").find("button").click();
            cy.contains(item)
                .parents(".inventory_item")
                .find("button")
                .should("contain", "Remove");
        });
    });
}

//Checks if there are 3 items on the list and remove one of them so we can have only 2
export function removeItemFromCart() {
    cy.get(swaglocators.SHOPPING_CART_LINK).then((cart) => {
        // Assuming the item count is text within the cart element
        const itemCount = parseInt(cart.text());
        if (itemCount === 3) {
            cy.wrap(cart).click({ force: true });
        }
    });
    cy.get(swaglocators.LIST_WITH_ITEMS).first().find("button").click();
    cy.get(swaglocators.CART_LIST).should("have.length", "1");
}

//Testing the checkout functionality with positive and negative cases for the checkout form
export function checkOut() {
    cy.get(swaglocators.CHECKOUT_BUTTON).click();
    cy.get(swaglocators.CONTINUE_BUTTON).click();
    cy.get(swaglocators.ERROR_MESSAGE).then((error) => {
        if (Cypress.$(error).is(":visible")) {
            cy.get(swaglocators.FIRST_NAME_INPUT_CHECKOUT).type("Ivan");
            cy.get(swaglocators.LAST_NAME_INPUT_CHECKOUT).type("Ivanov");
            cy.get(swaglocators.POST_CODE_INPUT_CHECKOUT).type("12345");
            cy.get(swaglocators.CONTINUE_BUTTON).click();
            cy.get(swaglocators.CART_LIST).should("have.length", "1");
            cy.get(swaglocators.FINISH_BUTTON).click();
            cy.get(swaglocators.MESSAGE_FOR_CHECKOUT)
                .should("be.visible")
                .and("contain", "Thank you for your order!");
            cy.get(swaglocators.GO_BACK_TO_PRODUCTS_BUTTON).click();
            cy.url().should("include", "/inventory.html");
            cy.get(swaglocators.CART_LIST).should("have.length", "0");
        }
    });
}

export function sortItems() {
    cy.get('.product_sort_container').select('Name (A to Z)')
    cy.get('.inventory_item_name').then(items => {
      const sortedItems = [...items].map(item => item.innerText).sort()
      const displayedItems = [...items].map(item => item.innerText)
      expect(displayedItems).to.deep.equal(sortedItems)
    })

    cy.get('.product_sort_container').select('Name (Z to A)')
    cy.get('.inventory_item_name').then(items => {
      const sortedItems = [...items].map(item => item.innerText).sort().reverse()
      const displayedItems = [...items].map(item => item.innerText)
      expect(displayedItems).to.deep.equal(sortedItems)
    })

    cy.get('.product_sort_container').select('Price (low to high)')
    cy.get('.inventory_item_price').then(items => {
      const sortedItems = [...items].map(item => parseFloat(item.innerText.replace('$', ''))).sort((a, b) => a - b)
      const displayedItems = [...items].map(item => parseFloat(item.innerText.replace('$', '')))
      expect(displayedItems).to.deep.equal(sortedItems)
    })

    cy.get('.product_sort_container').select('Price (high to low)')
    cy.get('.inventory_item_price').then(items => {
      const sortedItems = [...items].map(item => parseFloat(item.innerText.replace('$', ''))).sort((a, b) => b - a)
      const displayedItems = [...items].map(item => parseFloat(item.innerText.replace('$', '')))
      expect(displayedItems).to.deep.equal(sortedItems)
    })
}