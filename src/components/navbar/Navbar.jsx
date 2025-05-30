import React, { useState } from "react";
import { motion } from "framer-motion";
import useDarkMode from "../../hooks/useDarkMode";
import DarkModeToggle from "../DarkModeToggle";
import HamburgerMenu from "../HamburgerMenu";

const navLinks = ["About", "Projects", "Skills", "Contact"];

const AnimatedNavLink = ({ link, index, onClick }) => (
  <motion.a
    key={link}
    href={`#${link.toLowerCase()}`}
    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition block"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    {link}
  </motion.a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow fixed w-full z-50 transition-colors font-mono" aria-label="Main navigation">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-blue-600 dark:text-blue-400"
          >
            <a href="#about">MyPortfolio</a>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <AnimatedNavLink key={link} link={link} index={index} />
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

            {/* Hamburger */}
            <div className="md:hidden">
              <HamburgerMenu
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                ariaLabel="Toggle navigation menu"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-800 shadow-md font-mono absolute w-full left-0 top-14 z-40"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4 py-4 px-6">
              {navLinks.map((link, index) => (
                <AnimatedNavLink key={link} link={link} index={index} onClick={handleLinkClick} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
