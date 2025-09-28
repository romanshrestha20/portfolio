
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function AboutText() {
  return (
    <>
      <motion.div className="relative w-56 h-56 mb-6">
        <motion.img
          src="https://images.unsplash.com/profile-1759063902941-781bafd762a3image?w=150&dpr=2&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
          alt="Profile Picture"
          className="absolute inset-0 object-cover w-full h-full transition-transform transform border-4 rounded-full shadow-lg border-primary dark:border-blue-400 hover:scale-105"
        />
      </motion.div>

      <a
        href="https://drive.google.com/file/d/1edylUMY-0jSeB2pjS3OVT_3Uky5qDjI4/view?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-8 py-4 mb-6 space-x-3 text-white transition-all rounded-lg bg-primary hover:bg-blue-600"
        aria-label="Download CV"
      >
        <Download className="w-5 h-5" />
        <span>Download My CV</span>
      </a>
    </>
  );
}
