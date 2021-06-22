describe("Tracker On Visit New Launch Page", () => {
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

    it("Check pageview section datalayer is exist", () => {
      cy.window().then((win) => {
        const pageView = win.dataLayer.find((x) => x.event === "pageview");

        cy.fixture("homepage/visit-page/non-login").then((fixture) => {
          assert.isDefined(pageView);
          assert.deepEqual(pageView, fixture);
        });
      });
    });
  });

  describe("Testing With Login", () => {
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

    it("Check pageview section datalayer is exist", () => {
      cy.window().then((win) => {
        const pageView = win.dataLayer.find((x) => x.event === "pageview");

        cy.fixture("homepage/visit-page/login").then((fixture) => {
          assert.isDefined(pageView);
          assert.deepEqual(pageView, fixture);
        });
      });
    });
  });
});
