import { BrainCircuit, Braces, Database } from "lucide-react";
import { motion } from "framer-motion"; // eslint-disable-line
import { skillGroups } from "@/data/portfolioData";

const groupIcons = {
    ai: BrainCircuit,
    data: Database,
    engineering: Braces,
};

export const SkillsSection = () => (
    <section id="skills" className="cerebrium-dark-section cerebrium-skills px-8 relative overflow-hidden">
        <div className="mx-auto max-w-6xl relative z-10">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="cerebrium-section-title cerebrium-section-title--light">Capabilities</h2>
                <p className="cerebrium-section-copy cerebrium-section-copy--light">
                    Tools I use to move from raw information to working AI and data products.
                </p>
            </motion.div>

            <div className="skill-group-grid">
                {skillGroups.map((group, index) => {
                    const Icon = groupIcons[group.icon];
                    return (
                        <motion.article
                            key={group.id}
                            className="skill-group-card"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <Icon size={28} aria-hidden="true" />
                            <h3>{group.title}</h3>
                            <p>{group.description}</p>
                            <ul className="skill-group-list">
                                {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                            </ul>
                        </motion.article>
                    );
                })}
            </div>
        </div>
    </section>
);
