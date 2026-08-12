# AI and Data Portfolio Content Design

## Objective

Reposition Muhammad Rafi Nazir Pratama's portfolio for AI and data internship recruiters. The page should make his strongest evidence visible within a short scan: quantified internship impact, AI and data specialization, award-recognized projects, and the ability to deliver complete technical products.

This is a focused content and presentation enhancement of the existing single-page portfolio. It preserves the current Jakarta background, cobalt visual language, navigation model, section rhythm, responsive behavior, and contact workflow.

## Primary Audience

The primary audience is recruiters and hiring managers evaluating candidates for AI, machine learning, data science, analytics, and adjacent data-engineering internships.

The page should answer four questions quickly:

1. What AI and data problems has Rafi worked on?
2. What measurable outcomes did that work produce?
3. Which tools can he use in practice?
4. Where can a reviewer inspect the underlying work?

## Sources of Truth

Portfolio claims will be derived from:

- `public/CV ATS Muhammad Rafi Nazir Pratama.pdf`
- The existing portfolio content
- The public GitHub profile at `https://github.com/sirpratama`
- README files in the selected public repositories

The implementation will not invent dates, metrics, awards, production usage, or technical capabilities. If a GitHub repository and the CV differ, the CV governs biographical facts and outcomes, while the repository governs implementation details. Ambiguous claims will be omitted.

GitHub content will be copied into local structured data during development. The production site will not depend on a runtime GitHub API request.

## Information Architecture

The page will retain its current section order, with one new proof band:

1. Navigation
2. Hero
3. Proof strip
4. About: Experience and Education
5. Skills
6. Selected Projects
7. Contact
8. Footer

No new routes or detail pages will be added.

## Hero

The hero will establish a specific AI and data position instead of a broad full-stack claim.

Proposed headline:

> Building AI and data systems that turn complex information into useful decisions

Proposed supporting copy:

> Computer Science student focused on machine learning, RAG, analytics, and the full-stack systems that bring them into real workflows.

The existing `View projects` and `Download CV` actions remain. The Download CV action continues to reference the supplied PDF without modifying it.

## Proof Strip

A compact proof strip will appear directly below the hero. It will contain four recruiter-scannable outcomes:

- `75% faster` - memo-routing decisions through a local-LLM RAG pipeline at Central Bank of Indonesia
- `Up to 60%` - improvement in Terms of Reference submission tracking efficiency
- `900+ companies` - IDX-listed companies covered by the Infovesta data workflow
- `2 hackathon honors` - third place at Find-IT UGM 2026 and Best Tech Implementation for Career Path Compass Hub

Each item will use a prominent value, a short label, and enough context to avoid presenting an unexplained vanity metric. The strip will use the existing design tokens and remain readable as a single-column stack on narrow screens.

## Experience

The Experience tab will prioritize professional and directly relevant technical work.

### Central Bank of Indonesia

- Date: June 2026 to present
- Role: Data Intern, Department of Innovation and Digitalization
- Built a memo-disposition RAG pipeline with LangChain, LangSmith, and local LLMs through Ollama, reducing memo-routing decision time by 75%.
- Built an interactive Power BI dashboard that centralized procurement timelines, responsible units, project status, and target submission dates, improving Terms of Reference tracking efficiency by up to 60%.
- Transformed Excel-based procurement data with Power Query and DAX, reducing manual reporting effort by an estimated 50%.

### Infovesta Utama

- Date: July 2025 to August 2025
- Role: Research and Consulting Intern
- Designed a workflow that reduced manual data processing time by 60% for analysis covering more than 900 IDX-listed companies.
- Used Gemini 2.5 Pro to extract carbon-emission, employee-demographic, and governance metrics from source documents.

### Google Developer Groups on Campus UI

- Date: December 2024 to present
- Role: Member and project lead
- Led a three-person team that won Best Tech Implementation for Career Path Compass Hub.
- Designed and delivered a PERN-stack career guidance application and its REST APIs.

### Earlier Leadership

Scouts, OpenHouse Fasilkom, and SkyAvenue will move out of the primary timeline into one compact supporting note. It will summarize international representation, vendor coordination, fundraising, and contribution to a committee that generated IDR 130 million in net profit. This preserves leadership evidence without competing with the AI and data narrative.

## Education

The Education tab will accurately describe the double-degree program:

### The University of Queensland

- Bachelor of Computer Science, major in Artificial Intelligence
- Double Degree Program
- Brisbane, Australia
- Expected graduation: May 2028

### Universitas Indonesia

- S.Kom. in Computer Science
- Double Degree Program
- Jakarta, Indonesia
- Expected graduation: May 2028

The section will include a compact relevant-coursework group rather than nine separate timeline items:

- Intro to AI and Data Science
- Statistics and Probability
- Linear Algebra
- Data Structures and Algorithms
- Databases
- Software Engineering
- Operating Systems
- Advanced Programming
- Discrete Mathematics

## Skills

The existing flat technology grid will be reorganized into three capability groups. Descriptions will state practical use rather than jokes or generic category labels.

### AI and Machine Learning

- Python
- XGBoost
- Gemini API
- LangChain
- LangSmith
- Ollama
- Hugging Face
- Unsloth

### Data and Business Intelligence

- SQL
- PostgreSQL
- Power BI
- DAX
- Power Query
- Data extraction and transformation
- Exploratory analysis and visualization

### Product Engineering

- React and TypeScript
- Node.js and Express
- Supabase
- Docker and Docker Compose
- Git and GitHub
- REST API design

