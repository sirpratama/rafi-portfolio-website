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
} from "react-icons/si"
import { motion } from "framer-motion"

const TechnologyCard = ({ icon, name, description }) => {
  return (
    <div className="rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl dark:bg-zinc-900/60 dark:border-zinc-800 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:hover:border-zinc-700">
      <div className="w-12 h-12 flex items-center justify-center">{icon}</div>
      <div>
        <h3 className="text-left text-xl font-medium text-gray-900 dark:text-white">{name}</h3>
        <p className="text-left text-gray-500 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  )
}

export const SkillsSection = () => {
    const CurrentTechnologies = () => {
        const technologies = [
            {
                icon: <SiFigma className="w-8 h-8 text-[#F24E1E]" />,
                name: "Figma",
                description: "Design Tool",
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
                icon: <SiNextdotjs className="w-8 h-8 text-black dark:text-white" />,
                name: "NextJS",
                description: "React framework",
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
                icon: <SiNodedotjs className="w-8 h-8 text-[#339933]" />,
                name: "NodeJS",
                description: "Backend",
            },
            {
                icon: <SiMongodb className="w-8 h-8 text-[#47A248]" />,
                name: "MongoDB",
                description: "NoSQL database",
            },
            {
                icon: <SiPrisma className="w-8 h-8 text-[#2D3748]" />,
                name: "Prisma",
                description: "ORM",
            },
            {
                icon: <SiPostgresql className="w-8 h-8 text-[#4169E1]" />,
                name: "PostgreSQL",
                description: "OR database system",
            },
            {
                icon: <SiJavascript className="w-8 h-8 text-[#F0DB4F]" />,
                name: "JavaScript",
                description: "TypeScript but worse",
            },
        ]

        const cardVariants = {
            hidden: { opacity: 0, y: 50 },
            visible: (i) => ({
                opacity: 1,
                y: 0,
                transition: {
                    delay: i * 0.1,
                    duration: 0.5,
                },
            }),
        }

        return (
            <motion.div
                id="skills"
                className="bg-gray-50 text-gray-900 dark:bg-black dark:text-white min-h-screen p-8 flex flex-col justify-center items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                style={{ fontFamily: 'Inter' }}
            >
                <div className="mx-auto max-w-5xl">
                    <h1 className="text-5xl font-bold mb-4 text-left">Current technologies</h1>
                    <p className="text-gray-600 dark:text-zinc-400 mb-12 text-left">
                        I'm proficient in a range of modern technologies that empower me to build highly functional solutions. These
                        are some of my main technologies.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {technologies.map((tech, index) => (
                            <motion.div key={index} custom={index} variants={cardVariants}>
                                <TechnologyCard icon={tech.icon} name={tech.name} description={tech.description} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        )
    }

    return <CurrentTechnologies />
}