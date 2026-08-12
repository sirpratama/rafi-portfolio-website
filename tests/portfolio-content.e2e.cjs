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

test("professional experience prioritizes AI and data work", async () => {
    const about = page.locator("#about");
    for (const organization of ["Bank Indonesia", "Infovesta Utama", "Google Developer Groups on Campus UI"]) {
        await assert.doesNotReject(() => about.getByText(organization, { exact: true }).first().waitFor());
    }
    await assert.doesNotReject(() => about.getByText(/75%/).first().waitFor());
    await assert.doesNotReject(() => about.getByText(/900 IDX-listed companies/).waitFor());
    await assert.doesNotReject(() => about.getByRole("heading", { name: "Earlier leadership" }).waitFor());
});

test("education presents the UQ and UI double-degree path with relevant coursework", async () => {
    await page.getByRole("button", { name: "education" }).click();
    const about = page.locator("#about");
    await assert.doesNotReject(() => about.getByText("The University of Queensland", { exact: true }).first().waitFor());
    await assert.doesNotReject(() => about.getByText("Universitas Indonesia", { exact: true }).first().waitFor());
    await assert.doesNotReject(() => about.getByText("Intro to AI and Data Science", { exact: true }).waitFor());
    await assert.doesNotReject(() => about.getByText(/Double Degree Program/).first().waitFor());
});
