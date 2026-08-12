import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
    {
        id: 1,
        institution: "Universtas Indonesia",
        title: "S.Kom. Computer Science",
        period: "Expected Graduation: 2028",
        achievements: [
            "Currently pursuing a Bachelor's degree in Computer Science at Universitas Indonesia",
        ],
        projects: [],
        logo: "/logos/UI logo 2.png"
    },
    {
        id: 2,
        institution: "SMA Labschool Kebayoran",
        title: "High School",
        period: "2021 - 2024",
        achievements: [
            "Graduated from SMA Labschool Kebayoran with a focus on Mathematics and Computer Science",
            "Selected as **Indonesia representative** for World Scout Jamboree Korea 2023"
        ],
        projects: [],
        logo: "/logos/Logo_Labschool.png"
    }
];

const experienceData = [
    {
        id: 1,
        company: "Google Developer Groups on Campus",
        title: "Member",
        period: "Dec 2024 - Present",
        achievements: [
            "Led a team of 3 to victory in the GDG On Campus UI Hackathon 2025, securing **Best Tech Implementation** and **Best UI/UX Design** awards",
            "Architected and developed **REST APIs** for the Career Path Compass Hub project using React, Node.js, Express, and PostgreSQL",
            "Leverage **AI** to personalize career paths for students by using **Google Gemini API**"
        ],
        projects: ["Career Path Compass Hub"],
        logo: "/logos/gdgc_ui_logo.png"
    },
    {
        id: 2,
        company: "OpenHouse Fasilkom",
        title: "Business Development Team",
        period: "Aug 2024 - Sept 2024",
        achievements: [
            "Contributed to fundraising initiatives for OpenHouse Fasilkom through strategic merchandise sales and vendor relations",
            "Successfully identified and liaised with merchandise vendors, ensuring cost-effectiveness"
        ],
        projects: [],
        logo: "/logos/openhousefasilkom.png"
    },
    {
        id: 3,
        company: "Scouts",
        title: "Core Team",
        period: "Aug 2021 - Sept 2023",
        achievements: [
            "Selected as a **representative** for the Indonesia Contingent at the **World Scout Jamboree Korea 2023**, demonstrating leadership and adaptability",
            "Actively participated in initiatives that enhanced the school scouts program visibility and engagement"
        ],
        projects: [],
        logo: "/logos/worldscouting_logo.png"
    },
    {
        id: 4,
        company: "SkyeAvenue",
        title: "Funding Committee",
        period: "Jan 2023 - Aug 2023",
        achievements: [
            "Collaborated within a 30-member committee on daily sales of merchandise, food, and beverages, contributing to SkyAvenue achieving a net profit of **IDR 130 million** within six months"
        ],
        projects: [],
        logo: "/logos/skyavenue_logo.png"
    }
];

const renderFormattedText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={`${part}-${index}`} className="font-bold text-blue-600 dark:text-blue-400">
                    {part.slice(2, -2)}
                </strong>
            );
        }

        return part;
    });
};

