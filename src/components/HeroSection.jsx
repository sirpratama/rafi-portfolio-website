import { ArrowDown, Download } from "lucide-react";

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
                        <a href="/CV ATS Muhammad Rafi Nazir Pratama.pdf" download className="rounded-xl p-4 flex items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-xl dark:bg-zinc-900/60 dark:border-zinc-800 dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:hover:border-zinc-700 active:scale-95 w-full sm:w-auto">
                            <Download className="h-5 w-5" />
                            <span>Download CV</span>
                        </a>
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
