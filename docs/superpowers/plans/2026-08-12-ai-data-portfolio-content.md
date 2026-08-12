# AI and Data Portfolio Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the existing portfolio for AI and data internship recruiters with source-backed experience, quantified proof, grouped capabilities, and four evidence-rich project case studies.

**Architecture:** Centralize approved copy and metadata in a static `portfolioData.js` module, then let the existing React sections render that content without runtime GitHub requests. Add one focused proof-strip component, preserve the GSAP timeline and existing design system, and protect each content slice with Node and Playwright regression tests.

**Tech Stack:** React 19, Vite 6, JavaScript modules, Tailwind CSS 4, custom CSS, Framer Motion, GSAP ScrollTrigger, Lucide React, Node test runner, Playwright.

## Global Constraints

- Preserve the existing cobalt/Jakarta design, navigation, responsive behavior, contact form, and shared background-opacity fix.
- Do not modify or replace `public/CV ATS Muhammad Rafi Nazir Pratama.pdf`.
- Do not add routes, runtime GitHub API calls, external content dependencies, or new npm packages.
- Keep every biographical claim traceable to the approved design source: CV, existing portfolio, or verified repository README.
- Show exactly four flagship project cards: AP-Analytics, Financial News Analyzer, ESGku, and Golden Age of Video Games Analysis.
- Keep Career Path Compass Hub in the GDG experience entry, not in the project grid.
- Use stable string IDs for rendered lists and descriptive accessible labels for links and informative images.
- Preserve the existing uncommitted work in `src/index.css` and `tests/background-opacity.e2e.cjs`; never run reset or checkout commands against it.
- Stage exact paths only. Never stage the modified CV with a broad `git add .` command.

## File Map

- Create `src/data/portfolioData.js`: single source of truth for hero, proof, experience, education, coursework, skills, leadership, and projects.
- Create `src/components/ProofStrip.jsx`: renders four quantified outcomes.
- Modify `src/components/HeroSection.jsx`: approved AI/data positioning.
- Modify `src/pages/Home.jsx`: places the proof strip between Hero and About.
- Modify `src/components/AboutSection.jsx`: professional timeline, double-degree education, coursework, monogram fallback, earlier leadership.
- Modify `src/components/SkillsSection.jsx`: three recruiter-oriented capability groups.
- Modify `src/components/ProjectsSection.jsx`: four problem/approach/result case studies and image fallback.
- Modify `src/index.css`: proof, About support blocks, skill groups, richer project cards, and responsive rules while preserving the shared background overlay.
- Modify `tests/about-scroll.e2e.cjs`: update the timeline regression to the new three-entry professional timeline.
- Create `tests/portfolio-data.test.cjs`: verifies the static content contract independently from the UI.
- Create `tests/portfolio-content.e2e.cjs`: verifies recruiter-facing content, links, accessibility hooks, and responsive overflow.
- Preserve `tests/background-opacity.e2e.cjs`: must remain green after all CSS work.

## Working-Tree Preflight

- [ ] **Step 1: Confirm only the known files are dirty before execution**

Run:

```powershell
git status --short
git diff -- src/index.css
Get-Content -Raw -LiteralPath tests\background-opacity.e2e.cjs
```

Expected: the CV is modified, `src/index.css` contains the approved shared-overlay fix, and `tests/background-opacity.e2e.cjs` is present but untracked. Do not edit or stage the CV.

- [ ] **Step 2: Checkpoint the previously verified opacity work before editing shared CSS**

With the Vite server running on `http://127.0.0.1:4191`, run:

```powershell
node --test tests/background-opacity.e2e.cjs
npm.cmd run lint
npm.cmd run build
git add -- src/index.css tests/background-opacity.e2e.cjs
git commit -m "fix: standardize background transparency"
```

Expected: two opacity tests pass, lint exits 0, the production build exits 0, and the CV remains unstaged.

---

### Task 1: Centralize the Approved Portfolio Content

**Files:**
- Create: `src/data/portfolioData.js`
- Create: `tests/portfolio-data.test.cjs`

**Interfaces:**
- Produces: named exports `heroContent`, `proofMetrics`, `experienceData`, `educationData`, `coursework`, `earlierLeadership`, `skillGroups`, and `projects`.
- Consumes: no runtime services; values are copied from the approved design specification.

- [ ] **Step 1: Write the failing data-contract test**

Create `tests/portfolio-data.test.cjs`:

