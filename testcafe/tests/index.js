import { Selector, ClientFunction, RequestLogger } from "testcafe";

const url = "https://release.core.rumah123.com/perumahan-baru/";
const credentials = {
  username: "core",
  password: "core99iddev",
};

const logger = RequestLogger();

const getWindowDataLayer = ClientFunction(() => dataLayer);
const disableNavigation = ClientFunction(
  () => (window.disableNavigation = true)
);
const enableNavigationControl = ClientFunction((selector) => {
  const element = selector();

  element.addEventListener(
    "click",
    (event) => window.disableNavigation && event.preventDefault()
  );
});

fixture`New Launch Homepage`.page(url).httpAuth(credentials).requestHooks(logger);

test("Check gtm request is exist", async (t) => {
  const dataLayer = await getWindowDataLayer();
  await t.wait(2000);
  await t.expect(dataLayer.length).gt(0);
  await t
    .expect(logger.contains((record) => record.request.url.includes("gtm.js")))
    .eql(true);
});

test("Check pageview section datalayer is exist", async (t) => {
  const dataLayer = await getWindowDataLayer();
  const pageView = dataLayer.find((x) => x.event === "pageview");
  await t.expect(pageView).notEql(undefined);
});

test("Check NP-New Launch-Top section datalayer is exist", async (t) => {
  const dataLayer = await getWindowDataLayer();
  const listingHot = dataLayer.find(
    (x) => x.event === "listingHot" && x.source === "NHP-New Launch-Top"
  );
  await t.expect(listingHot).notEql(undefined);
});

test("Check NHP-New Launch-Bottom section datalayer is exist", async (t) => {
  const dataLayer = await getWindowDataLayer();
  const listingHot = dataLayer.find(
    (x) => x.event === "listingHot" && x.source === "NHP-New Launch-Bottom"
  );
  await t.expect(listingHot).notEql(undefined);
});

test("Check Listing Carousel action and data layer is exist", async (t) => {
  await t.wait(3000);
  await t
    .expect(Selector(".ui-molecules-card-carousel-r123__content").visible)
    .ok();
  await t.maximizeWindow();
  await t.click(
    Selector(".ui-molecules-card-carousel-r123__content")
      .child("div")
      .nth(1)
      .child("div")
      .nth(1)
  );
  const dataLayer = await getWindowDataLayer();
  const carouselAction = dataLayer.find(
    (x) => x.event === "listingCarousel" && x.source === "NHP-New Launch"
  );
  await t.expect(carouselAction).notEql(undefined);
});

test("Test Listing Click action and check if datalayer is exist", async (t) => {
  const clickedObject = Selector(".ui-organisms-card-r123-popular__logo").nth(
    0
  );

  if (clickedObject) {
    await t.wait(3000);
    await enableNavigationControl(clickedObject);
    await disableNavigation();
    await t.click(clickedObject);
    const dataLayer = await getWindowDataLayer();
    const carouselAction = dataLayer.find(
      (x) => x.event === "listingClick" && x.source === "NHP-New Launch-Bottom"
    );
    await t.expect(carouselAction).notEql(undefined);
  }
});
