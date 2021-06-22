// ui-organism-footer-r123__bottom-section__wrapper-sitemap

describe("Testing Footer Section", () => {
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

    it("Is send tracker navigation internal when user click one of selected sitemap link", () => {
      cy.get(
        ".ui-organism-footer-r123__bottom-section__wrapper-sitemap > div >  a"
      )
        .eq(0)
        .click({
          commandKey: true,
          ctrlKey: true
        });

      cy.window().then((win) => {
        const sitemapLink = win.dataLayer.find(
          ({ event, source }) =>
            source === "HP" && event === "navigationInternal"
        );

        cy.fixture("homepage/footer-section/click-sitemap-non-login").then(
          (fixture) => {
            assert.isDefined(sitemapLink);
            assert.deepEqual(sitemapLink, fixture);
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

    it("Is send tracker navigation internal when user click one of selected sitemap link", () => {
      cy.get(
        ".ui-organism-footer-r123__bottom-section__wrapper-sitemap > div >  a"
      )
        .eq(0)
        .click({
          commandKey: true,
          ctrlKey: true
        });

      cy.window().then((win) => {
        const sitemapLink = win.dataLayer.find(
          ({ event, source }) =>
            source === "HP" && event === "navigationInternal"
        );

        cy.fixture("homepage/footer-section/click-sitemap-login").then(
          (fixture) => {
            assert.isDefined(sitemapLink);
            assert.deepEqual(sitemapLink, fixture);
          }
        );
      });
    });
  });
});
