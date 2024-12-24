import React, { useState } from "react";
import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import HamburgerMenu from "./HamburgerMenu";
import useDarkMode from "./useDarkMode";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow fixed w-full z-10 transition-colors font-mono">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-blue-600 dark:text-blue-400"
          >
            <a href="#home">MyPortfolio</a>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 font-mono">
            <motion.a
              href="#about"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              About
            </motion.a>
            <motion.a
              href="#projects"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Projects
            </motion.a>
            <motion.a
              href="#skills"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Skills
            </motion.a>
            <motion.a
              href="#contact"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Contact
            </motion.a>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center space-x-2">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Hamburger Menu */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-800 shadow-md font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4 pt-4 pb-4">
              <motion.a
                href="#about"
                className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                About
              </motion.a>
              <motion.a
                href="#projects"
                className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Projects
              </motion.a>
              <motion.a
                href="#skills"
                className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Skills
              </motion.a>
              <motion.a
                href="#contact"
                className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