```js
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
        ["Bank Indonesia", "Infovesta Utama", "Google Developer Groups on Campus UI"],
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
```

- [ ] **Step 2: Run the test and verify the missing module fails**

Run:

```powershell
node --test tests/portfolio-data.test.cjs
```

Expected: FAIL because `src/data/portfolioData.js` does not exist.

- [ ] **Step 3: Create the static content module**

Create `src/data/portfolioData.js` with these exact exports and field names:

```js
export const heroContent = {
    headline: "Building AI and data systems that turn complex information into useful decisions",
    supportingCopy: "Computer Science student focused on machine learning, RAG, analytics, and the full-stack systems that bring them into real workflows.",
};

export const proofMetrics = [
    {
        id: "memo-routing",
        value: "75% faster",
        label: "Memo-routing decisions",
        context: "Local-LLM RAG pipeline at Bank Indonesia",
    },
    {
        id: "tor-tracking",
        value: "Up to 60%",
        label: "More efficient ToR tracking",
        context: "Centralized procurement dashboard in Power BI",
    },
    {
        id: "idx-coverage",
        value: "900+ companies",
        label: "Covered by a redesigned workflow",
        context: "IDX-listed company analysis at Infovesta",
    },
    {
        id: "hackathon-honors",
        value: "2 honors",
        label: "Recognized technical projects",
        context: "Find-IT UGM placement + Best Tech Implementation",
    },
];

export const experienceData = [
    {
        id: "bank-indonesia",
        organization: "Bank Indonesia",
        role: "Data Intern, Department of Innovation & Digitalization",
        period: "Jun 2026 - Present",
        location: "Jakarta, Indonesia",
        monogram: "BI",
        achievements: [
            "Built a **RAG pipeline** with LangChain, LangSmith, and local LLMs through Ollama, reducing memo-routing decision time by **75%**.",
            "Built an interactive **Power BI** dashboard that centralized procurement timelines and improved Terms of Reference tracking efficiency by **up to 60%**.",
            "Transformed Excel procurement data with Power Query and DAX, reducing manual reporting effort by an estimated **50%**.",
        ],
        projects: ["Local-LLM RAG Pipeline", "Procurement Analytics Dashboard"],
    },
    {
        id: "infovesta-utama",
        organization: "Infovesta Utama",
        role: "Research and Consulting Intern",
        period: "Jul 2025 - Aug 2025",
        location: "Jakarta, Indonesia",
        monogram: "IU",
        achievements: [
            "Designed a workflow that reduced manual data processing time by **60%** for analysis covering more than **900 IDX-listed companies**.",
            "Used **Gemini 2.5 Pro** to extract carbon-emission, employee-demographic, and governance metrics from source documents.",
        ],
        projects: ["Listed-Company ESG Data Workflow"],
    },
    {
        id: "gdg-on-campus-ui",
        organization: "Google Developer Groups on Campus UI",
        role: "Member & Project Lead",
        period: "Dec 2024 - Present",
        location: "Depok, Indonesia",
        logo: "/logos/gdgc_ui_logo.png",
        achievements: [
            "Led a **three-person team** that won **Best Tech Implementation** for Career Path Compass Hub.",
            "Designed and delivered a PERN-stack career guidance application and its **REST APIs**.",
        ],
        projects: ["Career Path Compass Hub"],
    },
];

export const educationData = [
    {
        id: "university-of-queensland",
        organization: "The University of Queensland",
        role: "Bachelor of Computer Science, Major in Artificial Intelligence",
        period: "Expected May 2028",
        location: "Brisbane, Australia",
        monogram: "UQ",
        achievements: ["Computer Science **Double Degree Program** with Universitas Indonesia."],
        projects: [],
    },
    {
        id: "universitas-indonesia",
        organization: "Universitas Indonesia",
        role: "S.Kom. in Computer Science",
        period: "Expected May 2028",
        location: "Jakarta, Indonesia",
        logo: "/logos/UI logo 2.png",
        achievements: ["Computer Science **Double Degree Program** with The University of Queensland."],
        projects: [],
    },
];

export const coursework = [
    "Intro to AI and Data Science",
    "Statistics and Probability",
    "Linear Algebra",
    "Data Structures and Algorithms",
    "Databases",
    "Software Engineering",
    "Operating Systems",
    "Advanced Programming",
    "Discrete Mathematics",
];

export const earlierLeadership = [
    {
        id: "world-scout-jamboree",
        title: "International representation",
        summary: "Represented Indonesia at the 2023 World Scout Jamboree in Korea, strengthening leadership and adaptability in an international setting.",
    },
    {
        id: "openhouse-fasilkom",
        title: "Vendor and fundraising coordination",
        summary: "Supported OpenHouse Fasilkom fundraising through merchandise sales, vendor research, and cost-conscious coordination.",
    },
    {
        id: "skyavenue",
        title: "Commercial teamwork",
        summary: "Contributed to a 30-person funding committee whose merchandise and food operations generated IDR 130 million in net profit.",
    },
];

export const skillGroups = [
    {
        id: "ai-ml",
        icon: "ai",
        title: "AI & Machine Learning",
        description: "Models, retrieval workflows, and local or hosted LLM systems.",
        skills: ["Python", "XGBoost", "Gemini API", "LangChain", "LangSmith", "Ollama", "Hugging Face", "Unsloth"],
    },
    {
        id: "data-bi",
        icon: "data",
        title: "Data & Business Intelligence",
        description: "Reliable analysis pipelines, reporting, and decision-support systems.",
        skills: ["SQL", "PostgreSQL", "Power BI", "DAX", "Power Query", "Data Transformation", "Data Visualization"],
    },
    {
        id: "product-engineering",
        icon: "engineering",
        title: "Product Engineering",
        description: "Full-stack delivery for putting AI and data work into usable products.",
        skills: ["React", "TypeScript", "Node.js", "Express", "Supabase", "Docker", "Docker Compose", "Git & GitHub", "REST APIs"],
    },
];

export const projects = [
    {
        id: "ap-analytics",
        title: "AP-Analytics",
        recognition: "3rd Place - Find-IT UGM Hackathon 2026",
        problem: "Help MSMEs evaluate potential business locations using evidence instead of intuition alone.",
        approach: "Built an XGBoost-based Business Viability Index using competitor density, geospatial zoning, and socioeconomic indicators.",
        result: "Delivered a containerized full-stack application with PostgreSQL, Node.js services, React, health checks, and Fly.io deployment.",
        image: "/projects/project-placeholder.svg",
        imageAlt: "",
        tags: ["XGBoost", "Python", "React", "PostgreSQL", "Docker"],
        githubUrl: "https://github.com/sirpratama/find-it-ml",
    },
    {
        id: "financial-news-analyzer",
        title: "Financial News Analyzer",
        recognition: "AI-assisted market intelligence",
        problem: "Convert unstructured Indonesian and English financial news into decision-support signals.",
        approach: "Extracted article content, identified affected public companies, and used Gemini for sentiment and market-impact analysis.",
        result: "Produced structured company, ticker, sentiment, impact, reasoning, and recommendation fields for downstream use.",
        image: "/projects/project-placeholder.svg",
        imageAlt: "",
        tags: ["JavaScript", "Gemini API", "Content Extraction", "Structured JSON"],
        githubUrl: "https://github.com/sirpratama/News-Stock-Identifier",
    },
    {
        id: "esgku",
        title: "ESGku",
        recognition: "AI document intelligence for Indonesian MSMEs",
        problem: "Make environmental, social, and governance assessment more accessible to small businesses.",
        approach: "Parsed business documents with Gemini, calculated ESG category scores, and stored authenticated submission history in Supabase.",
        result: "Created an interactive dashboard with document analysis, progress tracking, and actionable sustainability recommendations.",
        image: "/projects/project-placeholder.svg",
        imageAlt: "",
        tags: ["React", "Gemini API", "Supabase", "PDF Processing"],
        githubUrl: "https://github.com/sirpratama/esg_score",
    },
    {
        id: "golden-age-video-games",
        title: "Golden Age of Video Games Analysis",
        recognition: "SQL and exploratory data analysis",
        problem: "Test whether critic ratings, user ratings, and sales data support the idea of a video-game golden age.",
        approach: "Queried the dataset with PostgreSQL and visualized the findings with Python, pandas, Matplotlib, and Seaborn.",
        result: "Identified 1997-2010 as the relevant period in the analyzed data, with 1998 producing the highest critic average.",
        image: "/projects/project 2.png",
        imageAlt: "Charts comparing video-game sales, critic ratings, user ratings, and golden years",
        tags: ["SQL", "Python", "pandas", "Data Visualization"],
        githubUrl: "https://github.com/sirpratama/golden_era_of_videogames",
    },
];
```

