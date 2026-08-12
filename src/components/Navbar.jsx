import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOnLightSurface, setIsOnLightSurface] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const updateNavState = () => {
            setIsScrolled(window.scrollY > 16);
            const sampledSurface = document.elementFromPoint(8, 88);
            setIsOnLightSurface(Boolean(sampledSurface?.closest(".cerebrium-panel")));
        };

        updateNavState();
        window.addEventListener("scroll", updateNavState, { passive: true });
        window.addEventListener("resize", updateNavState);
        return () => {
            window.removeEventListener("scroll", updateNavState);
            window.removeEventListener("resize", updateNavState);
        };
    }, []);

    return (
        <motion.nav
            className={cn(
                "cerebrium-nav",
                isScrolled && "is-scrolled",
                isOnLightSurface && "on-light",
            )}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
        >
            <div className="cerebrium-nav-inner">
                <a className="cerebrium-brand" href="#hero" aria-label="Rafi Nazir home">
                    <img
                        className="cerebrium-brand-logo"
                        src="/logo.svg"
                        alt=""
                        width="32"
                        height="32"
                        aria-hidden="true"
                    />
                    <span>Rafi Nazir</span>
                </a>

                <div className="cerebrium-nav-menu" aria-label="Primary navigation">
                    {navItems.map((item) => (
                        <a key={item.name} href={item.href}>{item.name}</a>
                    ))}
                    <span className="cerebrium-nav-grid" aria-hidden="true">⌘</span>
                </div>

                <a className="cerebrium-nav-cta" href="#contact">Let&apos;s talk</a>

                <button
                    type="button"
                    className="cerebrium-mobile-trigger"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    aria-expanded={isMenuOpen}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <span>{isMenuOpen ? "Close" : "Menu"}</span>
                    {isMenuOpen ? <X size={17} /> : <Menu size={17} />}
                </button>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="cerebrium-mobile-menu"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.24 }}
                    >
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                initial={{ opacity: 0, x: -14 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.045 }}
                            >
                                <span>0{index + 1}</span>
                                {item.name}
                            </motion.a>
                        ))}
                        <a className="cerebrium-mobile-menu__cta" href="#contact" onClick={() => setIsMenuOpen(false)}>
                            Start a conversation
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
