const locators = require("../github_page_objects/github-locators");

//Log in using wrong credentials
export function logInWithWrongCredentials(
  invalidName,
  invalidPassword,
  errorMessage
) {
  cy.visit("/");
  cy.get(locators.INPUT_LOGIN_USER).should("be.visible");
  cy.get(locators.INPUT_LOGIN_USER).type(invalidName);
  cy.get(locators.INPUT_LOGIN_PASSWORD).type(invalidPassword);
  cy.get(locators.SIGN_IN_BUTTON).click({ force: true });
  cy.get(locators.ERROR_MESSAGE).contains(errorMessage).should("be.visible");
}

//Try to log in with empty inputs it should not be able to
export function logInWithEmptyInputs() {
  cy.visit("/");
  cy.get(locators.INPUT_LOGIN_USER).should("be.visible");
  cy.get(locators.INPUT_LOGIN_USER).clear().should("be.empty");
  cy.get(locators.INPUT_LOGIN_PASSWORD).clear().should("be.empty");
  cy.get(locators.SIGN_IN_BUTTON).click({ force: true });
}

//Creating new Public repository with README file in it
export function createPublicRepository(repoName, description) {
  cy.logIn();
  cy.get(locators.CREATE_REPO_BUTTON)
    .contains("Create repository")
    .and("be.visible")
    .click({ force: true });
  cy.get(locators.REPO_NAME_INPUT).type(repoName);
  cy.get(locators.DISCRIPTION_INPUT).type(description);
  cy.get(locators.PUBLIC_RADIO_BUTTON)
    .should("be.checked")
    .and("have.value", "public");
  cy.get(locators.README_FILE_CHECKBOX).should("not.be.checked").check();
  cy.get("button")
    .contains("Create repository")
    .then(($btn) => {
      console.log($btn);
      cy.wrap($btn).click();
    });
  cy.get(locators.MAIN_REPO_CONTAINER_NAME)
    .should("contain", repoName)
    .and("be.visible");
  cy.get(locators.MAIN_REPO_CONTAINER_LABEL).contains("Public");
}

//Creating new Private repository with README file in it
export function createPrivateRepository(repoName, description) {
  cy.logIn();
  cy.get(locators.NEW_REPO_BUTTON)
    .contains("New")
    .and("be.visible")
    .click({ force: true });
  cy.get(locators.REPO_NAME_INPUT).type(repoName);
  cy.get(locators.DISCRIPTION_INPUT).type(description);
  cy.get(locators.PRIVATE_RADIO_BUTTON)
    .should("have.value", "private")
    .check({ force: true });
  cy.get(locators.README_FILE_CHECKBOX)
    .should("not.be.checked")
    .check({ force: true });
  cy.get("button")
    .contains("Create repository")
    .then(($btn) => {
      console.log($btn);
      cy.wrap($btn).click();
    });
  cy.get(locators.MAIN_REPO_CONTAINER_NAME)
    .should("contain", "Private-repo")
    .and("be.visible");
  cy.get(locators.MAIN_REPO_CONTAINER_LABEL).contains("Private");
}

//Checking the dashboard sidebar list that the two created repos are there
export function checkReposInDashboardList(repoOne, repoTwo) {
  cy.logIn();
  cy.get(locators.DASHBOARD_SIDEBAR_REPOS_LIST)
    .should("have.length", 1)
    .then(($lis) => {
      // Verify the content of each li element
      expect($lis).to.contain(repoOne);
      expect($lis).to.contain(repoTwo);
    });
}

//Creating new branch in the private repo
export function createNewBranchPrivateRepo(branchName) {
  cy.logIn();
  cy.contains(locators.PRVATE_REPO_LINK_DASBOARD_SIDEBARE).click({
    force: true,
  });
  cy.get("a").contains("Branch").click({ force: true });
  cy.get(locators.NEW_BRANCH_LINK)
    .contains("New branch")
    .invoke("removeAttr", "data-no-visuals")
    .click({ force: true });
  cy.get(locators.NEW_BRANCH_NAME_INPUT, { timeout: 10000 }).should(
    "be.visible"
  );
  cy.get(locators.NEW_BRANCH_NAME_INPUT).should("be.visible").type(branchName);
  cy.get(locators.CREATE_NEW_BRANCH_BUTTON)
    .contains("Create new branch")
    .click({ force: true });
}

//Deleting the private repo with the branch in it
export function deletePrivateRepository() {
  cy.logIn();
  cy.visit("https://github.com/github-demo-test-1/Private-repo");
  cy.get(locators.SETTING_BUTTON).should("be.visible").click();
  cy.get(locators.DELETE_THIS_REPO_BUTTON).click();
  cy.get(locators.PROCEED_DELETE_REPO_BUTTON).should("be.visible");
  cy.get(locators.DELETE_REPO_TEXT).then((p) => {
    const text = p.text();
    cy.get(locators.PROCEED_DELETE_REPO_BUTTON).click();
    cy.get(locators.PROCEED_DELETE_REPO_BUTTON).click();
    cy.get(locators.DELETE_VERIFICATION_INPUT).type(text);
    cy.get(locators.PROCEED_DELETE_REPO_BUTTON).click();
  });
}