- [ ] **Step 4: Run the data-contract test and verify it passes**

Run:

```powershell
node --test tests/portfolio-data.test.cjs
```

Expected: four tests pass.

- [ ] **Step 5: Commit the content boundary**

```powershell
git add -- src/data/portfolioData.js tests/portfolio-data.test.cjs
git commit -m "feat: centralize AI data portfolio content"
```

---

### Task 2: Add AI/Data Hero Positioning and Quantified Proof

**Files:**
- Create: `src/components/ProofStrip.jsx`
- Create: `tests/portfolio-content.e2e.cjs`
- Modify: `src/components/HeroSection.jsx:1-47`
- Modify: `src/pages/Home.jsx:1-28`
- Modify: `src/index.css:1077-1219`, `src/index.css:1682-1777`, and the final Jakarta revision block

**Interfaces:**
- Consumes: `heroContent` and `proofMetrics` from `@/data/portfolioData`.
- Produces: `.cerebrium-proof`, `.cerebrium-proof-grid`, and `.cerebrium-proof-item` UI hooks used by Playwright and responsive CSS.

- [ ] **Step 1: Write the failing hero and proof integration tests**

Create `tests/portfolio-content.e2e.cjs`:

```js
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
```

- [ ] **Step 2: Run the integration tests and verify the old hero fails**

