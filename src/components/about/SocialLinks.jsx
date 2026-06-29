import { motion } from "framer-motion";
import { Linkedin, Github, Instagram } from "lucide-react";

const iconColors = {
  linkedin: "text-primary-light dark:text-primary-dark",
  github: "text-textSecondary-light dark:text-textSecondary-dark",
  instagram: "text-accent-light dark:text-accent-dark",
};

export default function SocialLinks() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <motion.a
        href="https://www.linkedin.com/in/romanshrr/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        className={`${iconColors.linkedin} inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-light bg-surface-light px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-primary-light dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary-dark sm:w-auto`}
        aria-label="LinkedIn Profile"
      >
        <Linkedin className="h-5 w-5" />
        <span>LinkedIn</span>
      </motion.a>
      <motion.a
        href="https://github.com/romanshrestha20"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        className={`${iconColors.github} inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-light bg-surface-light px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-primary-light dark:border-border-dark dark:bg-surface-dark dark:hover:border-primary-dark sm:w-auto`}
        aria-label="GitHub Profile"
      >
        <Github className="h-5 w-5" />
        <span>GitHub</span>
      </motion.a>
      <motion.a
        href="https://www.instagram.com/romanshrr/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        className={`${iconColors.instagram} inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-light bg-surface-light px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-accent-light dark:border-border-dark dark:bg-surface-dark dark:hover:border-accent-dark sm:w-auto`}
        aria-label="Instagram Profile"
      >
        <Instagram className="h-5 w-5" />
        <span>Instagram</span>
      </motion.a>
    </div>
  );
}
