import { motion } from "framer-motion";
import { Linkedin, Github, Instagram } from "lucide-react";

const iconColors = {
  linkedin: "text-primary-light dark:text-primary-dark",
  github: "text-textSecondary-light dark:text-textSecondary-dark",
  instagram: "text-accent-light dark:text-accent-dark",
};

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-6">
      <motion.a
        href="https://www.linkedin.com/in/romanshrr/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        className={`${iconColors.linkedin} hover:text-primary-light dark:hover:text-primary-dark transition-all duration-300`}
        aria-label="LinkedIn Profile"
      >
        <Linkedin className="w-8 h-8" />
      </motion.a>
      <motion.a
        href="https://github.com/romanshrestha20"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        className={`${iconColors.github} hover:text-text-light dark:hover:text-text-dark transition-all duration-300`}
        aria-label="GitHub Profile"
      >
        <Github className="w-8 h-8" />
      </motion.a>
      <motion.a
        href="https://www.instagram.com/romanshrr/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        className={`${iconColors.instagram} hover:text-accent-light dark:hover:text-accent-dark transition-all duration-300`}
        aria-label="Instagram Profile"
      >
        <Instagram className="w-8 h-8" />
      </motion.a>
    </div>
  );
}
