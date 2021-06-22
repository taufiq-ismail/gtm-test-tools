describe("Testing News Section", () => {
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

    it("Is send tracker listing click when user click one of selected news card", () => {
      cy.get(".ui-organisms-card-r123-article > a").eq(0).click({
        commandKey: true,
        ctrlKey: true
      });

      cy.window().then((win) => {
        const selectedNews = win.dataLayer.find(
          ({ event, source }) =>
            source === "HP-Featured Article" && event === "navigationInternal"
        );

        cy.fixture("homepage/news-section/click-news-non-login").then(
          (fixture) => {
            assert.isDefined(selectedNews);
            assert.deepEqual(selectedNews, fixture);
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

    it("Is send tracker listing click when user click one of selected news card", () => {
      cy.get(".ui-organisms-card-r123-article > a").eq(0).click({
        commandKey: true,
        ctrlKey: true
      });

      cy.window().then((win) => {
        const selectedNews = win.dataLayer.find(
          ({ event, source }) =>
            source === "HP-Featured Article" && event === "navigationInternal"
        );

        cy.fixture("homepage/news-section/click-news-login").then((fixture) => {
          assert.isDefined(selectedNews);
          assert.deepEqual(selectedNews, fixture);
        });
      });
    });
  });
});
