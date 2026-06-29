import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import useDarkMode from "../../hooks/useDarkMode";
import DarkModeToggle from "../DarkModeToggle";
import HamburgerMenu from "../HamburgerMenu";

const navLinks = [
  { label: "About", number: "01", href: "#about" },
  { label: "Projects", number: "02", href: "#projects" },
  { label: "Stack", number: "03", href: "#skills" },
  { label: "Letters to the Editor", number: "04", href: "#contact" },
];

const AnimatedNavLink = ({ link, index, onClick }) => (
  <motion.a
    key={link.label}
    href={link.href}
    className="block border-b-2 border-transparent px-1 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-textSecondary-light transition hover:border-border-light hover:text-text-light dark:text-textSecondary-dark dark:hover:border-border-dark dark:hover:text-text-dark"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <span className="text-primary-light dark:text-primary-dark">{link.number}.</span>{" "}
    {link.label}
  </motion.a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useDarkMode();
  const issueDate = "June 2026";

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav
      className="fixed z-50 w-full border-b border-border-light/70 bg-background-light/95 font-mono backdrop-blur-sm transition-colors dark:border-border-dark/70 dark:bg-background-dark/95"
      aria-label="Main navigation"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex h-[4.15rem] items-center justify-between gap-3 sm:h-[4.6rem] sm:gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex min-w-0 items-center gap-3 sm:gap-4"
          >
            <div className="flex min-w-0 flex-col">
              <span className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                Volume 01 / Roman Shrestha
              </span>
              <a
                href="#about"
                className="truncate font-display text-[1.45rem] uppercase leading-none tracking-[-0.08em] text-text-light dark:text-text-dark sm:text-[2rem] lg:text-[2.35rem]"
              >
                Roman Review
              </a>
            </div>
            <span className="hidden h-10 w-px bg-border-light dark:bg-border-dark xl:block" />
            <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-textSecondary-light dark:text-textSecondary-dark xl:inline-flex">
              <CalendarDays className="h-3.5 w-3.5" />
              Issue {issueDate} / Helsinki Desk
            </span>
          </motion.div>

          <div className="hidden items-center xl:flex">
            <div className="mr-4 hidden font-mono text-[10px] uppercase tracking-[0.34em] text-textSecondary-light dark:text-textSecondary-dark xl:block">
              Table of Contents
            </div>
            <div className="flex items-center gap-3 lg:gap-4">
              {navLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <AnimatedNavLink link={link} index={index} />
                  {index < navLinks.length - 1 && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-textSecondary-light dark:text-textSecondary-dark">
                      {"//"}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
            <div className="xl:hidden">
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
            className="absolute left-0 top-[4.15rem] z-40 w-full border-b border-border-light bg-surface-light font-mono shadow-md dark:border-border-dark dark:bg-surface-dark xl:hidden sm:top-[4.6rem]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.34em] text-textSecondary-light dark:text-textSecondary-dark">
                Table of Contents
              </p>
              <div className="space-y-4">
                {navLinks.map((link, index) => (
                  <AnimatedNavLink
                    key={link.label}
                    link={link}
                    index={index}
                    onClick={handleLinkClick}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
