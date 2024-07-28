# cypress-demo-tests
--------------------------------------------------------------------GitHub Test Plan and Test Caces-----------------------------------------------------------------
## Test Plan for GitHub Functionalities
This test plan outlines the testing process for verifying the functionalities of GitHub, particularly focusing on testing in the Chrome browser. The functionalities covered include logging in with wrong credentials, logging in with empty inputs, logging in successfully, creating public and private repositories, checking repositories in the dashboard list, creating a new branch in a private repository, and deleting a private repository.

1. Testing Environment
Browser: Google Chrome (latest version)
Platform: Mac/Linux
GitHub URL: https://github.com
2. Pre-requisites
A valid GitHub account with necessary permissions.
Google Chrome installed.

## Test Cases

### 1. Log In with Wrong Credentials
- **Objective:** Verify that the user cannot log in with incorrect credentials.
- **Steps:**
  1. Navigate to the GitHub login page.
  2. Enter an invalid username and password.
  3. Click the "Sign in" button.
- **Expected Result:** An error message is displayed indicating invalid credentials.

### 2. Log In with Empty Inputs
- **Objective:** Verify that the user cannot log in with empty input fields.
- **Steps:**
  1. Navigate to the GitHub login page.
  2. Leave the username and password fields empty.
  3. Click the "Sign in" button.
- **Expected Result:** An error message is displayed indicating that both fields are required.

### 3. Log In
- **Objective:** Verify that the user can log in with valid credentials.
- **Steps:**
  1. Navigate to the GitHub login page.
  2. Enter a valid username and password.
  3. Click the "Sign in" button.
- **Expected Result:** The user is successfully logged in and redirected to the GitHub dashboard.

### 4. Create Public Repository
- **Objective:** Verify that the user can create a public repository.
- **Steps:**
  1. Log in to GitHub.
  2. Navigate to the "New repository" page.
  3. Enter a repository name and select "Public".
  4. Click the "Create repository" button.
- **Expected Result:** A new public repository is created and visible in the user's repository list.

### 5. Create Private Repository
- **Objective:** Verify that the user can create a private repository.
- **Steps:**
  1. Log in to GitHub.
  2. Navigate to the "New repository" page.
  3. Enter a repository name and select "Private".
  4. Click the "Create repository" button.
- **Expected Result:** A new private repository is created and visible in the user's repository list.

### 6. Check Repositories in Dashboard List
- **Objective:** Verify that the repositories are listed correctly in the dashboard.
- **Steps:**
  1. Log in to GitHub.
  2. Navigate to the user's dashboard.
- **Expected Result:** All public and private repositories are listed correctly.

### 7. Create New Branch in Private Repository
- **Objective:** Verify that the user can create a new branch in a private repository.
- **Steps:**
  1. Log in to GitHub.
  2. Navigate to a private repository.
  3. Go to the "Branches" section.
  4. Enter a new branch name and create the branch.
- **Expected Result:** A new branch is created and visible in the repository.

### 8. Delete Private Repository
- **Objective:** Verify that the user can delete a private repository.
- **Steps:**
  1. Log in to GitHub.
  2. Navigate to a private repository.
  3. Go to the "Settings" section.
  4. Scroll down and click "Delete this repository".
  5. Confirm the deletion.
- **Expected Result:** The private repository is deleted and no longer visible in the user's repository list.




------------------------------------------------------------------Swag Labs Test Plan and Test Caces-----------------------------------------------------------------

### Test Cases

#### 1. Login with other users
**Description:** Test logging in with different user credentials.
- **Steps:**
  1. Navigate to https://www.saucedemo.com/
  2. Enter username and password for different users.
  3. Click the "Login" button.
- **Expected Result:** Users should be logged in successfully and directed to the products page.

#### 2. Login Swag
**Description:** Test logging in with the "standard_user" account.
- **Steps:**
  1. Navigate to https://www.saucedemo.com/
  2. Enter username: `standard_user`
  3. Enter password: `secret_sauce`
  4. Click the "Login" button.
- **Expected Result:** The user should be logged in successfully and directed to the products page.

