describe("Tracker On Visit New Launch Page", () => {
  beforeEach(() => {
    cy.viewport("macbook-15").visit(
      "http://release.core.rumah123.com/perumahan-baru/"
    );
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

      assert.isDefined(pageView);
      assert.deepEqual(pageView, {
        event: "pageview",
        source: "NHP",
        userInfo: {
          client: {
            id: "",
            language: "id-ID"
          },
          login: {
            id: "",
            status: "logged-out",
            type: "Email"
          }
        }
      });
    });
  });
});
