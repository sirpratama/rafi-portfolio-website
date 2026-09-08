import { useLayoutEffect, useRef } from "react";
import { projects } from "@/data/portfolioData";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion"; // eslint-disable-line
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_FALLBACK = "/projects/project-placeholder.svg";

const handleProjectImageError = ({ currentTarget }) => {
    const failedPath = new URL(currentTarget.currentSrc || currentTarget.src).pathname;

    if (currentTarget.dataset.fallbackApplied === "true" || failedPath === PROJECT_FALLBACK) {
        currentTarget.removeAttribute("src");
        currentTarget.alt = "";
        currentTarget.setAttribute("aria-hidden", "true");
        currentTarget.dataset.imageState = "unavailable";
        return;
    }

    currentTarget.dataset.fallbackApplied = "true";
    currentTarget.src = PROJECT_FALLBACK;
    currentTarget.alt = "";
};

const ProjectImage = ({ project }) => (
    <img
        src={project.image}
        alt={project.imageAlt}
        width="960"
        height="540"
        loading="lazy"
        decoding="async"
        onError={handleProjectImageError}
    />
);

export const ProjectsSection = () => {
    const shouldReduceMotion = useReducedMotion();
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (!section || !track) return undefined;

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            gsap.set(track, { x: 0 });

            if (!shouldReduceMotion) {
                media.add("(min-width: 821px)", () => {
                    const getDistance = () => Math.max(0, track.scrollWidth - track.clientWidth);
                    const horizontalTween = gsap.to(track, {
                        x: () => -getDistance(),
                        ease: "none",
                        paused: true,
                    });

                    ScrollTrigger.create({
                        trigger: section,
                        start: "top top",
                        end: () => `+=${getDistance()}`,
                        animation: horizontalTween,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    });
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
            id="projects"
            ref={sectionRef}
            data-horizontal-projects="true"
            className="cerebrium-panel cerebrium-projects-panel py-24 px-8 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-blue-500/5 pointer-events-none" />

            <div className="mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.h2
                        className="cerebrium-section-title"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Projects
                    </motion.h2>
                    <motion.p
                        className="cerebrium-section-copy"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Selected work across product engineering, AI, and data.
                    </motion.p>
                </motion.div>

                <div
                    ref={trackRef}
                    className="projects-showcase-grid"
                    data-horizontal-track="true"
                    aria-label="Featured projects"
                >
                    {projects.map((project) => (
                        <article key={project.id} className="project-showcase-card">
                            <div className="project-showcase-tags" aria-label={`${project.title} technologies`}>
                                {project.tags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>

                            <div className="project-showcase-media">
                                <ProjectImage project={project} />
                            </div>

                            <div className="project-showcase-body">
                                <p className="project-showcase-recognition">{project.recognition}</p>
                                <h3>{project.title}</h3>
                                <p className="project-showcase-description">{project.description || ""}</p>

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
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
