import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="cerebrium-footer">
            <div className="cerebrium-footer-cta">
                <p className="cerebrium-kicker">Have a project in mind?</p>
                <h2>Let&apos;s build something useful together.</h2>
                <a href="#contact" className="cerebrium-button cerebrium-button--blue">Start a conversation</a>
            </div>

            <div className="cerebrium-footer-links">
                <div>
                    <a href="https://github.com/sirpratama" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
                    <a href="https://www.linkedin.com/in/rafinazir/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
                    <a href="mailto:mnazirpratama@gmail.com" aria-label="Email"><Mail size={18} /></a>
                </div>
                <a href="#hero" className="cerebrium-footer-top">Back to top <ArrowUp size={16} /></a>
            </div>

            <div className="cerebrium-footer-bottom">
                <p>&copy; {new Date().getFullYear()} Rafi Nazir</p>
            </div>
        </footer>
    );
};
