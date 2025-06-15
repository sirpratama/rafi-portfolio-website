import { Linkedin, Mail, MapPin, Phone, Instagram, Twitter, Github, Send } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const ContactSection = () => {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsSubmitting(true)

        setTimeout(() => {
            toast({
                title: "Message sent!",
                description: "Thank you for contacting me. I will get back to you as soon as possible."
            })
            setIsSubmitting(false)
        }, 1500)
    }

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            value: "mnazirpratama@gmail.com",
            href: "mailto:sirpratama2003@gmail.com"
        },
        {
            icon: Phone,
            title: "Phone",
            value: "+62 812-8454-7459",
            href: "tel:+6285730303030"
        },
        {
            icon: MapPin,
            title: "Location",
            value: "Jakarta, Indonesia",
            href: null
        }
    ]

    const socialLinks = [
        { icon: Linkedin, href: "https://www.linkedin.com/in/rafinazir/", label: "LinkedIn" },
        { icon: Github, href: "https://github.com/sirpratama", label: "GitHub" },
        { icon: Instagram, href: "https://www.instagram.com/rafinzir/", label: "Instagram" },
        { icon: Twitter, href: "https://twitter.com/sirpratama2003", label: "Twitter" }
    ]

    return (
        <section 
            id="contact"
            className="py-24 px-8 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden"
        >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/5 to-blue-500/5 pointer-events-none" />
            
            <div className="container mx-auto max-w-5xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
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
                        Get In Touch
                    </motion.h2>
                    <motion.p
                        className="text-gray-600 dark:text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        I'm currently looking for new opportunities. Whether you have a question, a project in mind, or just want to say hi, I'll do my best to respond.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.h3
                            className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            viewport={{ once: true }}
                        >
                            Contact Information
                        </motion.h3>

                        <div className="space-y-6">
                            {contactInfo.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="flex items-start space-x-4 group"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div
                                            className="p-3 rounded-full bg-white dark:bg-zinc-900 border-2 border-purple-200 dark:border-purple-800 group-hover:border-purple-400 dark:group-hover:border-purple-600 shadow-sm group-hover:shadow-lg transition-all duration-300"
                                            whileHover={{ 
                                                scale: 1.1,
                                                rotate: 5,
                                                boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <IconComponent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                        </motion.div>
                                        <div className="flex-1">
                                            <motion.h4 
                                                className="font-medium text-gray-900 dark:text-white mb-1"
                                                whileHover={{ color: "#a855f7" }}
                                            >
                                                {item.title}
                                            </motion.h4>
                                            {item.href ? (
                                                <motion.a
                                                    href={item.href}
                                                    className="text-gray-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                                                    whileHover={{ scale: 1.02 }}
                                                >
                                                    {item.value}
                                                </motion.a>
                                            ) : (
                                                <span className="text-gray-600 dark:text-zinc-400">
                                                    {item.value}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Social Links */}
                        <motion.div
                            className="pt-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            viewport={{ once: true }}
                        >
                            <motion.h4
                                className="font-medium mb-6 text-gray-900 dark:text-white"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                                viewport={{ once: true }}
                            >
                                Connect With Me
                            </motion.h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 rounded-full bg-white dark:bg-zinc-900 border-2 border-gray-200 dark:border-zinc-800 hover:border-purple-400 dark:hover:border-purple-600 text-gray-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 shadow-sm hover:shadow-lg group"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ 
                                                scale: 1.15,
                                                rotate: 10,
                                                boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)"
                                            }}
                                            whileTap={{ scale: 0.9 }}
                                            title={social.label}
                                        >
                                            <IconComponent className="h-5 w-5" />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="bg-white dark:bg-zinc-900/60 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -2, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                    >
                        <motion.h3
                            className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            viewport={{ once: true }}
                        >
                            Send a Message
                        </motion.h3>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                                    Your Name
                                </label>
                                <motion.input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Your Name..."
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                                    Your Email
                                </label>
                                <motion.input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                    placeholder="Your Email..."
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.0 }}
                                viewport={{ once: true }}
                            >
                                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                                    Your Message
                                </label>
                                <motion.textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                                    placeholder="Your Message..."
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={cn(
                                    "cosmic-button w-full flex items-center justify-center gap-2 rounded-lg px-8 py-3 font-medium transition-all duration-300",
                                    isSubmitting && "opacity-70 cursor-not-allowed"
                                )}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.1 }}
                                viewport={{ once: true }}
                                whileHover={!isSubmitting ? { 
                                    scale: 1.02,
                                    boxShadow: "0 0 25px rgba(139, 92, 246, 0.6)"
                                } : {}}
                                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <motion.div
                                            whileHover={{ x: 2, rotate: 15 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Send size={17} />
                                        </motion.div>
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}