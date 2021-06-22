/* eslint-disable import/no-extraneous-dependencies */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// the next comment line loads the custom commands from the plugin
// so that our editor understands "cy.frameLoaded" and "cy.iframe"

// the next comment line loads the custom commands from the plugin
// so that our editor understands "cy.frameLoaded" and "cy.iframe"
/// <reference types="cypress-iframe" />

import "cypress-iframe";

Cypress.Commands.overwrite("visit", async (orig, url, options) => {
  let tempOption = { ...(options || {}) };

  const auth = {
    password: "core99iddev",
    username: "core"
  };

  if (tempOption) {
    tempOption.auth = auth;
  } else {
    tempOption = {
      auth,
      failOnStatusCode: false
    };
  }

  // eslint-disable-next-line no-return-await
  return await orig(url, tempOption);
});