const TimelineCard = ({ item }) => {
    const organization = item.company || item.institution;

    return (
        <div className="about-timeline-card">
            <div className="about-timeline-card__heading">
                <div className="about-timeline-card__logo">
                    <img
                        src={item.logo}
                        alt={`${organization} logo`}
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <span className="about-timeline-card__period">{item.period}</span>
                    <h3>{organization}</h3>
                    <p className="about-timeline-card__role">{item.title}</p>
                </div>
            </div>

            {item.achievements?.length > 0 && (
                <ul className="about-timeline-card__achievements">
                    {item.achievements.map((achievement, index) => (
                        <li key={`${item.id}-achievement-${index}`}>
                            <span>{renderFormattedText(achievement)}</span>
                        </li>
                    ))}
                </ul>
            )}

            {item.projects?.length > 0 && (
                <div className="about-timeline-card__projects" aria-label="Related projects">
                    {item.projects.map((project) => (
                        <span key={project}>🌐 {project}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("experience");
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const layoutRef = useRef(null);
    const railRef = useRef(null);
    const navRef = useRef(null);
    const progressRef = useRef(null);
    const entriesRef = useRef([]);

    const currentData = activeTab === "experience" ? experienceData : educationData;

    const setActiveJourneyItem = (index) => {
        setActiveIndex(index);

        const buttons = navRef.current?.querySelectorAll("button");
        if (!buttons?.length) return;

        gsap.to(buttons, {
            opacity: 0.32,
            x: 0,
            duration: 0.28,
            overwrite: "auto",
        });

        const activeButton = buttons[index];

        gsap.to(activeButton, {
            opacity: 1,
            x: 8,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
        });

        if (window.innerWidth <= 900 && activeButton) {
            const targetLeft =
                activeButton.offsetLeft -
                (navRef.current.clientWidth - activeButton.offsetWidth) / 2;

            navRef.current.scrollTo({
                left: Math.max(0, targetLeft),
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
            });
        }
    };

    useLayoutEffect(() => {
        const entries = entriesRef.current.slice(0, currentData.length).filter(Boolean);
        const media = gsap.matchMedia();

        const context = gsap.context(() => {
            gsap.set(entries, { clearProps: "opacity,visibility,transform" });
            gsap.set(navRef.current?.querySelectorAll("button"), { opacity: 0.32, x: 0 });
            gsap.set(navRef.current?.querySelector("button"), { opacity: 1, x: 8 });

            entries.forEach((entry, index) => {
                ScrollTrigger.create({
                    trigger: entry,
                    start: "top 56%",
                    end: "bottom 44%",
                    onEnter: () => setActiveJourneyItem(index),
                    onEnterBack: () => setActiveJourneyItem(index),
                });
            });

            gsap.fromTo(
                progressRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: layoutRef.current,
                        start: "top 45%",
                        end: "bottom 55%",
                        scrub: true,
                    },
                },
            );

            media.add("(min-width: 901px)", () => {
                ScrollTrigger.create({
                    trigger: layoutRef.current,
                    start: "top 18%",
                    end: "bottom 82%",
                    pin: railRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                });
            });
        }, sectionRef);

        ScrollTrigger.refresh();

        return () => {
            media.revert();
            context.revert();
        };
    }, [activeTab, currentData.length]);

    const changeTab = (tab) => {
        if (tab === activeTab) return;
        setActiveIndex(0);
        entriesRef.current = [];
        setActiveTab(tab);
    };

    const scrollToEntry = (index) => {
        entriesRef.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className="cerebrium-panel cerebrium-about-panel py-24 px-8 relative"
        >
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-blue-500/5 pointer-events-none" />

            <div className="mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="cerebrium-kicker cerebrium-section-kicker">Journey &amp; background</p>
                    <motion.h2
                        className="cerebrium-section-title"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        About Me
                    </motion.h2>
                    <motion.p
                        className="cerebrium-section-copy"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        My journey in technology and the experiences that shaped my career.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="flex justify-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="cerebrium-segmented">
                        {["experience", "education"].map((tab) => (
                            <motion.button
                                key={tab}
                                type="button"
                                onClick={() => changeTab(tab)}
                                className={`cerebrium-segmented-button ${
                                    activeTab === tab
                                        ? "bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg"
                                        : "text-gray-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
                                }`}
                                aria-pressed={activeTab === tab}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {tab}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                <div
                    ref={layoutRef}
                    className="about-scroll-layout"
                    data-gsap-enhanced="true"
                >
                    <aside ref={railRef} className="about-timeline-rail" aria-label={`${activeTab} timeline navigation`}>
                        <p className="about-timeline-rail__eyebrow"></p>
                        <div className="about-timeline-rail__track" aria-hidden="true">
                            <span ref={progressRef} />
                        </div>

                        <nav ref={navRef} className="about-timeline-nav">
                            {currentData.map((item, index) => {
                                const organization = item.company || item.institution;
                                const isActive = activeIndex === index;

                                return (
                                    <button
                                        key={`${activeTab}-nav-${item.id}`}
                                        type="button"
                                        data-active={isActive ? "true" : "false"}
                                        aria-current={isActive ? "step" : undefined}
                                        onClick={() => scrollToEntry(index)}
                                    >
                                        <span>
                                            <strong>{organization}</strong>
                                            <small>{item.period}</small>
                                        </span>
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    <div className="about-timeline-content">
                        {currentData.map((item, index) => (
                            <article
                                key={`${activeTab}-${item.id}`}
                                ref={(node) => {
                                    entriesRef.current[index] = node;
                                }}
                                className="about-timeline-entry"
                            >
                                <TimelineCard item={item} />
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
