const { after, afterEach, before, test } = require("node:test");
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

afterEach(async () => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "no-preference" });

    const experienceTab = page.getByRole("button", { name: "experience", exact: true });
    if (await experienceTab.count() && await experienceTab.getAttribute("aria-pressed") !== "true") {
        await experienceTab.click();
    }
});

test("the hero positions Rafi for AI and data internships", async () => {
    const hero = page.locator("#hero");
    const headline = page.getByRole("heading", {
        level: 1,
        name: "Building AI and data systems that turn complex information into useful decisions",
    });
    await assert.doesNotReject(() => headline.waitFor({ state: "visible" }));
    await assert.doesNotReject(() => hero.getByText(/machine learning, RAG, analytics/i).waitFor());

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

    await assert.doesNotReject(() => proof.getByText(/Central Bank of Indonesia/i).waitFor());
    await assert.doesNotReject(() => proof.getByText(/Infovesta/i).waitFor());
});

test("professional experience prioritizes AI and data work", async () => {
    const about = page.locator("#about");
    for (const organization of ["Central Bank of Indonesia", "Infovesta Utama", "Google Developer Groups on Campus UI"]) {
        await assert.doesNotReject(() => about.getByText(organization, { exact: true }).first().waitFor());
    }
    await assert.doesNotReject(() => about.getByText(/75%/).first().waitFor());
    await assert.doesNotReject(() => about.getByText(/900 IDX-listed companies/).waitFor());
    await assert.doesNotReject(() => about.getByRole("heading", { name: "Earlier leadership" }).waitFor());

    assert.deepEqual(
        await about.locator(".about-timeline-card__location").allTextContents(),
        ["Jakarta, Indonesia", "Jakarta, Indonesia", "Depok, Indonesia"],
    );

    const cards = about.locator(".about-timeline-card");
    for (const [index, monogram] of [[0, "BI"], [1, "IU"]]) {
        assert.equal(await cards.nth(index).locator("img").count(), 0);
        assert.equal(
            (await cards.nth(index).locator(".about-timeline-card__monogram").textContent()).trim(),
            monogram,
        );
        assert.equal(
            await cards.nth(index).locator(".about-timeline-card__monogram").getAttribute("aria-hidden"),
            "true",
        );
    }

    const gdgCard = cards.nth(2);
    assert.equal(await gdgCard.locator(".about-timeline-card__monogram").count(), 0);
    assert.equal(await gdgCard.locator("img").getAttribute("src"), "/logos/gdgc_ui_logo.png");
    assert.equal(await gdgCard.locator("img").getAttribute("alt"), "Google Developer Groups on Campus UI logo");

    const relatedProjects = about.locator(".about-timeline-card__projects");
    assert.equal(await relatedProjects.locator("a").count(), 0);
    assert.deepEqual(
        await relatedProjects.locator(":scope > span").allTextContents(),
        [
            "Local-LLM RAG Pipeline",
            "Procurement Analytics Dashboard",
            "Listed-Company ESG Data Workflow",
            "Career Path Compass Hub",
        ],
    );
    assert.doesNotMatch(await relatedProjects.allTextContents().then((text) => text.join(" ")), /[\uFFFD\u00C2\u00E2]/u);
});