Run with the Vite server on port 4191:

```powershell
node --test tests/portfolio-content.e2e.cjs
```

Expected: both tests FAIL because the approved headline and proof strip do not exist.

- [ ] **Step 3: Implement the proof component**

Create `src/components/ProofStrip.jsx`:

```jsx
import { motion } from "framer-motion"; // eslint-disable-line
import { proofMetrics } from "@/data/portfolioData";

export const ProofStrip = () => (
    <section className="cerebrium-proof" aria-label="Selected impact">
        <div className="cerebrium-proof-grid">
            {proofMetrics.map((metric, index) => (
                <motion.article
                    key={metric.id}
                    className="cerebrium-proof-item"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                    <p>{metric.context}</p>
                </motion.article>
            ))}
        </div>
    </section>
);
```

- [ ] **Step 4: Connect the approved hero copy and proof strip**

In `HeroSection.jsx`, import `heroContent` and render `heroContent.headline` as plain text inside the existing animated `h1`. Render `heroContent.supportingCopy` inside the existing aside paragraph. Keep both existing actions and icons unchanged.

In `Home.jsx`, import `ProofStrip` and insert `<ProofStrip />` immediately after `<HeroSection />`.

The resulting `main` order must be:

```jsx
<main>
    <HeroSection />
    <ProofStrip />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
</main>
```

- [ ] **Step 5: Add proof-strip styling without creating a new full-surface overlay**

Append this focused block before the final mobile media rules in `src/index.css`:

```css
.cerebrium-proof {
  position: relative;
  z-index: 3;
  padding: 0 clamp(1rem, 3vw, 2.5rem);
}

.cerebrium-proof-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  max-width: 90rem;
  margin: -1.75rem auto 0;
  overflow: hidden;
  border: 1px solid rgba(47, 107, 255, 0.2);
  border-radius: 15px;
  background: rgba(6, 24, 61, 0.82);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(18px);
}

.cerebrium-proof-item {
  min-width: 0;
  padding: 1.5rem;
}

.cerebrium-proof-item + .cerebrium-proof-item {
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.cerebrium-proof-item strong,
.cerebrium-proof-item span {
  display: block;
}

.cerebrium-proof-item strong {
  color: white;
  font-size: clamp(1.6rem, 2.6vw, 2.35rem);
  font-weight: 400;
  letter-spacing: -0.035em;
}

.cerebrium-proof-item span {
  margin-top: 0.35rem;
  color: var(--cerebrium-blue);
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.68rem;
  text-transform: uppercase;
}

.cerebrium-proof-item p {
  margin: 0.75rem 0 0;
  color: var(--cerebrium-slate-deep);
  font-size: 0.88rem;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .cerebrium-proof-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cerebrium-proof-item:nth-child(3) {
    border-left: 0;
  }

  .cerebrium-proof-item:nth-child(n + 3) {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

@media (max-width: 560px) {
  .cerebrium-proof {
    padding-inline: 1rem;
  }

  .cerebrium-proof-grid {
    grid-template-columns: 1fr;
    margin-top: -1rem;
  }

  .cerebrium-proof-item + .cerebrium-proof-item {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 0;
  }
}
```

- [ ] **Step 6: Run hero, proof, opacity, lint, and build verification**

