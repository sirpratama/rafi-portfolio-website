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

test("reduced motion removes Framer transforms and makes About navigation immediate", async () => {
    const reducedPage = await browser.newPage({ viewport: { width: 390, height: 844 } });

    try {
        await reducedPage.emulateMedia({ reducedMotion: "reduce" });
        await reducedPage.addInitScript(() => {
            window.__entryScrollBehaviors = [];

            Element.prototype.scrollIntoView = function scrollIntoView(options) {
                window.__entryScrollBehaviors.push(options?.behavior ?? "auto");
            };
        });
        await reducedPage.goto(baseUrl, { waitUntil: "commit" });
        const heroHeadline = reducedPage.locator(".cerebrium-hero-headline");
        await heroHeadline.waitFor({ state: "attached" });

        assert.equal(
            await heroHeadline.evaluate((element) => element.style.transform),
            "none",
        );
        await reducedPage.waitForLoadState("networkidle");

        const buttons = reducedPage.locator(".about-timeline-nav button");
        await buttons.nth(1).click();

        assert.deepEqual(
            await reducedPage.evaluate(() => window.__entryScrollBehaviors),
            ["auto"],
        );
        assert.equal(await buttons.nth(1).getAttribute("data-active"), "true");
        assert.deepEqual(
            await buttons.evaluateAll((items) => items.slice(0, 2).map((item) => ({
                opacity: item.style.opacity,
                transform: item.style.transform,
            }))),
            [
                { opacity: "0.32", transform: "translate(0px, 0px)" },
                { opacity: "1", transform: "translate(8px, 0px)" },
            ],
        );
    } finally {
        await reducedPage.close();
    }
});
