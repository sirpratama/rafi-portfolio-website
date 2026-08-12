const { before, test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

let portfolio;

before(async () => {
    const moduleUrl = pathToFileURL(
        path.resolve(__dirname, "../src/data/portfolioData.js"),
    );
    portfolio = await import(moduleUrl.href);
});

test("the approved recruiter proof is complete and source-backed", () => {
    assert.equal(portfolio.heroContent.headline, "Building AI and data systems that turn complex information into useful decisions");
    assert.deepEqual(
        portfolio.proofMetrics.map(({ value }) => value),
        ["75% faster", "Up to 60%", "900+ companies", "2 honors"],
    );
});

test("professional experience and double-degree education are prioritized", () => {
    assert.deepEqual(
        portfolio.experienceData.map(({ organization }) => organization),
        ["Central Bank of Indonesia", "Infovesta Utama", "Google Developer Groups on Campus UI"],
    );
    assert.deepEqual(
        portfolio.educationData.map(({ organization }) => organization),
        ["The University of Queensland", "Universitas Indonesia"],
    );
    assert.ok(portfolio.coursework.includes("Intro to AI and Data Science"));
});

test("skills are grouped around AI, data, and product delivery", () => {
    assert.deepEqual(
        portfolio.skillGroups.map(({ title }) => title),
        ["AI & Machine Learning", "Data & Business Intelligence", "Product Engineering"],
    );
    assert.ok(portfolio.skillGroups[0].skills.includes("LangChain"));
    assert.ok(portfolio.skillGroups[1].skills.includes("Power BI"));
    assert.ok(portfolio.skillGroups[2].skills.includes("Docker Compose"));
});

test("exactly four flagship projects are selected without duplicating Career Path Compass Hub", () => {
    assert.deepEqual(
        portfolio.projects.map(({ title }) => title),
        [
            "AP-Analytics",
            "Financial News Analyzer",
            "ESGku",
            "Golden Age of Video Games Analysis",
        ],
    );
    assert.ok(portfolio.projects.every(({ githubUrl }) => githubUrl.startsWith("https://github.com/sirpratama/")));
    assert.ok(portfolio.projects.every(({ title }) => title !== "Career Path Compass Hub"));
});