```powershell
node --test tests/portfolio-content.e2e.cjs tests/background-opacity.e2e.cjs
npm.cmd run lint
npm.cmd run build
```

Expected: all tests pass, lint exits 0, and the build exits 0.

- [ ] **Step 7: Commit the hero and proof deliverable**

```powershell
git add -- src/components/HeroSection.jsx src/components/ProofStrip.jsx src/pages/Home.jsx src/index.css tests/portfolio-content.e2e.cjs
git commit -m "feat: lead portfolio with AI data impact"
```

---

### Task 3: Replace the Timeline with Professional Experience and Double-Degree Education

**Files:**
- Modify: `src/components/AboutSection.jsx:1-372`
- Modify: `src/index.css:1260-1362`
- Modify: `tests/about-scroll.e2e.cjs:1-50`
- Modify: `tests/portfolio-content.e2e.cjs`

**Interfaces:**
- Consumes: `experienceData`, `educationData`, `coursework`, and `earlierLeadership` from `@/data/portfolioData`.
- Produces: `.about-supporting-block`, `.about-coursework`, and `.about-timeline-card__monogram` hooks.

- [ ] **Step 1: Update and extend the failing About tests**

In `tests/about-scroll.e2e.cjs`, change the timeline assertions to:

```js
const entries = page.locator(".about-timeline-entry");
assert.equal(await entries.count(), 3);

await entries.nth(1).scrollIntoViewIfNeeded();
await entries.nth(1).evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" }),
);
await page.waitForTimeout(500);

const activeLabel = page.locator('.about-timeline-nav button[data-active="true"] strong');
assert.equal((await activeLabel.textContent()).trim(), "Infovesta Utama");
```

Append these tests to `tests/portfolio-content.e2e.cjs`:

```js
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
```

- [ ] **Step 2: Run the About tests and verify they fail against the old timeline**

```powershell
node --test tests/about-scroll.e2e.cjs tests/portfolio-content.e2e.cjs
```

Expected: FAIL because the timeline still contains four older entries and no UQ education entry.

- [ ] **Step 3: Replace inline data with the approved data module**

At the top of `AboutSection.jsx`, add:

```jsx
import {
    coursework,
    earlierLeadership,
    educationData,
    experienceData,
} from "@/data/portfolioData";
```

Delete the old inline `educationData` and `experienceData` arrays. Update references from `item.company || item.institution` to `item.organization`, and from `item.title` to `item.role`.

In the related-project rendering, replace the corrupted leading globe character with the plain project name:

```jsx
{item.projects.map((project) => (
    <span key={project}>{project}</span>
))}
```

- [ ] **Step 4: Add logo and monogram rendering with location metadata**

Replace the timeline-card logo block with:

```jsx
<div className="about-timeline-card__logo">
    {item.logo ? (
        <img
            src={item.logo}
            alt={`${item.organization} logo`}
            className="w-full h-full object-cover rounded-full"
        />
    ) : (
        <span className="about-timeline-card__monogram" aria-hidden="true">
            {item.monogram}
        </span>
    )}
</div>
```

Replace the heading metadata with:

```jsx
<div className="min-w-0 flex-1">
    <span className="about-timeline-card__period">{item.period}</span>
    <h3>{item.organization}</h3>
    <p className="about-timeline-card__role">{item.role}</p>
    <p className="about-timeline-card__location">{item.location}</p>
</div>
```

- [ ] **Step 5: Render supporting leadership and coursework after the timeline**

Immediately after `.about-scroll-layout`, add:

```jsx
{activeTab === "experience" ? (
    <section className="about-supporting-block" aria-labelledby="earlier-leadership-title">
        <p className="cerebrium-kicker">Supporting experience</p>
        <h3 id="earlier-leadership-title">Earlier leadership</h3>
        <div className="about-supporting-grid">
            {earlierLeadership.map((item) => (
                <article key={item.id}>
                    <h4>{item.title}</h4>
                    <p>{item.summary}</p>
                </article>
            ))}
        </div>
    </section>
) : (
    <section className="about-coursework" aria-labelledby="coursework-title">
        <p className="cerebrium-kicker">Academic foundation</p>
        <h3 id="coursework-title">Relevant coursework</h3>
        <ul>
            {coursework.map((course) => <li key={course}>{course}</li>)}
        </ul>
    </section>
)}
```

- [ ] **Step 6: Add focused About support styling**

Add these selectors near the existing About styles in `src/index.css`:

