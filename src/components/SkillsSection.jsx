"use client"

import {
  SiReact,
  SiFigma,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiSupabase,
  SiNodedotjs,
  SiMongodb,
  SiPrisma,
  SiPostgresql,
  SiJavascript,
  SiPython,
  SiExpress,
} from "react-icons/si"
import { motion } from "framer-motion"

const TechnologyCard = ({ icon, name, description }) => {
  return (
    <motion.div 
      className="rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl dark:bg-zinc-900/60 dark:border-zinc-800 dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] dark:hover:border-zinc-700 cursor-pointer group"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div 
        className="w-12 h-12 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300"
        whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
      >
        {icon}
      </motion.div>
      <div>
        <h3 className="text-left text-xl font-medium text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-purple-500">{name}</h3>
        <p className="text-left text-gray-500 dark:text-zinc-400 transition-colors duration-300">{description}</p>
      </div>
    </motion.div>
  )
}

export const SkillsSection = () => {
    const CurrentTechnologies = () => {
        const technologies = [
            {
                icon: <SiNextdotjs className="w-8 h-8 text-black dark:text-white" />,
                name: "NextJS",
                description: "React framework",
            },
            {
                icon: <SiTypescript className="w-8 h-8 text-[#3178C6]" />,
                name: "TypeScript",
                description: "JavaScript but better",
            },
            {
                icon: <SiReact className="w-8 h-8 text-[#61DAFB]" />,
                name: "React",
                description: "JavaScript Library",
            },
            {
                icon: <SiNodedotjs className="w-8 h-8 text-[#339933]" />,
                name: "NodeJS",
                description: "Backend",
            },
            {
                icon: <SiTailwindcss className="w-8 h-8 text-[#06B6D4]" />,
                name: "Tailwind",
                description: "CSS framework",
            },
            {
                icon: <SiGit className="w-8 h-8 text-[#F05032]" />,
                name: "Git",
                description: "Version control",
            },
            {
                icon: <SiSupabase className="w-8 h-8 text-[#3ECF8E]" />,
                name: "Supabase",
                description: "Backend tool",
            },
            {
                icon: <SiJavascript className="w-8 h-8 text-[#F0DB4F]" />,
                name: "JavaScript",
                description: "TypeScript but worse",
            },
            {
                icon: <SiExpress className="w-8 h-8 text-[#2D3748]" />,
                name: "Express",
                description: "Backend framework",
            },
            {
                icon: <SiPostgresql className="w-8 h-8 text-[#4169E1]" />,
                name: "PostgreSQL",
                description: "OR database system",
            },
            {
                icon: <SiPython className="w-8 h-8 text-[#306998]" />,
                name: "Python",
                description: "Not the snake",
            },
        ]

        const cardVariants = {
            hidden: { opacity: 0, y: 60, scale: 0.9 },
            visible: (i) => ({
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    delay: i * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                },
            }),
        }

        return (
            <motion.div
                id="skills"
                className="bg-gray-50 text-gray-900 dark:bg-black dark:text-white min-h-screen py-24 px-8 flex flex-col justify-center items-center relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                
                <div className="mx-auto max-w-5xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.h1 
                            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent leading-tight pb-2"
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
                            Current Technologies
                        </motion.h1>
                        <motion.p 
                            className="text-gray-600 dark:text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            I'm proficient in a range of modern technologies that empower me to build highly functional solutions. These
                            are some of my main technologies.
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {technologies.map((tech, index) => (
                            <motion.div key={index} custom={index} variants={cardVariants}>
                                <TechnologyCard icon={tech.icon} name={tech.name} description={tech.description} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        )
    }

    return <CurrentTechnologies />
}