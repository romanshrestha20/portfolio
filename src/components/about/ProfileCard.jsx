
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function AboutText() {
  return (
    <>
      <motion.div className="relative w-56 h-56 mb-6">
        <motion.img
          src="https://images.unsplash.com/photo-1735081204311-eaaecd5b1782?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Profile Picture"
          className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-primary dark:border-blue-400 shadow-lg transition-transform transform hover:scale-105"
        />
      </motion.div>

      <a
        href="https://drive.google.com/file/d/1edylUMY-0jSeB2pjS3OVT_3Uky5qDjI4/view?usp=drive_link"
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-blue-600 transition-all flex items-center space-x-3 mb-6"
        aria-label="Download CV"
      >
        <Download className="h-5 w-5" />
        <span>Download My CV</span>
      </a>
    </>
  );
}