```css
#about .about-timeline-card__location {
  margin-top: 0.25rem;
  color: var(--cerebrium-navy-soft);
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.67rem;
  text-transform: uppercase;
}

#about .about-timeline-card__monogram {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: var(--cerebrium-blue-dark);
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.85rem;
  font-weight: 600;
}

.about-supporting-block,
.about-coursework {
  max-width: 68rem;
  margin: 5rem auto 0;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  border-radius: 15px;
  background: var(--cerebrium-ice);
}

.about-supporting-block > h3,
.about-coursework > h3 {
  margin: 0.75rem 0 1.5rem;
  color: var(--cerebrium-navy);
  font-size: clamp(1.8rem, 4vw, 2.7rem);
  font-weight: 400;
}

.about-supporting-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.about-supporting-grid article {
  padding-top: 1rem;
  border-top: 2px solid var(--cerebrium-blue);
}

.about-supporting-grid h4 {
  margin: 0;
  color: var(--cerebrium-navy);
  font-weight: 500;
}

.about-supporting-grid p {
  margin: 0.75rem 0 0;
  color: var(--cerebrium-navy-soft);
  line-height: 1.55;
}

.about-coursework ul {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.about-coursework li {
  padding: 0.85rem 1rem;
  border-radius: 7px;
  color: var(--cerebrium-navy);
  background: white;
}

@media (max-width: 760px) {
  .about-supporting-grid,
  .about-coursework ul {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 7: Run About, content, opacity, lint, and build verification**

```powershell
node --test tests/about-scroll.e2e.cjs tests/portfolio-content.e2e.cjs tests/background-opacity.e2e.cjs tests/portfolio-data.test.cjs
npm.cmd run lint
npm.cmd run build
```

Expected: all tests pass, lint exits 0, and build exits 0.

- [ ] **Step 8: Commit the About deliverable**

```powershell
git add -- src/components/AboutSection.jsx src/index.css tests/about-scroll.e2e.cjs tests/portfolio-content.e2e.cjs
git commit -m "feat: prioritize AI data experience and education"
```

---

### Task 4: Reframe Skills as Recruiter-Oriented Capability Groups

**Files:**
- Modify: `src/components/SkillsSection.jsx:1-180`
- Modify: `src/index.css:1368-1405`
- Modify: `tests/portfolio-content.e2e.cjs`

**Interfaces:**
- Consumes: `skillGroups` from `@/data/portfolioData`.
- Produces: `.skill-group-grid`, `.skill-group-card`, and `.skill-group-list` hooks.

- [ ] **Step 1: Add the failing skills integration test**

Append to `tests/portfolio-content.e2e.cjs`:

```js
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
```

- [ ] **Step 2: Run the test and verify the old flat grid fails**

```powershell
node --test --test-name-pattern="skills are organized" tests/portfolio-content.e2e.cjs
```

Expected: FAIL because the group headings and grouped card hooks do not exist.

- [ ] **Step 3: Replace `SkillsSection.jsx` with grouped capability rendering**

Use this component structure:

```jsx
import { BrainCircuit, Braces, Database } from "lucide-react";
import { motion } from "framer-motion"; // eslint-disable-line
import { skillGroups } from "@/data/portfolioData";

const groupIcons = {
    ai: BrainCircuit,
    data: Database,
    engineering: Braces,
};

