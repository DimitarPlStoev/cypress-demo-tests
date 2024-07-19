// const { isEmpty } = require("cypress/types/lodash");
const locators = require("./github_page_objects/github-locators");

//-----GitHub tests-----
//LogIn with a valid credentials for the GitHub tests
Cypress.Commands.add("logIn", (user, pw) => {
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