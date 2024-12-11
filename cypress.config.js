const { defineConfig } = require("cypress");
const fs = require('fs');
module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  retries:{
    runMode: 2,
    openMode:0
},
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    setupNodeEvents(on, config) {
      on('task', {
        fileExists(filePath) {
          return fs.existsSync(filePath);
        },
      });
    },
    baseUrl: "https://d3pv22lioo8876.cloudfront.net/tiptop/",
    specPattern: "cypress/e2e/**/*.{js, jsx, ts, tsx}"
  },
});
