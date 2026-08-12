import { projects } from "@/data/portfolioData";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion"; // eslint-disable-line

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

export const ProjectsSection = () => {
    return (
        <section id="projects" className="cerebrium-panel cerebrium-projects-panel py-24 px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-blue-500/5 pointer-events-none" />

            <div className="mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="cerebrium-kicker cerebrium-section-kicker">Selected work</p>
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

                <div className="projects-showcase-grid">
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
                        </article>
                    ))}
                </div>

                <div className="mt-14 flex justify-center">
                    <a
                        className="cosmic-button rounded-lg px-8 py-3 font-medium flex items-center gap-2 group"
                        href="https://github.com/sirpratama"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Check My Github
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};
