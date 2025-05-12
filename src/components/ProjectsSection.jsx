import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Career Path Compass Hub",
        description: "A platform for students to explore their career paths and find the best fit for them.",
        image: "/projects/project 3.png",
        tags: ["React","Typescript", "Node.js", "Express", "PostgreSQL", "Gemini API"],
        demoUrl: "https://career-path-compass-hub.vercel.app/",
        githubUrl:"https://github.com/sirpratama/career-path-compass-hub"
    }
]

export const ProjectsSection = () => {
    return <section id="projects" className="py-24 px-8 relative">
        <div className="mx-auto max-w-5xl">
            <h2 className="text-5xl font-bold mb-4 text-left"
                style={{ fontFamily: 'Inter' }}
            >
                <span className="text-primary"> Projects </span>
            </h2>
            <p className="text-gray-600 dark:text-zinc-400 mb-12 max-w-3xl text-left"
                style={{ fontFamily: 'Inter' }}
            >
                Here are some of the projects I've worked on.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, key) => (
                    <motion.div
                        key={key}
                        className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        <div className="h-48 overflow-hidden">
                            <img src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-5-- group-hover:scale-110"/>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-xs font-medium border border-border rounded-full bg-secondary text-secondary-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h3 className="text-xl font-semibold mb-1"> 
                                {project.title}
                                </h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                {project.description}

                            </p>
                            <div className="flex justfiy-between items-center">
                                <div className="flex space-x-3">
                                    <a href={project.demoUrl}
                                        target="_blank"
                                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                    >
                                        <ExternalLink size={20}/>
                                    </a>
                                    <a href={project.githubUrl}
                                        target="_blank"
                                        className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                    >
                                        <Github size={20}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 flex">
                <a className="cosmic-button w-fit flex items-center gap-2" href="https://github.com/sirpratama" target="_blank">
                    Check My Github <ArrowRight size={16}/>
                </a>
            </div>
        </div>
    </section>
}