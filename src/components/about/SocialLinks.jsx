import { motion } from "framer-motion";
import { Linkedin, Github, Instagram } from "lucide-react";

const iconColors = {
  linkedin: "text-blue-600 dark:text-blue-400",
  github: "text-gray-800 dark:text-gray-200",
  instagram: "text-pink-600 dark:text-pink-400",
};

export default function SocialLinks() {
  return (
    <div className="flex justify-center space-x-6">
      <motion.a
        href="https://www.linkedin.com/in/romanshrr/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        className={`${iconColors.linkedin} hover:text-blue-700 dark:hover:text-blue-500 transition-all duration-300`}
        aria-label="LinkedIn Profile"
      >
        <Linkedin className="w-8 h-8" />
      </motion.a>
      <motion.a
        href="https://github.com/romanshrestha20"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        className={`${iconColors.github} hover:text-gray-600 dark:hover:text-gray-400 transition-all duration-300`}
        aria-label="GitHub Profile"
      >
        <Github className="w-8 h-8" />
      </motion.a>
      <motion.a
        href="https://www.instagram.com/romanshrr/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2 }}
        className={`${iconColors.instagram} hover:text-pink-700 dark:hover:text-pink-500 transition-all duration-300`}
        aria-label="Instagram Profile"
      >
        <Instagram className="w-8 h-8" />
      </motion.a>
    </div>
  );
}
