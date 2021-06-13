describe("Data Tracker NHP", function () {
  //  beforeEach(function () {
  //    cy.visit("http://localhost/perumahan-baru");
  //  });

  it("New Launch Home Page Data Tracker - Impression Page", function () {
    cy.visit("http://localhost/perumahan-baru");
    cy.window().then((win) => {
      assert.isDefined(win.dataLayer, "Data Layer is defined");

      const listingHot = win.dataLayer.find(
        (x) => x.event === "listingHot" && x.source === "NHP-New Launch-Bottom"
      );
      assert.isDefined(listingHot, "Listing Hot is exist");
      if (listingHot) {
        cy.fixture("NHP/hp-hot-properties").then((hotproperties) => {
          assert.equal(listingHot.source, hotproperties.source);
          assert.equal(
            listingHot.listingImpressions.length,
            hotproperties.listingImpressions.length
          );
        });
      }
    });
  });

  it("New Launch Home Page Data Tracker - Action", function () {
    cy.viewport("macbook-15").visit("http://localhost/perumahan-baru");
    cy.wait(3000)
      .get(".rui-icon-arrow-right-small")
      .eq(1)
      .click({ force: true })
      .wait(1000);
    cy.window().then((win) => {
      assert.isDefined(win.dataLayer, "Data Layer is defined");
      console.log(win.dataLayer);
    });
  });
});
