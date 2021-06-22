describe("Testing Popular Property Section", () => {
  describe("Testing Non Login", () => {
    beforeEach(() => {
      cy.viewport(`macbook-15`).visit(Cypress.env("HOME_PAGE"));
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
            event === "listingHot" && source === "HP-Popular Properties"
        );

        cy.fixture("homepage/popular-property/listing-hot-non-login").then(
          (fixture) => {
            assert.isDefined(listingHot);
            assert.deepEqual(listingHot, fixture);
          }
        );
      });
    });

    it("Is send tracker listing click when user click one of popular property card", () => {
      cy.get(
        ".ui-home-page__popular-listing__content .ui-organisms-card-r123-popular > a"
      )
        .eq(0)
        .click({
          commandKey: true,
          ctrlKey: true
        });

      cy.window().then((win) => {
        const popularProperty = win.dataLayer.find(
          ({ event, source }) =>
            source === "HP-Popular Properties" && event === "listingClick"
        );

        cy.fixture("homepage/popular-property/on-click-non-login").then(
          (fixture) => {
            assert.isDefined(popularProperty);
            assert.deepEqual(popularProperty, fixture);
          }
        );
      });
    });
  });

  describe("Testing Login", () => {
    beforeEach(() => {
      cy.viewport("macbook-15")
        .visit(Cypress.env("HOME_PAGE"))
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
            event === "listingHot" && source === "HP-Popular Properties"
        );

        cy.fixture("homepage/popular-property/listing-hot-login").then(
          (fixture) => {
            assert.isDefined(listingHot);
            assert.deepEqual(listingHot, fixture);
          }
        );
      });
    });

    it("Is send tracker listing click when user click one of popular property card", () => {
      cy.get(
        ".ui-home-page__popular-listing__content .ui-organisms-card-r123-popular > a"
      )
        .eq(0)
        .click({
          commandKey: true,
          ctrlKey: true
        });

      cy.window().then((win) => {
        const popularProperty = win.dataLayer.find(
          ({ event, source }) =>
            source === "HP-Popular Properties" && event === "listingClick"
        );

        cy.fixture("homepage/popular-property/on-click-login").then(
          (fixture) => {
            assert.isDefined(popularProperty);
            assert.deepEqual(popularProperty, fixture);
          }
        );
      });
    });
  });
});