Less relevant tools can remain in the source data but will not receive equal visual weight. The section will not present tool proficiency as a percentage or rating.

## Selected Projects

The project grid will contain four evidence-rich case studies. Each card will present the problem, approach, outcome or recognition, stack, and source link. Cards should stay concise enough for scanning.

### AP-Analytics

- Source: `https://github.com/sirpratama/find-it-ml`
- Recognition: Third Place, Find-IT UGM Hackathon 2026
- Problem: Help MSMEs evaluate potential business locations.
- Approach: XGBoost-based Business Viability Index using competitor density, geospatial zoning, and socioeconomic indicators.
- Delivery: React frontend, Node.js services, PostgreSQL, Docker Compose, and Fly.io deployment with health checks.
- Stack labels: XGBoost, Python, React, PostgreSQL, Docker

### Financial News Analyzer

- Source: `https://github.com/sirpratama/News-Stock-Identifier`
- Problem: Convert unstructured Indonesian or English financial news into decision-support signals.
- Approach: Extract article content, identify affected public companies, and use Gemini to produce sentiment, market-impact, and recommendation fields.
- Stack labels: JavaScript, Gemini API, content extraction, structured JSON

### ESGku

- Source: `https://github.com/sirpratama/esg_score`
- Problem: Make ESG assessment more accessible to Indonesian MSMEs.
- Approach: Parse uploaded business documents with Gemini, calculate environmental, social, and governance scores, and track results in an authenticated dashboard.
- Stack labels: React, Gemini API, Supabase, PDF processing

### Golden Age of Video Games Analysis

- Source: `https://github.com/sirpratama/golden_era_of_videogames`
- Problem: Determine whether critic scores, user scores, and sales data support the idea of a video-game golden age.
- Approach: Query the dataset with PostgreSQL and visualize the findings with Python, pandas, Matplotlib, and Seaborn.
- Key conclusion: The repository analysis identifies 1997 to 2010 as the relevant period, with 1998 as the highest-rated year among critics in the analyzed data.
- Stack labels: SQL, Python, pandas, data visualization

Career Path Compass Hub will remain visible in the GDG experience entry, including its Best Tech Implementation recognition, but will not duplicate one of the four project cards.

## Visual and Interaction Design

- Preserve the current cobalt/Jakarta aesthetic and rounded light panels.
- Insert the proof strip directly after the hero without adding a navigation item.
- Retain the Experience/Education segmented control and GSAP-assisted timeline behavior.
- Add the earlier-leadership summary after the professional experience timeline.
- Render skills as three clearly titled clusters with consistent card sizing.
- Retain the two-column project grid on desktop and one-column layout on mobile.
- Prefer representative repository-owned screenshots when they are available, legible, and safe to ship. Use the existing branded placeholder when a repository lacks a suitable asset.
- Keep motion subtle, respect reduced-motion preferences, and avoid interactions that hide core content.

## Component and Data Design

Portfolio content will live in a local data module rather than being duplicated across components. The module will expose structured collections for:

- proof metrics
- professional experience
- education and coursework
- skill groups
- projects
- earlier leadership

The existing components will consume these collections. A small reusable proof-metric component may be introduced, while project and timeline rendering will continue to use the current card patterns. Data objects will use stable string IDs rather than position-based keys.

This local data boundary makes claims easy to review, prevents network failures, and allows content changes without rewriting layout logic.

## Failure and Fallback Behavior

- Repository links open directly on GitHub and remain ordinary links if metadata becomes stale.
- Project images use descriptive alternative text and fall back to the existing project placeholder if loading fails.
- The CV action remains a direct static-file download.
- The page must render all core content without JavaScript data fetching.
- External links use safe new-tab attributes where appropriate.

## Accessibility and Responsive Requirements

- Maintain heading order and meaningful section landmarks.
- Metric values must include text labels; meaning cannot depend on color alone.
- Timeline navigation remains keyboard-operable and identifies its active item.
- Project cards expose descriptive link labels rather than repeated ambiguous `View project` labels to assistive technology.
- Decorative imagery uses empty alternative text; informative project imagery uses descriptive alternative text.
- Desktop, tablet, and mobile layouts must avoid horizontal overflow and clipped content.
- Reduced-motion mode must preserve access to all information.

## Testing and Verification

Implementation will add focused regression coverage that verifies:

- The hero contains the approved AI and data positioning.
- The four proof metrics and their context render.
- Central Bank of Indonesia, Infovesta, and GDG appear in the primary Experience view.
- UQ and UI double-degree details appear in Education.
- The three skill groups render with representative tools.
- The four selected project cards have correct source links.
- The CV download target remains valid.

Existing tests for the About scroll interaction and shared background opacity must continue to pass. Final verification will include ESLint, the production build, and rendered desktop and mobile inspection of the updated sections.

## Acceptance Criteria

The enhancement is complete when:

1. A recruiter can identify Rafi's AI and data focus, strongest metrics, education, and flagship work from a short scan.
2. All displayed claims can be traced to the CV, existing portfolio, or selected GitHub repositories.
3. Professional experience receives more emphasis than older extracurricular activity.
4. Exactly four flagship project cards are shown without duplicating Career Path Compass Hub.
5. No production content depends on a runtime GitHub request.
6. The supplied CV and contact behavior remain intact.
7. Existing and new regression checks, lint, and production build pass.
8. Desktop and mobile renders preserve the existing visual system without overflow, clipped text, or opacity seams.