test("education replaces leadership with both schools and all relevant coursework", async () => {
    const about = page.locator("#about");
    await assert.doesNotReject(() => about.getByRole("heading", { name: "Earlier leadership" }).waitFor());
    await page.getByRole("button", { name: "education" }).click();
    await assert.doesNotReject(() => about.getByText("The University of Queensland", { exact: true }).first().waitFor());
    await assert.doesNotReject(() => about.getByText("Universitas Indonesia", { exact: true }).first().waitFor());
    await assert.doesNotReject(() => about.getByText(/Double Degree Program/).first().waitFor());

    assert.equal(await about.getByRole("heading", { name: "Earlier leadership" }).count(), 0);
    await assert.doesNotReject(() => about.getByRole("heading", { name: "Relevant coursework" }).waitFor());
    assert.deepEqual(
        await about.locator(".about-coursework li").allTextContents(),
        [
            "Intro to AI and Data Science",
            "Statistics and Probability",
            "Linear Algebra",
            "Data Structures and Algorithms",
            "Databases",
            "Software Engineering",
            "Operating Systems",
            "Advanced Programming",
            "Discrete Mathematics",
        ],
    );
    assert.deepEqual(
        await about.locator(".about-timeline-card__location").allTextContents(),
        ["Brisbane, Australia", "Jakarta, Indonesia"],
    );

    const educationCards = about.locator(".about-timeline-card");
    assert.equal(
        (await educationCards.nth(0).locator(".about-timeline-card__monogram").textContent()).trim(),
        "UQ",
    );
    assert.equal(await educationCards.nth(0).locator("img").count(), 0);
    assert.equal(await educationCards.nth(1).locator(".about-timeline-card__monogram").count(), 0);
    assert.equal(await educationCards.nth(1).locator("img").getAttribute("src"), "/logos/UI logo 2.png");
    assert.equal(await educationCards.nth(1).locator("img").getAttribute("alt"), "Universitas Indonesia logo");
});

test("contact links target the displayed email address and phone number", async () => {
    const contact = page.locator("#contact");
    assert.equal(
        await contact.getByRole("link", { name: "mnazirpratama@gmail.com", exact: true }).getAttribute("href"),
        "mailto:mnazirpratama@gmail.com",
    );
    assert.equal(
        await contact.getByRole("link", { name: "+62 812-8454-7459", exact: true }).getAttribute("href"),
        "tel:+6281284547459",
    );
});

test("skills are organized by recruiter-relevant capabilities", async () => {
    const skills = page.locator("#skills");
    for (const group of ["AI & Machine Learning", "Data & Business Intelligence", "Product Engineering"]) {
        await assert.doesNotReject(() => skills.getByRole("heading", { name: group }).waitFor());
    }
    for (const tool of ["LangChain", "Power BI", "Docker Compose"]) {
        await assert.doesNotReject(() => skills.getByText(tool, { exact: true }).waitFor());
    }
    assert.equal(await skills.locator(".skill-group-card").count(), 3);
});

test("skills bound decorative layers to the section", async () => {
    const layout = await page.locator("#skills").evaluate((section) => {
        const styles = getComputedStyle(section);
        return {
            position: styles.position,
            overflowX: styles.overflowX,
            overflowY: styles.overflowY,
        };
    });

    assert.deepEqual(layout, {
        position: "relative",
        overflowX: "hidden",
        overflowY: "hidden",
    });
});

test("skills preserve inline gutters at tablet and desktop widths", async () => {
    try {
        for (const width of [561, 900, 1152]) {
            await page.setViewportSize({ width, height: 1000 });
            const padding = await page.locator("#skills").evaluate((section) => {
                const styles = getComputedStyle(section);
                return {
                    start: Number.parseFloat(styles.paddingInlineStart),
                    end: Number.parseFloat(styles.paddingInlineEnd),
                };
            });

            assert.ok(padding.start >= 20, `expected a start gutter at ${width}px, received ${padding.start}px`);
            assert.ok(padding.end >= 20, `expected an end gutter at ${width}px, received ${padding.end}px`);
        }
    } finally {
        await page.setViewportSize({ width: 1440, height: 1000 });
    }
});

