const url = "http://release.core.rumah123.com/perumahan-baru/";
const gtmRequest = "https://www.googletagmanager.com/gtm.js?id=*";
const viewport = "macbook-15";

describe("Data Tracker NHP", () => {
  beforeEach(() => {
    cy.viewport(viewport).visit(url);
  });

  it("Check gtm request is exist", () => {
    cy.intercept("GET", gtmRequest, (req) => {
      req.continue((response) => {
        expect(response.statusCode).to.equal(200);
      });
    });
  });

  it("Check pageview section datalayer is exist", () => {
    cy.window().then((win) => {
      const pageView = win.dataLayer.find((x) => x.event === "pageview");
      assert.isDefined(pageView);
    });
  });

  it("Check NHP-New Launch-Bottom section datalayer is exist", () => {
    cy.window().then((win) => {
      const listingHot = win.dataLayer.find(
        (x) => x.event === "listingHot" && x.source === "NHP-New Launch-Bottom"
      );
      assert.isDefined(listingHot, "Listing Hot is exist");
      if (listingHot) {
        cy.fixture("NHP/nhp-new-launch-bottom").then((hotproperties) => {
          assert.equal(listingHot.source, hotproperties.source);
          assert.equal(
            listingHot.listingImpressions.length,
            hotproperties.listingImpressions.length
          );
        });
      }
    });
  });

  it("Check NHP-New Launch-Top section datalayer is exist", () => {
    cy.window().then((win) => {
      const listingHot = win.dataLayer.find(
        (x) => x.event === "listingHot" && x.source === "NHP-New Launch-Top"
      );
      assert.isDefined(listingHot, "Listing Hot is exist");
      if (listingHot) {
        cy.fixture("NHP/nhp-new-launch-top").then((hotproperties) => {
          assert.equal(listingHot.source, hotproperties.source);
          assert.equal(
            listingHot.listingImpressions.length,
            hotproperties.listingImpressions.length
          );
        });
      }
    });
  });

  it("Check Listing Carousel action and data layer is exist", () => {
    cy.wait(3000)
      .get(".rui-icon-arrow-right-small")
      .eq(1)
      .click({ force: true })
      .wait(1000);
    cy.window().then((win) => {
      assert.isDefined(win.dataLayer, "Data Layer is defined");
      cy.fixture("NHP/action-listingCarousel").then((fixture) => {
        const listingCarousel = win.dataLayer.find(
          (x) => x.source === fixture.source && x.event === fixture.event
        );
        assert.isDefined(listingCarousel);
      });
    });
  });

  it("Check Listing Click action and data layer is exist", () => {
    cy.wait(300);
    cy.get(".ui-organisms-card-r123-popular").eq(1).click({
      ctrlKey: true
    });

    cy.window().then((win) => {
      console.debug(win.dataLayer);
      const listingCarousel = win.dataLayer.find(
        (x) =>
          x.source === "NHP-New Launch-Bottom" && x.event === "listingClick"
      );
      assert.isDefined(listingCarousel);
    });
  });
});
