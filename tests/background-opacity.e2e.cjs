const { after, before, test } = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const baseUrl = process.env.E2E_BASE_URL || "http://127.0.0.1:4191";
const transparentSurfaceSelectors = [
    ".cerebrium-hero",
    "#skills",
    "#contact",
    ".cerebrium-footer",
];

let browser;
let page;

before(async () => {
    browser = await chromium.launch({ channel: "chrome", headless: true });
    page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
});

after(async () => {
    await browser?.close();
});

test("transparent site surfaces share one overlay without stacked full-surface gradients", async () => {
    const surfaces = await page.evaluate((selectors) =>
        selectors.map((selector) => {
            const style = getComputedStyle(document.querySelector(selector));

            return {
                selector,
                backgroundColor: style.backgroundColor,
                backgroundImage: style.backgroundImage,
            };
        }), transparentSurfaceSelectors);

    const colors = new Set(surfaces.map(({ backgroundColor }) => backgroundColor));
    assert.equal(
        colors.size,
        1,
        `Expected one shared surface opacity, received ${JSON.stringify(surfaces)}`,
    );

    for (const surface of surfaces) {
        assert.doesNotMatch(
            surface.backgroundImage,
            /linear-gradient\(rgba\(3, 17, 48,/,
            `${surface.selector} stacks an extra full-surface opacity layer`,
        );
    }
});

test("the app root owns the translucent overlay across every page and section margin", async () => {
    const backgrounds = await page.evaluate((selectors) => {
        const root = getComputedStyle(document.querySelector("#root"));
        const surfaces = [".cerebrium-page-shell", ...selectors].map((selector) => ({
            selector,
            backgroundColor: getComputedStyle(document.querySelector(selector)).backgroundColor,
        }));

        return {
            root: root.backgroundColor,
            surfaces,
        };
    }, transparentSurfaceSelectors);

    const rootAlpha = Number(backgrounds.root.match(/[\d.]+\)$/)?.[0].slice(0, -1));
    assert.ok(
        rootAlpha > 0 && rootAlpha < 1,
        `Expected the app root to provide one translucent overlay, received ${backgrounds.root}`,
    );

    for (const surface of backgrounds.surfaces) {
        assert.equal(
            surface.backgroundColor,
            "rgba(0, 0, 0, 0)",
            `${surface.selector} adds opacity on top of the shared page overlay`,
        );
    }
});