test("four flagship case studies explain problem, approach, result, and source", async () => {
    const section = page.locator("#projects");
    const cards = section.locator(".project-showcase-card");
    assert.equal(await cards.count(), 4);

    const expected = [
        ["AP-Analytics", "https://github.com/sirpratama/find-it-ml"],
        ["Financial News Analyzer", "https://github.com/sirpratama/News-Stock-Identifier"],
        ["ESGku", "https://github.com/sirpratama/esg_score"],
        ["Golden Age of Video Games Analysis", "https://github.com/sirpratama/golden_era_of_videogames"],
    ];

    for (const [index, [title, href]] of expected.entries()) {
        const card = cards.nth(index);
        await assert.doesNotReject(() => card.getByRole("heading", { name: title }).waitFor());
        for (const label of ["Problem", "Approach", "Result"]) {
            await assert.doesNotReject(() => card.getByText(label, { exact: true }).waitFor());
        }
        const source = card.getByRole("link", { name: new RegExp(`Explore ${title} source`, "i") });
        assert.equal(await source.getAttribute("href"), href);
        assert.equal(await source.getAttribute("target"), "_blank");
        assert.match(await source.getAttribute("rel"), /noreferrer/);
    }

    assert.equal(await cards.getByRole("heading", { name: "Career Path Compass Hub" }).count(), 0);
});

test("a failed placeholder cannot re-enter the project image fallback", async () => {
    const fallbackContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const fallbackPage = await fallbackContext.newPage();

    try {
        await fallbackPage.route("**/projects/project-placeholder.svg", (route) => route.abort("failed"));
        await fallbackPage.route("**/projects/project%202.png", (route) => route.abort("failed"));
        await fallbackPage.goto(baseUrl, { waitUntil: "networkidle" });
        await fallbackPage.locator("#projects").scrollIntoViewIfNeeded();

        const unavailableImages = fallbackPage.locator('.project-showcase-media img[data-image-state="unavailable"]');
        await assert.doesNotReject(() => unavailableImages.first().waitFor({ state: "attached", timeout: 5000 }));
        assert.equal(await unavailableImages.count(), 4);

        for (const image of await unavailableImages.all()) {
            assert.equal(await image.getAttribute("src"), null);
            assert.equal(await image.getAttribute("alt"), "");
            assert.equal(await image.getAttribute("aria-hidden"), "true");
        }
    } finally {
        await fallbackContext.close();
    }
});

test("the enriched portfolio remains semantic and horizontally contained", async () => {
    assert.equal(await page.locator("main").count(), 1);
    assert.equal(await page.locator("main > section").count(), 6);

    try {
        for (const viewport of [
            { width: 1440, height: 1000 },
            { width: 768, height: 1024 },
            { width: 390, height: 844 },
        ]) {
            await page.setViewportSize(viewport);
            await page.reload({ waitUntil: "networkidle" });
            const dimensions = await page.evaluate(() => {
                const selectors = [
                    "#hero .cerebrium-hero-content",
                    ".cerebrium-proof-grid",
                    "#about .about-scroll-layout",
                    "#about .about-timeline-entry",
                    "#skills .skill-group-card",
                    "#projects .project-showcase-card",
                    "#contact .cerebrium-contact-info",
                    "#contact .cerebrium-contact-form",
                ];
                const bounds = selectors.flatMap((selector) =>
                    [...document.querySelectorAll(selector)].map((element) => {
                        const rect = element.getBoundingClientRect();
                        return { selector, left: rect.left, right: rect.right, width: rect.width };
                    }),
                );

                return {
                    scrollWidth: document.documentElement.scrollWidth,
                    clientWidth: document.documentElement.clientWidth,
                    bounds,
                };
            });
            assert.ok(
                dimensions.scrollWidth <= dimensions.clientWidth,
                `Horizontal overflow at ${viewport.width}px: ${JSON.stringify(dimensions)}`,
            );
            for (const bounds of dimensions.bounds) {
                assert.ok(
                    bounds.left >= -0.5 && bounds.right <= viewport.width + 0.5 && bounds.width <= viewport.width + 1,
                    `Element escapes viewport at ${viewport.width}px: ${JSON.stringify(bounds)}`,
                );
            }
        }
    } finally {
        await page.setViewportSize({ width: 1440, height: 1000 });
    }
});
