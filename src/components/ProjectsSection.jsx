import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion"; // eslint-disable-line

const projects = [
    {
        id: 1,
        title: "Career Path Compass Hub",
        description: "A platform for students to explore career paths and discover opportunities that fit their goals.",
        image: "/projects/project-placeholder.svg",
        tags: ["React", "TypeScript", "Gemini AI"],
        demoUrl: "https://career-path-compass-hub.vercel.app/",
        githubUrl: "https://github.com/sirpratama/career-path-compass-hub",
    },
    {
        id: 2,
        title: "Golden Age of Video Games Analysis",
        description: "A data analysis project exploring the golden age of video games through sales data and industry trends.",
        image: "/projects/project-placeholder.svg",
        tags: ["Python", "Data Analysis", "SQL"],
        demoUrl: "https://github.com/sirpratama/golden_era_of_videogames",
        githubUrl: "https://github.com/sirpratama/golden_era_of_videogames",
    },
];

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
                            <div className="project-showcase-tags" aria-label="Project technologies">
                                {project.tags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>

                            <div className="project-showcase-media">
                                <img
                                    src={project.image}
                                    alt={`Placeholder preview for ${project.title}`}
                                    width="960"
                                    height="540"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            <div className="project-showcase-body">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>

                                <div className="project-showcase-actions">
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="project-showcase-primary-link"
                                    >
                                        View project
                                        <ExternalLink size={17} aria-hidden="true" />
                                    </a>
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="project-showcase-source-link"
                                        aria-label={`View ${project.title} source code on GitHub`}
                                    >
                                        <Github size={16} aria-hidden="true" />
                                        Source
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