export const SkillsSection = () => (
    <section id="skills" className="cerebrium-dark-section cerebrium-skills">
        <div className="mx-auto max-w-6xl relative z-10">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <p className="cerebrium-kicker cerebrium-section-kicker">Applied toolkit</p>
                <h2 className="cerebrium-section-title cerebrium-section-title--light">Capabilities</h2>
                <p className="cerebrium-section-copy cerebrium-section-copy--light">
                    Tools I use to move from raw information to working AI and data products.
                </p>
            </motion.div>

            <div className="skill-group-grid">
                {skillGroups.map((group, index) => {
                    const Icon = groupIcons[group.icon];
                    return (
                        <motion.article
                            key={group.id}
                            className="skill-group-card"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Icon size={28} aria-hidden="true" />
                            <h3>{group.title}</h3>
                            <p>{group.description}</p>
                            <ul className="skill-group-list">
                                {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                            </ul>
                        </motion.article>
                    );
                })}
            </div>
        </div>
    </section>
);
```

- [ ] **Step 4: Replace technology-card styling with group-card styling**

Keep the existing `.cerebrium-skills` section background rules, then add:

```css
.skill-group-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.skill-group-card {
  min-width: 0;
  padding: clamp(1.5rem, 3vw, 2rem);
  border-radius: 15px;
  color: var(--cerebrium-navy);
  background: var(--cerebrium-ice);
}

.skill-group-card > svg {
  color: var(--cerebrium-blue);
}

.skill-group-card h3 {
  margin: 1.25rem 0 0;
  color: var(--cerebrium-navy);
  font-size: 1.45rem;
  font-weight: 500;
}

.skill-group-card > p {
  min-height: 4.5rem;
  margin: 0.75rem 0 1.5rem;
  color: var(--cerebrium-navy-soft);
  line-height: 1.5;
}

.skill-group-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-group-list li {
  padding: 0.45rem 0.65rem;
  border: 1px solid var(--cerebrium-slate-deep);
  border-radius: 999px;
  color: var(--cerebrium-navy);
  background: white;
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.65rem;
}

@media (max-width: 900px) {
  .skill-group-grid {
    grid-template-columns: 1fr;
  }

  .skill-group-card > p {
    min-height: 0;
  }
}
```

- [ ] **Step 5: Run skills, content, lint, and build verification**

```powershell
node --test tests/portfolio-data.test.cjs tests/portfolio-content.e2e.cjs
npm.cmd run lint
npm.cmd run build
```

Expected: all tests pass, lint exits 0, and build exits 0.

- [ ] **Step 6: Commit the skills deliverable**

```powershell
git add -- src/components/SkillsSection.jsx src/index.css tests/portfolio-content.e2e.cjs
git commit -m "feat: group AI data and engineering capabilities"
```

---

### Task 5: Turn Projects into Four Evidence-Rich Case Studies

**Files:**
- Modify: `src/components/ProjectsSection.jsx:1-112`
- Modify: `src/index.css:612-820` and `src/index.css:1408-1464`
- Modify: `tests/portfolio-content.e2e.cjs`

**Interfaces:**
- Consumes: `projects` from `@/data/portfolioData`.
- Produces: four `.project-showcase-card` articles with `.project-showcase-detail` rows and safe GitHub links.

- [ ] **Step 1: Add the failing project-content and link-safety test**

Append to `tests/portfolio-content.e2e.cjs`:

```js
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
```

- [ ] **Step 2: Run the project test and verify the two-card grid fails**

```powershell
node --test --test-name-pattern="four flagship case studies" tests/portfolio-content.e2e.cjs
```

Expected: FAIL because only two old cards render and the case-study rows do not exist.

- [ ] **Step 3: Replace inline projects and render the case-study fields**

At the top of `ProjectsSection.jsx`, import `projects` from `@/data/portfolioData` and delete the old inline array.

Update the Lucide import so removed card actions do not leave an unused `Github` symbol:

```jsx
import { ArrowRight, ExternalLink } from "lucide-react";
```

Add this helper above `ProjectsSection`:

```jsx
const PROJECT_FALLBACK = "/projects/project-placeholder.svg";

const ProjectImage = ({ project }) => (
    <img
        src={project.image}
        alt={project.imageAlt}
        width="960"
        height="540"
        loading="lazy"
        decoding="async"
        onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = PROJECT_FALLBACK;
            currentTarget.alt = "";
        }}
    />
);
```

Inside each `.project-showcase-card`, render fields in this order:

```jsx
<div className="project-showcase-tags" aria-label={`${project.title} technologies`}>
    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
</div>

<div className="project-showcase-media">
    <ProjectImage project={project} />
</div>

<div className="project-showcase-body">
    <p className="project-showcase-recognition">{project.recognition}</p>
    <h3>{project.title}</h3>
    <dl className="project-showcase-details">
        <div className="project-showcase-detail">
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
        </div>
        <div className="project-showcase-detail">
            <dt>Approach</dt>
            <dd>{project.approach}</dd>
        </div>
        <div className="project-showcase-detail">
            <dt>Result</dt>
            <dd>{project.result}</dd>
        </div>
    </dl>
    <div className="project-showcase-actions">
        <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="project-showcase-primary-link"
            aria-label={`Explore ${project.title} source on GitHub`}
        >
            Explore source
            <ExternalLink size={17} aria-hidden="true" />
        </a>
    </div>
</div>
```

Keep the existing global GitHub-profile action after the grid.

- [ ] **Step 4: Style the project case-study hierarchy**

Add or replace the project body rules with:

```css
.project-showcase-recognition {
  margin: 0 0 0.7rem;
  color: var(--cerebrium-blue-dark) !important;
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.67rem;
  font-weight: 500;
  letter-spacing: 0.035em;
  text-transform: uppercase;
}

