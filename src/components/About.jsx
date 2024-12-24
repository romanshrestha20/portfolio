import React from 'react';
import { motion } from 'framer-motion'; // Import motion for animations
import { Download, Linkedin, Github, Instagram, ArrowDown } from 'lucide-react';

export default function About() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: 'smooth', // Smooth scrolling
        block: 'start', // Scroll to the top of the element
        inline: 'nearest', // Scroll horizontally to the nearest edge
      });
    }
  };

  const iconColors = {
    linkedin: "text-blue-600 dark:text-blue-400",
    github: "text-gray-800 dark:text-gray-200",
    instagram: "text-pink-600 dark:text-pink-400",
  };

  return (
    <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-4 font-poppins">
            About Me
          </h2>
          <p className="font-mono text-lg text-gray-600 dark:text-gray-300">
            Get to know me better 🌟
          </p>
        </motion.div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left Section: Profile Image and CV Download */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center w-full md:w-1/3 mb-8 md:mb-0"
          >
            <motion.div
  className="relative w-56 h-56 mb-6"
>
  <motion.img
    src="https://images.unsplash.com/photo-1735081204311-eaaecd5b1782?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Profile Picture"
    className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-blue-600 dark:border-blue-400 shadow-lg transition-transform transform hover:scale-105"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  />
</motion.div>

            <a
              href="https://drive.google.com/file/d/1edylUMY-0jSeB2pjS3OVT_3Uky5qDjI4/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-3 mb-6"
              aria-label="Download CV"
            >
              <Download className="h-5 w-5" />
              <span>Download My CV</span>
            </a>
            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-6">
              <motion.a
                href="https://www.linkedin.com/in/roman-shrestha"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className={`${iconColors.linkedin} hover:text-blue-700 dark:hover:text-blue-500 transition`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-8 w-8" />
              </motion.a>
              <motion.a
                href="https://github.com/romanshrestha20"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className={`${iconColors.github} hover:text-gray-600 dark:hover:text-gray-400 transition`}
                aria-label="GitHub Profile"
              >
                <Github className="h-8 w-8" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/roman_shrestha"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className={`${iconColors.instagram} hover:text-pink-700 dark:hover:text-pink-500 transition`}
                aria-label="Instagram Profile"
              >
                <Instagram className="h-8 w-8" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Section: About Text */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-2/3 px-6 md:px-12"
          >
            <div className="mb-10">
              <p className="font-serif text-xl leading-relaxed text-gray-800 dark:text-gray-300 tracking-wide">
                Hi! I'm <strong className="text-blue-600 dark:text-blue-400">Roman Shrestha</strong> 👋, and I'm passionate about
                solving problems 💡 and exploring new technologies 🚀. I've worked with{" "}
                <strong className="text-blue-600 dark:text-blue-400">Java, JavaScript, React, Python, and Linux</strong>, and
                I'm always excited to learn and grow in the tech world 💻.
              </p>
            </div>
            <div>
              <p className="mt-6 font-serif text-xl leading-relaxed text-gray-800 dark:text-gray-300 tracking-wide">
                When I'm not coding, I love spending time on <strong className="text-green-600 dark:text-green-400">football ⚽</strong> and{" "}
                <strong className="text-blue-600 dark:text-blue-400">traveling 🌍</strong>. Football keeps me active 🏃‍♂️ and teaches me the value of teamwork 🤝,
                while traveling helps me gain fresh perspectives ✈️ and inspire my creative side 🎨.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Arrow Animation */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-16 cursor-pointer"
          onClick={scrollToProjects} // Scroll to Projects when clicked
        >
          <ArrowDown className="mx-auto text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition" />
        </motion.div>
      </div>
    </section>
  );
}