#### 3. Check the product list
**Description:** Verify that the product list is displayed correctly.
- **Steps:**
  1. Log in as any valid user.
  2. Check the product list on the products page.
- **Expected Result:** All products should be displayed with correct names, images, and prices.

#### 4. Log out
**Description:** Test the logout functionality.
- **Steps:**
  1. Log in as any valid user.
  2. Click on the menu button.
  3. Click on the "Logout" link.
- **Expected Result:** The user should be logged out and redirected to the login page.

#### 5. Add items to cart
**Description:** Test adding an item to the cart.
- **Steps:**
  1. Log in as any valid user.
  2. Click on the "Add to cart" button for any product.
- **Expected Result:** The product should be added to the cart, and the cart count should increase.

#### 6. Remove item from the cart
**Description:** Test removing an item from the cart.
- **Steps:**
  1. Log in as any valid user.
  2. Add a product to the cart.
  3. Click on the cart icon.
  4. Click the "Remove" button for the product.
- **Expected Result:** The product should be removed from the cart, and the cart count should decrease.

#### 7. Check out
**Description:** Test the checkout process.
- **Steps:**
  1. Log in as any valid user.
  2. Add products to the cart.
  3. Click on the cart icon.
  4. Click the "Checkout" button.
  5. Fill in the necessary checkout information.
  6. Click the "Finish" button.
- **Expected Result:** The user should be able to complete the checkout process successfully.

#### 8. Sort items from AtoZ
**Description:** Test sorting items from A to Z.
- **Steps:**
  1. Log in as any valid user.
  2. Select "Name (A to Z)" from the sort dropdown.
- **Expected Result:** Products should be sorted in alphabetical order from A to Z.

#### 9. Sort items from ZtoA
**Description:** Test sorting items from Z to A.
- **Steps:**
  1. Log in as any valid user.
  2. Select "Name (Z to A)" from the sort dropdown.
- **Expected Result:** Products should be sorted in reverse alphabetical order from Z to A.

#### 10. Sort items by price Low To High
**Description:** Test sorting items by price from low to high.
- **Steps:**
  1. Log in as any valid user.
  2. Select "Price (low to high)" from the sort dropdown.
- **Expected Result:** Products should be sorted by price from low to high.

#### 11. Sort items by price High To Low
**Description:** Test sorting items by price from high to low.
- **Steps:**
  1. Log in as any valid user.
  2. Select "Price (high to low)" from the sort dropdown.
- **Expected Result:** Products should be sorted by price from high to low.

-----------------------------------------------------------------To Do List Test Plan and Test Caces-----------------------------------------------------------------

### 1. Delete existing items if there is some 
**Description:** Test deleting existing items from the todo list.
- **Steps:**
  1. Open the todo application.
  2. Add a few items to the list if there are no existing items.
  3. Click on the delete button (usually represented by an "X" or trash icon) next to an item.
  4. Confirm the deletion if prompted.
- **Expected Result:** The selected item should be removed from the list, and the list should update accordingly without the deleted item.

### 2. Create new items on the list
**Description:** Test creating new items on the todo list.
- **Steps:**
  1. Open the todo application.
  2. Enter a new item name in the input field.
  3. Press "Enter" or click the "Add" button to add the item to the list.
- **Expected Result:** The new item should appear at the bottom of the list, and the input field should be cleared for the next entry.

### 3. Store list values
**Description:** Test storing the current values of the todo list.
- **Steps:**
  1. Open the todo application.
  2. Add a few items to the list if there are no existing items.
  3. Verify that the list values are stored (this could involve checking local storage or database, depending on implementation).
  4. Refresh the page or reopen the application.
- **Expected Result:** The list should persist its values even after refreshing the page or reopening the application.

### 4. Uncheck some of the items
**Description:** Test unchecking one of the checked items on the todo list.
- **Steps:**
  1. Open the todo application.
  2. Add a new item and check it off to mark it as completed.
  3. Uncheck the previously checked item.
- **Expected Result:** The item should move from the completed section back to the active items section, and its appearance should update accordingly (e.g., text should not be strikethrough).