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
    return <section id="projects" className="py-24 px-8 relative bg-gray-50 dark:bg-zinc-950 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 pointer-events-none" />
        
        <div className="mx-auto max-w-5xl relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <motion.h2 
                    className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent leading-tight pb-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{ 
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        paddingBottom: '8px'
                    }}
                >
                    Projects
                </motion.h2>
                <motion.p 
                    className="text-gray-600 dark:text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
            >
                Here are some of the projects I've worked on.
                </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {projects.map((project, key) => (
                    <motion.div
                        key={key}
                        className="group bg-white dark:bg-zinc-900/60 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-500 max-w-sm w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            hidden: { opacity: 0, y: 60, scale: 0.9, rotateY: -15 },
                            visible: { 
                                opacity: 1, 
                                y: 0, 
                                scale: 1, 
                                rotateY: 0,
                                transition: { 
                                    duration: 0.7,
                                    ease: "easeOut",
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15
                                } 
                            }
                        }}
                        whileHover={{ 
                            y: -10,
                            scale: 1.03,
                            rotateY: 5,
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div 
                            className="h-48 overflow-hidden relative"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.img 
                                src={project.image} 
                            alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>

                        <motion.div 
                            className="p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <motion.div 
                                className="flex flex-wrap gap-2 mb-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                {project.tags.map((tag, tagIndex) => (
                                    <motion.span 
                                        key={tag} 
                                        className="px-3 py-1 text-xs font-medium border border-purple-200 dark:border-purple-700 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors duration-300"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.4 + tagIndex * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </motion.div>

                            <motion.h3 
                                className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            > 
                                {project.title}
                            </motion.h3>
                            <motion.p 
                                className="text-gray-600 dark:text-zinc-400 text-sm mb-6 leading-relaxed"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                viewport={{ once: true }}
                            >
                                {project.description}
                            </motion.p>
                            <motion.div 
                                className="flex justify-between items-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex space-x-4">
                                    <motion.a 
                                        href={project.demoUrl}
                                        target="_blank"
                                        className="text-gray-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 p-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        title="View Demo"
                                    >
                                        <ExternalLink size={20}/>
                                    </motion.a>
                                    <motion.a 
                                        href={project.githubUrl}
                                        target="_blank"
                                        className="text-gray-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 p-2 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/30"
                                        whileHover={{ scale: 1.2, rotate: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        title="View Code"
                                    >
                                        <Github size={20}/>
                                    </motion.a>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className="mt-16 flex justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
            >
                <motion.a 
                    className="cosmic-button rounded-lg px-8 py-3 font-medium flex items-center gap-2 group"
                    href="https://github.com/sirpratama" 
                    target="_blank"
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 25px rgba(139, 92, 246, 0.7)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    Check My Github 
                    <motion.div
                        className="group-hover:translate-x-1 transition-transform duration-300"
                        whileHover={{ x: 5 }}
                    >
                        <ArrowRight size={16}/>
                    </motion.div>
                </motion.a>
            </motion.div>
        </div>
    </section>
}