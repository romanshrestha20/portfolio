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
    className="block text-gray-600 transition dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
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
  const { theme, toggleTheme } = useDarkMode();

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav
      className="fixed z-50 w-full font-mono transition-colors bg-white shadow dark:bg-gray-800"
      aria-label="Main navigation"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
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
          <div className="hidden space-x-6 md:flex">
            {navLinks.map((link, index) => (
              <AnimatedNavLink key={link} link={link} index={index} />
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />

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
            className="absolute left-0 z-40 w-full font-mono bg-white shadow-md md:hidden dark:bg-gray-800 top-14"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link, index) => (
                <AnimatedNavLink
                  key={link}
                  link={link}
                  index={index}
                  onClick={handleLinkClick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
