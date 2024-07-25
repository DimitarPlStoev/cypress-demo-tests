// const { isEmpty } = require("cypress/types/lodash");
const locators = require("./github_page_objects/github-locators");
const swaglocators = require("../support/swag-page-objects/swag-locators");
//-----------------------------------------------GitHub tests---------------------------------
//LogIn with a valid credentials for the GitHub tests
Cypress.Commands.add("logIn", () => {
  cy.visit("/");
  cy.get(locators.INPUT_LOGIN_USER).should("be.visible");
  cy.get(locators.INPUT_LOGIN_USER).type(Cypress.env("GITHUB_USERNAME"));
  cy.get(locators.INPUT_LOGIN_PASSWORD).type(Cypress.env("GITHUB_PASSWORD"), {
    log: false,
  });
  cy.get(locators.SIGN_IN_BUTTON).click();
  cy.get(".AppHeader-context-item").contains("Dashboard").and("be.visible");
});

//Save the token to local storage
Cypress.Commands.add("saveGithubToken", (token) => {
  window.localStorage.setItem("github_token", token);
  //Verifies that the token was correctly stored
  cy.window().then((window) => {
    const savedToken = window.localStorage.getItem("github_token");
    expect(savedToken).to.equal(token);
  });
});

//-------------------------------------------------SWAG APP TESTS-----------------------------
Cypress.Commands.add("loginSwag", () => {
  cy.visit(swaglocators.SWAG_PAGE_URL);
  cy.get(swaglocators.USERNAME_INPUT).should("be.visible");
  cy.get(swaglocators.USERNAME_INPUT).type(Cypress.env("SWAG_USERNAME"));
  cy.get(swaglocators.PASSWORD_INPUN).type(Cypress.env("SWAG_PASSWORD"), {
    log: false,
  });
  cy.get(swaglocators.LOGIN_BUTTON).click();
  cy.url().should("include", "/inventory.html");
});

Cypress.Commands.add("logout", () => {
  cy.get("body").then(($body) => {
    if ($body.find(swaglocators.LOGOUT_BUTTON)) {
      cy.get(swaglocators.MENU).should("be.visible").click();
      cy.get(swaglocators.LOGOUT_BUTTON).should("be.visible").click();
      cy.get(swaglocators.LOGIN_BUTTON).should("be.visible");
    }
  });
});
