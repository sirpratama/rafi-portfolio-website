import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion"; // eslint-disable-line
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    coursework,
    earlierLeadership,
    educationData,
    experienceData,
} from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

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
    return (
        <div className="about-timeline-card">
            <div className="about-timeline-card__heading">
                <div className="about-timeline-card__logo">
                    {item.logo ? (
                        <img
                            src={item.logo}
                            alt={`${item.organization} logo`}
                            className="w-full h-full object-cover rounded-full max-w-none object-cover"
                        />
                    ) : (
                        <span className="about-timeline-card__monogram" aria-hidden="true">
                            {item.monogram}
                        </span>
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <span className="about-timeline-card__period">{item.period}</span>
                    <h3>{item.organization}</h3>
                    <p className="about-timeline-card__role">{item.role}</p>
                    <p className="about-timeline-card__location">{item.location}</p>
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
                        <span key={project}>{project}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("experience");
    const [activeIndex, setActiveIndex] = useState(0);
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef(null);
    const layoutRef = useRef(null);
    const railRef = useRef(null);
    const navRef = useRef(null);
    const progressRef = useRef(null);
    const entriesRef = useRef([]);

    const currentData = activeTab === "experience" ? experienceData : educationData;

    const setActiveJourneyItem = useCallback((index) => {
        setActiveIndex(index);

        const buttons = navRef.current?.querySelectorAll("button");
        if (!buttons?.length) return;

        const activeButton = buttons[index];

        if (shouldReduceMotion) {
            gsap.set(buttons, { opacity: 0.32, x: 0 });
            gsap.set(activeButton, { opacity: 1, x: 8 });
        } else {
            gsap.to(buttons, {
                opacity: 0.32,
                x: 0,
                duration: 0.28,
                overwrite: "auto",
            });

            gsap.to(activeButton, {
                opacity: 1,
                x: 8,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
            });
        }

        if (window.innerWidth <= 900 && activeButton) {
            const targetLeft =
                activeButton.offsetLeft -
                (navRef.current.clientWidth - activeButton.offsetWidth) / 2;

            navRef.current.scrollTo({
                left: Math.max(0, targetLeft),
                behavior: shouldReduceMotion ? "auto" : "smooth",
            });
        }
    }, [shouldReduceMotion]);

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

            if (shouldReduceMotion) {
                gsap.set(progressRef.current, { scaleY: 1, transformOrigin: "top center" });
            } else {
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
            }

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
    }, [activeTab, currentData.length, setActiveJourneyItem, shouldReduceMotion]);

    const changeTab = (tab) => {
        if (tab === activeTab) return;
        setActiveIndex(0);
        entriesRef.current = [];
        setActiveTab(tab);
    };

    const scrollToEntry = (index) => {
        setActiveJourneyItem(index);
        entriesRef.current[index]?.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
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
                                            <strong>{item.organization}</strong>
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
                    <section className="about-coursework" aria-labelledby="coursework-title">
                        <h3 id="coursework-title">Relevant coursework</h3>
                        <ul>
                            {coursework.map((course) => <li key={course}>{course}</li>)}
                        </ul>
                    </section>
            </div>
        </section>
    );
};
