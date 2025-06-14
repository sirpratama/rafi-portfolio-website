import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const navItems = [
    {name: "Home", href: "#hero"},
    {name: "About", href: "#about"},
    {name: "Skills", href: "#skills"},
    {name: "Projects", href: "#projects"},
    {name: "Contact", href: "#contact"},
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(()=> {
        const handleScroll = () => {
            setIsScrolled(window.screenY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    
    return (
        <motion.nav
            className={cn(
                "fixed w-full z-40 transition-all duration-500",
                isScrolled ? "py-3" : "py-5"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Gradient Background Overlay */}
            <div className={cn(
                "absolute inset-0 transition-all duration-500",
                isScrolled 
                    ? "bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-md border-b border-purple-500/20 shadow-lg" 
                    : "bg-transparent"
            )} />
            
            <div className="container flex items-center justify-between relative z-10">
                <motion.a 
                    className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent flex items-center"
                    href="#hero"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                </motion.a>

                {/* desktop nav items */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item, key) => (
                        <motion.a 
                           key={key} 
                           href={item.href} 
                           className="relative text-foreground/80 hover:text-primary transition-colors duration-300 px-3 py-2 rounded-lg"
                           whileHover={{ 
                               scale: 1.05,
                               backgroundColor: "rgba(139, 92, 246, 0.1)",
                           }}
                           whileTap={{ scale: 0.95 }}
                           transition={{ duration: 0.2 }}
                        >
                           <span className="relative z-10">{item.name}</span>
                           <motion.div
                               className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0"
                               whileHover={{ opacity: 1 }}
                               transition={{ duration: 0.2 }}
                           />
                        </motion.a>
                    ))}
                </div>


                {/* mobile nav items */}
                <motion.button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 text-foreground z-50 rounded-lg"
                    whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "rgba(139, 92, 246, 0.1)" 
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        animate={{ rotate: isMenuOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            className="fixed inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-md z-40 flex flex-col items-center justify-center md:hidden"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div 
                                className="flex flex-col space-y-8 text-xl"
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                {navItems.map((item, key) => (
                                    <motion.a 
                                        key={key} 
                                        href={item.href} 
                                        className="text-foreground/80 hover:text-primary transition-colors duration-300 px-6 py-3 rounded-lg text-center"
                                        onClick={() => setIsMenuOpen(false)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: key * 0.1 }}
                                        whileHover={{ 
                                            scale: 1.05,
                                            backgroundColor: "rgba(139, 92, 246, 0.1)"
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};
