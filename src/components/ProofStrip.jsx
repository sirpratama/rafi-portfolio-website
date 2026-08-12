import { motion } from "framer-motion"; // eslint-disable-line
import { proofMetrics } from "@/data/portfolioData";

export const ProofStrip = () => (
    <section className="cerebrium-proof" aria-label="Selected impact">
        <div className="cerebrium-proof-grid">
            {proofMetrics.map((metric, index) => (
                <motion.article
                    key={metric.id}
                    className="cerebrium-proof-item"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: index * 0.07 }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                    <p>{metric.context}</p>
                </motion.article>
            ))}
        </div>
    </section>
);
