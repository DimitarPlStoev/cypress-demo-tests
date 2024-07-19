const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://github.com/login',
    // specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    chromeWebSecurity: false,
    specPattern: 'cypress/e2e/**/*.{js,ts}',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
    },
  },
});