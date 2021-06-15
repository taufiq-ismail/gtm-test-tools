// const { assert } = require('chai');
describe("New Launch Home page", function () {
  test("Test Pageview section", function (browser) {
    browser
      .windowMaximize()
      .url("https://core:core99iddev@release.core.rumah123.com/perumahan-baru/")
      .pause(3 * 1000)
      //  .moveToElement(
      //    ".ui-molecules-popular-location-slider-r123__heading",
      //    10,
      //    10
      //  )
      //  .pause(3000)
      //  //   .execute(() => {
      //     const selector = ".ui-molecules-carousel__action--next";
      //     const obj = document.querySelector(selector);
      //     const evObj = document.createEvent("Events");
      //     evObj.initEvent("click", true, false);
      //     obj.dispatchEvent(evObj);
      //   })
      // .click(".ui-molecules-carousel__action--next")
      .execute(
        () => {
          return window.dataLayer;
        },
        [],
        function (result) {
          const dataLayer = result.value;
          browser.assert.ok(dataLayer !== undefined, "Data Layer is exist");
          const listingHotTop = dataLayer.find(
            (x) => x.event === "listingHot" && x.source === "NHP-New Launch-Top"
          );
          browser.assert.ok(
            listingHotTop !== undefined,
            "Listing Hot : NHP-New Launch-Top exist"
          );
          const listingHotBottom = dataLayer.find(
            (x) =>
              x.event === "listingHot" && x.source === "NHP-New Launch-Bottom"
          );
          browser.assert.ok(
            listingHotBottom !== undefined,
            "Listing Hot : NHP-New Launch-Top exist"
          );
          //  const listingClick = dataLayer.find(
          //    (x) =>
          //      x.event === "listingCarousel" && x.source === "NHP-New Launch"
          //  );
          //  browser.assert.ok(
          //    listingClick !== undefined,
          //    "Listing Carousel exist"
          //  );
        }
      ).end;
  });
});
