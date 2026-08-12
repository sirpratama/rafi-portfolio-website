import { ArrowDownRight, Download } from "lucide-react";
import { motion } from "framer-motion"; // eslint-disable-line
import { heroContent } from "@/data/portfolioData";

export const HeroSection = () => {
    return (
        <section id="hero" className="cerebrium-hero">
            <div className="cerebrium-hero-content">
                <div className="cerebrium-hero-layout">
                    <motion.h1
                        className="cerebrium-hero-headline"
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                    >
                        {heroContent.headline}
                    </motion.h1>

                    <motion.div
                        className="cerebrium-hero-aside"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, delay: 0.55 }}
                    >
                        <p>{heroContent.supportingCopy}</p>
                        <div className="cerebrium-hero-actions">
                            <a href="#projects" className="cerebrium-button cerebrium-button--blue">
                                View projects
                                <ArrowDownRight size={16} aria-hidden="true" />
                            </a>
                            <a
                                href="/CV ATS Muhammad Rafi Nazir Pratama.pdf"
                                download
                                className="cerebrium-button cerebrium-button--dark"
                            >
                                Download CV
                                <Download size={15} aria-hidden="true" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
