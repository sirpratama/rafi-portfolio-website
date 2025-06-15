import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const educationData = [
    {
        id: 1,
        institution: "Universtas Indonesia",
        title: "S.Kom. Computer Science",
        period: "Expected Graduation: 2028",
        achievements: [
            "Currently pursuing a Bachelor's degree in Computer Science at Universitas Indonesia",
            "Teaching Assistant for the course of Data Structures and Algorithms"
        ],
        projects: ["Project 1", "Project 2"],
        logo: "🎓" // Placeholder - replace with actual logo URL
    },
    {
        id: 2,
        institution: "SMA Labschool Kebayoran",
        title: "High School",
        period: "2021 - 2024",
        achievements: [
            "Graduated from SMA Labschool Kebayoran with a focus on Mathematics and Computer Science",
            "Selected as Indonesia representative for World Scout Jamboree Korea 2023"
        ],
        projects: [],
        logo: "🏫" // Placeholder - replace with actual logo URL
    }
];

const experienceData = [
    {
        id: 1,
        company: "DBS Bank",
        title: "Graduate Associate (SEED Programme)",
        period: "Jul 2023 - Present",
        achievements: [
            "Developed the Java backend for a bank account servicing process with multiple channel integrations using Activiti workflow",
            "Built a custom database migration tool using Python and MariaDB and facilitated the migration of 1000+ processes from a vendor platform"
        ],
        projects: [],
        logo: "🏦" // Placeholder - replace with actual company logo URL
    },
    {
        id: 2,
        company: "Singapore Institute of Technology",
        title: "Software Developer (Contract)",
        period: "Apr 2023 - Jun 2023",
        achievements: [
            "Built NFTVue, a NFT gallery website that allows students to connect their crypto wallets to view and verify their school event-issued NFTs",
            "Worked on DemoConstruct, a full-stack web application (React + Python) that uses Meshroom to reconstruct 3D models from captured images"
        ],
        projects: ["NFTVue"],
        logo: "🏫" // Placeholder - replace with actual company logo URL
    },
    {
        id: 3,
        company: "DBS Bank",
        title: "Software Developer (Intern)",
        period: "May 2022 - Dec 2022",
        achievements: [
            "Worked on the backend for the digital exchange and asset custody application using Spring Boot and Java",
            "Built an admin dashboard web application for a DBS Metaverse event using Spring Security and Angular"
        ],
        projects: [],
        logo: "🏦" // Placeholder - replace with actual company logo URL
    },
    {
        id: 4,
        company: "Activate Interactive Pte Ltd",
        title: "Software Developer (Intern)",
        period: "May 2019 - Aug 2019",
        achievements: [
            "Developed RP Connect, the iOS and Android mobile app for Republic Polytechnic using React Native"
        ],
        projects: [],
        logo: "📱" // Placeholder - replace with actual company logo URL
    }
];

const TimelineItem = ({ item, isLast }) => {
    return (
        <motion.div
            className="relative flex gap-6 pb-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            {/* Timeline bullet and line */}
            <div className="relative flex flex-col items-center">
                <motion.div
                    className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-full border-4 border-purple-500 shadow-lg z-10 flex items-center justify-center text-2xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                >
                    {item.logo}
                </motion.div>
                {!isLast && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-purple-300 to-blue-300 mt-2 absolute top-16" />
                )}
            </div>

            {/* Content */}
            <motion.div
                className="flex-1 bg-white dark:bg-zinc-900/60 rounded-xl p-6 border border-gray-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-500 transition-colors duration-300 shadow-sm hover:shadow-lg"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-start gap-2 mb-1">
                            <span className="text-sm text-gray-500 dark:text-zinc-400 text-left">{item.period}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 text-left">
                            {item.company || item.institution}
                        </h3>
                        <p className="text-gray-600 dark:text-zinc-400 font-medium mb-4 text-left">
                            {item.title}
                        </p>
                    </div>
                </div>

                {/* Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                    <ul className="space-y-2 mb-4">
                        {item.achievements.map((achievement, index) => (
                            <motion.li
                                key={index}
                                className="flex items-start gap-2 text-gray-700 dark:text-zinc-300 text-sm leading-relaxed text-left"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-purple-500 text-xs leading-6 flex-shrink-0">●</span>
                                <span className="text-left">{achievement}</span>
                            </motion.li>
                        ))}
                    </ul>
                )}

                {/* Projects */}
                {item.projects && item.projects.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-start">
                        {item.projects.map((project, index) => (
                            <motion.span
                                key={index}
                                className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-full border border-gray-200 dark:border-zinc-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-200 dark:hover:border-purple-700 transition-colors duration-200 cursor-pointer text-left"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                🌐 {project}
                            </motion.span>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export const AboutSection = () => {
    const [activeTab, setActiveTab] = useState("experience");

    const currentData = activeTab === "experience" ? experienceData : educationData;

    return (
        <section id="about" className="py-24 px-8 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-blue-500/5 pointer-events-none" />
            
            <div className="mx-auto max-w-4xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <motion.h2
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
                        About Me
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 dark:text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        My journey in technology and the experiences that shaped my career.
                    </motion.p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    className="flex justify-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-white dark:bg-zinc-900/60 rounded-full p-2 border border-gray-200 dark:border-zinc-800 shadow-lg">
                        {["experience", "education"].map((tab) => (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                                    activeTab === tab
                                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                                        : "text-gray-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {tab}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Timeline Content */}
                <div className="relative">
                    {currentData.map((item, index) => (
                        <TimelineItem
                            key={item.id}
                            item={item}
                            isLast={index === currentData.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}; 