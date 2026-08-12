const { after, before, test } = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const baseUrl = process.env.E2E_BASE_URL || "http://127.0.0.1:4191";
let browser;
let page;

before(async () => {
    browser = await chromium.launch({ channel: "chrome", headless: true });
    page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
});

after(async () => {
    await browser?.close();
});

test("scrolling experience entries updates the pinned journey index", async () => {
    const aboutSection = page.locator("#about");
    await assert.doesNotReject(() => aboutSection.waitFor({ state: "visible" }));

    const timeline = page.locator(".about-scroll-layout");
    await timeline.waitFor({ state: "visible", timeout: 5000 });
    await assert.doesNotReject(() =>
        timeline.evaluate((element) => {
            if (element.dataset.gsapEnhanced !== "true") {
                throw new Error("Timeline is not marked as GSAP enhanced");
            }
        }),
    );

    const entries = page.locator(".about-timeline-entry");
    assert.equal(await entries.count(), 3);

    await entries.nth(1).scrollIntoViewIfNeeded();
    await entries.nth(1).evaluate((element) =>
        element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await page.waitForTimeout(500);

    const activeLabel = page.locator('.about-timeline-nav button[data-active="true"] strong');
    assert.equal((await activeLabel.textContent()).trim(), "Infovesta Utama");

    const railTop = await page.locator(".about-timeline-rail").evaluate(
        (element) => element.getBoundingClientRect().top,
    );
    assert.ok(railTop > 80 && railTop < 300, `Expected pinned rail, received top=${railTop}`);
});
