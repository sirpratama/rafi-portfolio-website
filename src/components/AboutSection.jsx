import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

const educationData = [
    {
        id: 1,
        title: "Computer Science",
        institution: "University of Technology",
        period: "2020 - 2024",
        description: "Focused on software engineering and web development with hands-on projects.",
        logo: "🎓" // Placeholder - replace with actual logo URL
    },
    {
        id: 2,
        title: "Full Stack Certificate",
        institution: "Coding Bootcamp Institute",
        period: "2023",
        description: "Intensive program covering React, Node.js, and modern web technologies.",
        logo: "💻" // Placeholder - replace with actual logo URL
    },
    {
        id: 3,
        title: "High School Diploma",
        institution: "Jakarta International School",
        period: "2016 - 2020",
        description: "Specialized in Mathematics and Computer Science with programming focus.",
        logo: "🏫" // Placeholder - replace with actual logo URL
    }
];

const experienceData = [
    {
        id: 1,
        title: "Full Stack Developer",
        company: "Tech Solutions Inc.",
        period: "2024 - Present",
        description: "Developing web applications with React and Node.js while leading a small development team.",
        logo: "🏢" // Placeholder - replace with actual company logo URL
    },
    {
        id: 2,
        title: "Frontend Developer Intern",
        company: "Digital Agency Co.",
        period: "2023 - 2024",
        description: "Built responsive web interfaces using React and collaborated with design teams.",
        logo: "🎨" // Placeholder - replace with actual company logo URL
    },
    {
        id: 3,
        title: "Freelance Web Developer",
        company: "Self-Employed",
        period: "2022 - 2023",
        description: "Created custom websites for small businesses and managed project lifecycles.",
        logo: "💼" // Placeholder - replace with actual company logo URL
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
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                            {item.title}
                        </h3>
                        <p className="text-purple-600 dark:text-purple-400 font-medium mb-3">
                            {item.company || item.institution}
                        </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-zinc-400 md:text-right">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{item.period}</span>
                        </div>
                    </div>
                </div>

                <p className="text-gray-600 dark:text-zinc-300 leading-relaxed">
                    {item.description}
                </p>
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