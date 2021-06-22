describe("Testing Selected Property Section", () => {
  describe("Testing Non Login", () => {
    beforeEach(() => {
      cy.viewport(`macbook-15`).visit(Cypress.env("NEW_LAUNCH_PAGE"));
    });

    it("Check gtm request is exist", () => {
      cy.intercept("GET", Cypress.env("GTM_ENDPOINT"), (req) => {
        req.continue((response) => {
          expect(response.statusCode).to.equal(200);
        });
      });
    });

    it("Is send tracker listing hot when user first load", () => {
      cy.window().then((win) => {
        const listingHot = win.dataLayer.find(
          ({ event, source }) =>
            event === "listingHot" && source === "NHP-New Launch-Top"
        );

        cy.fixture(
          "new-launch-homepage/selected-property/listing-hot-non-login"
        ).then((fixture) => {
          assert.isDefined(listingHot);
          assert.deepEqual(listingHot, fixture);
        });
      });
    });

    it("Is send tracker listing click when user click one of selected property card", () => {
      cy.get("div.ui-organisms-card-r123-sponsored-property > a").eq(0).click({
        commandKey: true,
        ctrlKey: true
      });

      cy.window().then((win) => {
        const selectedProperty = win.dataLayer.find(
          ({ event, source }) =>
            source === "NHP-New Launch-Top" && event === "listingClick"
        );

        cy.fixture(
          "new-launch-homepage/selected-property/on-click-non-login"
        ).then((fixture) => {
          assert.isDefined(selectedProperty);
          assert.deepEqual(selectedProperty, fixture);
        });
      });
    });
  });

  describe("Testing Login", () => {
    beforeEach(() => {
      cy.viewport("macbook-15")
        .visit(Cypress.env("NEW_LAUNCH_PAGE"))
        .doLoginAndRefresh();
    });

    it("Check gtm request is exist", () => {
      cy.intercept("GET", Cypress.env("GTM_ENDPOINT"), (req) => {
        req.continue((response) => {
          expect(response.statusCode).to.equal(200);
        });
      });
    });

    it("Is send tracker listing hot when user first load", () => {
      cy.window().then((win) => {
        const listingHot = win.dataLayer.find(
          ({ event, source }) =>
            event === "listingHot" && source === "NHP-New Launch-Top"
        );

        cy.fixture(
          "new-launch-homepage/selected-property/listing-hot-login"
        ).then((fixture) => {
          assert.isDefined(listingHot);
          assert.deepEqual(listingHot, fixture);
        });
      });
    });

    it("Is send tracker listing click when user click one of selected property card", () => {
      cy.get("div.ui-organisms-card-r123-sponsored-property > a").eq(0).click({
        commandKey: true,
        ctrlKey: true
      });

      cy.window().then((win) => {
        const selectedProperty = win.dataLayer.find(
          ({ event, source }) =>
            source === "NHP-New Launch-Top" && event === "listingClick"
        );

        cy.fixture("new-launch-homepage/selected-property/on-click-login").then(
          (fixture) => {
            assert.isDefined(selectedProperty);
            assert.deepEqual(selectedProperty, fixture);
          }
        );
      });
    });
  });
});