.project-showcase-details {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0 0;
}

.project-showcase-detail {
  display: grid;
  grid-template-columns: 5rem minmax(0, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(88, 100, 144, 0.25);
}

.project-showcase-detail dt {
  color: var(--cerebrium-blue-dark);
  font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 0.67rem;
  font-weight: 500;
  text-transform: uppercase;
}

.project-showcase-detail dd {
  margin: 0;
  color: var(--cerebrium-navy-soft);
  line-height: 1.55;
}

@media (max-width: 560px) {
  .project-showcase-detail {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }
}
```

Ensure `.project-showcase-body > p` does not override the recognition color. Keep the existing two-column desktop and one-column mobile project grid.

- [ ] **Step 5: Run project, data, content, lint, and build verification**

```powershell
node --test tests/portfolio-data.test.cjs tests/portfolio-content.e2e.cjs
npm.cmd run lint
npm.cmd run build
```

Expected: all tests pass, lint exits 0, and build exits 0.

- [ ] **Step 6: Commit the project deliverable**

```powershell
git add -- src/components/ProjectsSection.jsx src/index.css tests/portfolio-content.e2e.cjs
git commit -m "feat: add AI data project case studies"
```

---

### Task 6: Validate Responsive Layout, Accessibility, and Full Regression Suite

**Files:**
- Modify: `tests/portfolio-content.e2e.cjs`
- Modify if a test exposes a defect: `src/index.css` or the responsible component only

**Interfaces:**
- Consumes: the complete page and all test hooks established in Tasks 2-5.
- Produces: automated viewport-overflow and landmark checks plus fresh render evidence.

- [ ] **Step 1: Add the failing-or-proving responsive and semantic test**

Append to `tests/portfolio-content.e2e.cjs`:

```js
test("the enriched portfolio remains semantic and horizontally contained", async () => {
    assert.equal(await page.locator("main").count(), 1);
    assert.equal(await page.locator("main > section").count(), 6);

    for (const viewport of [
        { width: 1440, height: 1000 },
        { width: 390, height: 844 },
    ]) {
        await page.setViewportSize(viewport);
        await page.reload({ waitUntil: "networkidle" });
        const dimensions = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
        }));
        assert.ok(
            dimensions.scrollWidth <= dimensions.clientWidth,
            `Horizontal overflow at ${viewport.width}px: ${JSON.stringify(dimensions)}`,
        );
    }
});
```

Run:

```powershell
node --test --test-name-pattern="semantic and horizontally contained" tests/portfolio-content.e2e.cjs
```

Expected: PASS if prior responsive rules are sufficient. If it fails, change only the overflowing selector, rerun this named test, and record the exact selector in the commit body.

- [ ] **Step 2: Run the complete automated suite**

With the Vite server running on port 4191:

```powershell
node --test tests/about-scroll.e2e.cjs tests/background-opacity.e2e.cjs tests/portfolio-data.test.cjs tests/portfolio-content.e2e.cjs
npm.cmd run lint
npm.cmd run build
git diff --check
```

Expected: zero test failures, ESLint exit 0, production build exit 0, and no whitespace errors. The existing Vite chunk-size advisory is informational unless a new warning appears.

- [ ] **Step 3: Capture and inspect desktop and mobile renders**

Use Playwright to capture the full page at `1440x1000` and `390x844`. Inspect Hero, proof strip, both About tabs, Skills, Projects, Contact boundary, and Footer. Verify:

- no clipped metric, timeline, skill, or project text
- no horizontal overflow
- no background opacity seams
- project images remain contained
- the mobile menu does not cover core content after closing
- focusable links and buttons remain visible and readable

- [ ] **Step 4: Review the final diff against the approved acceptance criteria**

Run:

```powershell
git status --short
git diff --stat aa08254..HEAD
git log -6 --oneline
```

Confirm the CV is not staged or committed, the design and plan remain present, and exactly four flagship projects are rendered.

- [ ] **Step 5: Commit final QA fixes only if Step 1 or Step 3 required code changes**

```powershell
git add -- tests/portfolio-content.e2e.cjs src/index.css
git commit -m "test: cover portfolio content and responsive layout"
```

If no production fix was required, stage and commit only `tests/portfolio-content.e2e.cjs` with the same message.
