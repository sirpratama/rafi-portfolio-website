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
        ],
        projects: [],
        logo: "/logos/UI logo 2.png" // Placeholder - replace with actual logo URL
    },
    {
        id: 2,
        institution: "SMA Labschool Kebayoran",
        title: "High School",
        period: "2021 - 2024",
        achievements: [
            "Graduated from SMA Labschool Kebayoran with a focus on Mathematics and Computer Science",
            "Selected as **Indonesia representative** for World Scout Jamboree Korea 2023"
        ],
        projects: [],
        logo: "/logos/Logo_Labschool.png" // Placeholder - replace with actual logo URL
    }
];

const experienceData = [
    {
        id: 1,
        company: "Google Developer Groups on Campus",
        title: "Member",
        period: "Dec 2024 - Present",
        achievements: [
            "Led a team of 3 to victory in the GDG On Campus UI Hackathon 2025, securing **Best Tech Implementation** and **Best UI/UX Design** awards",
            "Architected and developed **REST APIs** for the Career Path Compass Hub project using React, Node.js, Express, and PostgreSQL",
            "Leverage **AI** to personalize career paths for students by using **Google Gemini API**"
        ],
        projects: ["Career Path Compass Hub"],
        logo: "/logos/gdgc_ui_logo.png"
    },
    {
        id: 2,
        company: "OpenHouse Fasilkom",
        title: "Business Development Team",
        period: "Aug 2024 - Sept 2024",
        achievements: [
            "Contributed to fundraising initiatives for OpenHouse Fasilkom through strategic merchandise sales and vendor relations",
            "Successfully identified and liaised with merchandise vendors, ensuring cost-effectiveness"
        ],
        projects: [],
        logo: "/logos/openhousefasilkom.png" // Placeholder - replace with actual company logo URL
    },
    {
        id: 3,
        company: "Scouts",
        title: "Core Team",
        period: "Aug 2021 - Sept 2023",
        achievements: [
            "Selected as a **representative** for the Indonesia Contingent at the **World Scout Jamboree Korea 2023**, demonstrating leadership and adaptability",
            "Actively participated in initiatives that enhanced the school scouts program visibility and engagement"
        ],
        projects: [],
        logo: "/logos/worldscouting_logo.png" // Placeholder - replace with actual company logo URL
    },
    {
        id: 4,
        company: "SkyeAvenue",
        title: "Funding Committee",
        period: "Jan 2023 - Aug 2023",
        achievements: [
            "Collaborated within a 30-member committee on daily sales of merchandise, food, and beverages, contributing to SkyAvenue achieving a net profit of **IDR 130 million** within six months"
        ],
        projects: [],
        logo: "/logos/skyavenue_logo.png" // Placeholder - replace with actual company logo URL
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
                    className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-full border-4 border-purple-500 shadow-lg z-10 flex items-center justify-center text-2xl overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                >
                    {item.logo.startsWith('/') ? (
                        <img 
                            src={item.logo} 
                            alt={`${item.company || item.institution} logo`}
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        item.logo
                    )}
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
                        {item.achievements.map((achievement, index) => {
                            // Function to render text with bold formatting
                            const renderFormattedText = (text) => {
                                const parts = text.split(/(\*\*.*?\*\*)/g);
                                return parts.map((part, partIndex) => {
                                    if (part.startsWith('**') && part.endsWith('**')) {
                                        return (
                                            <strong key={partIndex} className="font-bold text-purple-600 dark:text-purple-400">
                                                {part.slice(2, -2)}
                                            </strong>
                                        );
                                    }
                                    return part;
                                });
                            };

                            return (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-2 text-gray-700 dark:text-zinc-300 text-sm leading-relaxed text-left"
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-purple-500 text-xs leading-6 flex-shrink-0">●</span>
                                    <span className="text-left">
                                        {renderFormattedText(achievement)}
                                    </span>
                                </motion.li>
                            );
                        })}
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