import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line
export const Footer = () => {
    return (
        <footer className="py-12 px-4 bg-gray-50 dark:bg-zinc-950 relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Rafi Nazir. All rights reserved.
            </p>
            
            <a href="#hero" className="p-2 ronded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                <ArrowUp />
            </a>
    </footer>
    )
}