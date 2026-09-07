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
        context: "IDX-listed company analysis at Infovesta Utama",
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
        organization: "Central Bank of Indonesia",
        role: "Data Intern, Department of Innovation & Digitalization",
        period: "Jun 2026 - Present",
        location: "Jakarta, Indonesia",
        logo: "/logos/bank-indonesia-logo.jpg",
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
        logo: "/logos/infovesta-logo.jpg",
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
        image: "/projects/project-placeholder.svg",
        imageAlt: "",
        tags: ["XGBoost", "Python", "React", "PostgreSQL", "Docker"],
        githubUrl: "https://github.com/sirpratama/find-it-ml",
    },
    {
        id: "financial-news-analyzer",
        title: "Financial News Analyzer",
        recognition: "AI-assisted market intelligence",
        image: "/projects/project-placeholder.svg",
        imageAlt: "",
        tags: ["JavaScript", "Gemini API", "Content Extraction", "Structured JSON"],
        githubUrl: "https://github.com/sirpratama/News-Stock-Identifier",
    },
    {
        id: "esgku",
        title: "ESGku",
        recognition: "AI document intelligence for Indonesian MSMEs",
        image: "/projects/project-placeholder.svg",
        imageAlt: "",
        tags: ["React", "Gemini API", "Supabase", "PDF Processing"],
        githubUrl: "https://github.com/sirpratama/esg_score",
    },
    {
        id: "golden-age-video-games",
        title: "Golden Age of Video Games Analysis",
        recognition: "SQL and exploratory data analysis",
        image: "/projects/project 2.png",
        imageAlt: "Charts comparing video-game sales, critic ratings, user ratings, and golden years",
        tags: ["SQL", "Python", "pandas", "Data Visualization"],
        githubUrl: "https://github.com/sirpratama/golden_era_of_videogames",
    },
];
