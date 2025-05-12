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
    return (
    <section 
    id="contact"
    className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Get In <span className="text-primary"> Touch</span>
            </h2>

            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                I'm currently looking for new opportunities. Whether you have a question, a project in mind, or just want to say hi, I'll do my best to respond.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-11">
                <div className="space-y-8">
                    <h3 className="text-2xl font-semibold mb-6">
                        Contact Information
                    </h3>
                    <div className="space-y-6 justify-center">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-medium text-left"> Email</h4>
                                <a href="mailto:sirpratama2003@gmail.com" className="text-foreground/80 hover:text-primary transition-colors">
                                mnazirpratama@gmail.com</a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-medium text-left"> Phone</h4>
                                <a href="tel:+6285730303030" className="text-foreground/80 hover:text-primary transition-colors">
                                +62 812-8454-7459</a>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-medium text-left"> Location</h4>
                                <a className="text-foreground/80 hover:text-primary transition-colors">
                                Jakarta, Indonesia
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <h4 className="font-medium mb-4">
                            Connect With Me
                        </h4>
                        <div className="flex space-x-4 justify-center">
                            <a href="https://www.linkedin.com/in/rafinazir/" target="_blank">
                                <Linkedin />
                            </a>
                            <a href="https://github.com/sirpratama" target="_blank">
                                <Github />
                            </a>
                            <a href="https://www.instagram.com/rafinzir/" target="_blank">
                                <Instagram />
                            </a>
                            <a href="https://twitter.com/sirpratama2003" target="_blank">
                                <Twitter />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-card p-8 rounded-lg shadow-xs" onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2"
                            >
                                Your Name
                            </label>
                            <input 
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outlind-hidden focus:ring-2 focus:ring-primary"
                            placeholder="My Name..."
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2"
                            >
                                Your Email
                            </label>
                            <input 
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outlind-hidden focus:ring-2 focus:ring-primary"
                            placeholder="My Email..."
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2"
                            >
                                Your Message
                            </label>
                            <textarea 
                            id="message"
                            name="message"
                            required
                            className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outlind-hidden focus:ring-2 focus:ring-primary"
                            placeholder="Message..."
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting} className={cn("cosmic-button w-full flex items-center justify-center gap-2",

                        )}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            <Send size={17} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}