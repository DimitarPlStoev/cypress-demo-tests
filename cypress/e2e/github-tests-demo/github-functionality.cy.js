const githubsuit = require("../..//support/github-test-suit/github-test-suit");
const locators = require("../../support/github_page_objects/github-locators");

describe("Testing basic functionalities in GitHub.com ", () => {
  before("Setting up the test environment before tests run", () => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("Negative test cases for log in", () => {
    githubsuit.logInWithWrongCredentials(
      "Ivan Penchev",
      "1234",
      "Incorrect username or password."
    );
  });

  it("Log in with empty inputs", () => {
    githubsuit.logInWithEmptyInputs();
  });

  it("Should log in to GitHub with the right credentials successfully", () => {
    cy.logIn();
  });

  it("Create Public and Private repository functionality", () => {
    githubsuit.createPublicRepository("Public-repo", "Creating public repo");
    githubsuit.createPrivateRepository("Private-repo", "Creating private repo");
  });

  it("Checking the dashboard list for the two created repos", () => {
    githubsuit.checkReposInDashboardList(
      "github-demo-test-1/Private-repo",
      "github-demo-test-1/Public-repo"
    );
  });

  it("Create new branch in the private repo and delete the repo functionality", () => {
    githubsuit.createNewBranchPrivateRepo("Branch one");
    githubsuit.deletePrivateRepository();
  });
});