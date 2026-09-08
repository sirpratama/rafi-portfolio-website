import { useLayoutEffect, useRef } from "react";
import { Box, BrainCircuit, ChevronDown, CircleDot, Database } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillGroups } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

const groupIcons = {
    ai: BrainCircuit,
    data: Database,
    engineering: Box,
};

const groupCopy = {
    "ai-ml": "Build models, automate workflows, and generate insights at scale.",
    "data-bi": "Organize, analyze, and visualize data to reveal insight and measure impact.",
    "product-engineering": "Build reliable, scalable applications that deliver real-world value.",
};

const CapabilitiesMap = ({ mapRef }) => (
    <div ref={mapRef} className="capabilities-map" aria-label="Connected capability system">
        <div className="capability-network" aria-hidden="true">
            <span className="capability-network-link capability-network-link--ai" />
            <span className="capability-network-link capability-network-link--data" />
            <span className="capability-network-link capability-network-link--engineering" />
        </div>

        <div className="capability-hub">
            <div className="capability-hub__core">
                <span className="capability-hub__signal" aria-hidden="true">
                    <CircleDot size={33} strokeWidth={1.35} />
                </span>
                <h3>Useful decision systems</h3>
                <p>AI, data, and engineering converge to create impact.</p>
            </div>
        </div>

        {skillGroups.map((group) => {
            const Icon = groupIcons[group.icon];
            const isEngineering = group.id === "product-engineering";

            return (
                <article
                    key={group.id}
                    className={`capability-cluster capability-cluster--${isEngineering ? "engineering" : "side"}`}
                    data-capability={group.id}
                >
                    <div className="capability-cluster__heading">
                        <span className="capability-cluster__icon" aria-hidden="true">
                            <Icon size={34} strokeWidth={1.45} />
                        </span>
                        <div>
                            <h3>{group.title}</h3>
                            <p>{groupCopy[group.id]}</p>
                        </div>
                    </div>

                    <ul className="capability-tool-list">
                        {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                    </ul>
                </article>
            );
        })}

        <p className="capabilities-scroll-cue" aria-hidden="true">
            <span>Scroll to explore the system</span>
            <ChevronDown size={25} strokeWidth={1.6} />
        </p>
    </div>
);

export const SkillsSection = () => {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef(null);
    const mapRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const map = mapRef.current;

        if (!section || !map) return undefined;

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            const branches = gsap.utils.toArray(".capability-cluster", map);
            const links = gsap.utils.toArray(".capability-network-link", map);

            gsap.set(branches, { clearProps: "all" });
            gsap.set(links, { clearProps: "all" });

            if (!shouldReduceMotion) {
                media.add("(min-width: 901px)", () => {
                    const [aiBranch, dataBranch, engineeringBranch] = branches;
                    const [aiLink, dataLink, engineeringLink] = links;

                    gsap.set(branches, { opacity: 0.34, scale: 0.965 });
                    gsap.set(links, { opacity: 0.28 });
                    gsap.set(aiBranch, { opacity: 1, scale: 1 });
                    gsap.set(aiLink, { opacity: 1 });

                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "+=2100",
                            pin: true,
                            scrub: 0.8,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        },
                    });

                    timeline
                        .to(aiBranch, { opacity: 0.34, scale: 0.965, duration: 0.25 }, 0.85)
                        .to(aiLink, { opacity: 0.28, duration: 0.25 }, 0.85)
                        .to(dataBranch, { opacity: 1, scale: 1, duration: 0.25 }, 0.85)
                        .to(dataLink, { opacity: 1, duration: 0.25 }, 0.85)
                        .to(dataBranch, { opacity: 0.34, scale: 0.965, duration: 0.25 }, 1.85)
                        .to(dataLink, { opacity: 0.28, duration: 0.25 }, 1.85)
                        .to(engineeringBranch, { opacity: 1, scale: 1, duration: 0.25 }, 1.85)
                        .to(engineeringLink, { opacity: 1, duration: 0.25 }, 1.85)
                        .set(engineeringLink, { opacity: 1 }, 3);

                    return () => timeline.kill();
                });
            }
        }, section);

        ScrollTrigger.refresh();

        return () => {
            media.revert();
            context.revert();
        };
    }, [shouldReduceMotion]);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="cerebrium-dark-section cerebrium-skills relative overflow-hidden"
            aria-labelledby="capabilities-title"
        >
            <div className="capabilities-shell">
                <header className="capabilities-intro">
                    <p className="capabilities-eyebrow">Capabilities</p>
                    <h2 id="capabilities-title" className="cerebrium-section-title cerebrium-section-title--light">
                        Capabilities
                    </h2>
                    <p className="cerebrium-section-copy cerebrium-section-copy--light">
                        Tools I use to move from raw information to working AI and data products.
                    </p>
                    <span className="capabilities-intro-rule" aria-hidden="true" />
                </header>

                <CapabilitiesMap mapRef={mapRef} />
            </div>
        </section>
    );
};
