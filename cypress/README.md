
![alt text](https://raw.githubusercontent.com/team99/99-automation-cypress/master/img/Cypress_logo2.png?token=AE7Z76NBFEQFMA2QIYLUNRTA3LLDY)



# Rumah123 Automation Cypress

This repo is created to provide automated E2E testing for the testing environment of rumah123 app.

The end goal of this repo is to run automated end-to-end testing on firing tracker rumah123.com.

## Requirements

- [NodeJs](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

## Directory Structure

We follow the standard Cypress structure to build this repo. If anyone feels the current structure could be better, feel free to suggest improvements to the 99.co QA team.

```
├── cypress/
│   ├── fixtures/
│   ├── integration/
│   |   |    └── ... < page name eg. new-launch-homepage >
│   |   |        └── ... < *.spec.js >
│   ├── plugins/
│   │   └── index.js
│   └── support/
│       ├── rumah-123
│       |        └── ... < *.command.js >
│       └── index.js
├── img
├── .gitignore
├── cypress.json
├── yarn.lock.json
├── package.json
└── README.md
```

## How to start the installation

1. Install [NodeJs](https://nodejs.org/en/download/) & [npm](https://www.npmjs.com/get-npm) if you do not have them.
2. Clone the repo into your intended directory.
3. From within the `gtm-test-tools` directory, run the command
   ```
   $ yarn install
   ```

## How to use the Cypress test runner

All of the following information is documented in [Cypress/Core Concepts - The Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview).

1. Cypress runs tests in a unique interactive runner that allows you to see commands as they execute while also viewing the application under test.
![Cypress Test Runner](https://raw.githubusercontent.com/team99/99-automation-cypress/master/img/Cypress_test_runner.png?token=AE7Z76NCR5ZPXRSHZDYNUADA3LL2I)

1. To open the test runner, run the following command in your directory:
   ```
   $ yarn cy:open
   ```

## Cypress Commands

Cypress comes with its own API for creating custom commands and overwriting existing commands. These commands are separated for each portal and located in the `/cypress/support/<portal-name>/*` directory. Inside the `<portal-name>` directory, they will be divided into directories (one-level) based on the feature.


Use <command_name>.command.js as the file name e.g `rumah-123/login.command.js`. As for the command name itself, use camelCase and end it with the entitiy code in uppercase e.g `saveLocalStorage`.

```js
const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});
```
