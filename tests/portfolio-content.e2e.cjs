const { after, before, test } = require("node:test");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const baseUrl = process.env.E2E_BASE_URL || "http://127.0.0.1:4191";
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

test("the hero positions Rafi for AI and data internships", async () => {
    const headline = page.getByRole("heading", {
        level: 1,
        name: "Building AI and data systems that turn complex information into useful decisions",
    });
    await assert.doesNotReject(() => headline.waitFor({ state: "visible" }));
    await assert.doesNotReject(() => page.getByText(/machine learning, RAG, analytics/i).waitFor());

    const cvLink = page.getByRole("link", { name: /Download CV/i });
    assert.equal(await cvLink.getAttribute("href"), "/CV ATS Muhammad Rafi Nazir Pratama.pdf");
    assert.notEqual(await cvLink.getAttribute("download"), null);
});

test("the proof strip exposes four quantified outcomes with context", async () => {
    const proof = page.locator(".cerebrium-proof");
    await assert.doesNotReject(() => proof.waitFor({ state: "visible" }));
    assert.equal(await proof.locator(".cerebrium-proof-item").count(), 4);

    for (const value of ["75% faster", "Up to 60%", "900+ companies", "2 honors"]) {
        await assert.doesNotReject(() => proof.getByText(value, { exact: true }).waitFor());
    }

    await assert.doesNotReject(() => proof.getByText(/Bank Indonesia/i).waitFor());
    await assert.doesNotReject(() => proof.getByText(/Infovesta/i).waitFor());
});
