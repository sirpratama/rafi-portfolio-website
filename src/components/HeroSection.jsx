import { ArrowDown, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line

export const HeroSection = () => {
    return(
        <section 
        id="hero" 
        className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 bg-subtle-pattern"
    >
        <div className="color"></div>
        <div className="container max-w-4xl mx-auto text-center z-10">
            <div className="space-y-6 sm:space-y-8">
                <p className="text-sm tracking-widest text-muted-foreground opacity-0 animate-fade-in">Hello, I'm Rafi</p>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight opacity-0 animate-fade-in-delay-1 leading-tight">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent sm:whitespace-nowrap">Fullstack Engineer</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-4 px-4 sm:px-0">
                    <span>From frontend to backend, I build the bridge that connects vision to reality.</span>
                </p>

                <div className="pt-4 sm:pt-6 opacity-0 animate-fade-in-delay-4">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                        <a href="#projects" className="cosmic-button rounded-lg px-8 py-3 font-medium w-full sm:w-auto text-center">
                            View My Projects
                        </a>
                        <motion.a 
                            href="/CV ATS Muhammad Rafi Nazir Pratama.pdf" 
                            download 
                            className="group relative rounded-xl p-4 flex items-center justify-center gap-4 bg-white dark:bg-zinc-900/60 border-2 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 font-medium w-full sm:w-auto overflow-hidden"
                            whileHover={{ 
                                scale: 1.02,
                                y: -2,
                                borderColor: "#a855f7",
                                boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Animated background gradient */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100"
                                initial={{ x: "-100%" }}
                                whileHover={{ 
                                    x: "100%",
                                    opacity: 1,
                                    transition: { 
                                        x: { duration: 0.6, ease: "easeInOut" },
                                        opacity: { duration: 0.2 }
                                    }
                                }}
                            />
                            
                            {/* Pulsing glow effect */}
                            <motion.div
                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-blue-400/20 opacity-0"
                                animate={{
                                    opacity: [0, 0.3, 0],
                                    scale: [1, 1.02, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            
                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-4">
                                <motion.div
                                    className="relative"
                                    whileHover={{ 
                                        rotate: [0, -10, 10, 0],
                                        scale: 1.1
                                    }}
                                    transition={{ 
                                        duration: 0.5,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Download className="h-5 w-5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
                                    
                                    {/* Download arrow animation */}
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full opacity-0"
                                        animate={{
                                            opacity: [0, 1, 0],
                                            y: [0, 8, 16],
                                            scale: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 1
                                        }}
                                    />
                                </motion.div>
                                
                                <motion.span 
                                    className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                                    whileHover={{ x: 2 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Download CV
                                </motion.span>
                            </div>
                            
                            {/* Shimmer effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12"
                                initial={{ x: "-100%" }}
                                whileHover={{
                                    x: "200%",
                                    transition: { duration: 0.8, ease: "easeInOut" }
                                }}
                            />
                        </motion.a>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <ArrowDown className="h-6 w-6 text-primary" />
        </div>
    </section>
    )
}
