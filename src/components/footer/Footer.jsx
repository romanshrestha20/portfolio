import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-surface-dark py-6 text-text-dark dark:bg-background-dark dark:text-text-dark">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        {/* Privacy and Terms Links */}
        <div className="ml-6 flex items-center space-x-4">
          <a
            href="/privacy-policy"
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-textSecondary-dark transition-all hover:text-text-dark dark:text-textSecondary-dark dark:hover:text-text-dark"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-textSecondary-dark transition-all hover:text-text-dark dark:text-textSecondary-dark dark:hover:text-text-dark"
          >
            Terms of Service
          </a>
        </div>

        {/* Copyright Info */}
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-textSecondary-dark">
            Page 99 / Closing Notes
          </p>
          <p className="mt-2 font-display text-2xl uppercase tracking-[-0.05em] text-text-dark dark:text-text-dark">
            © {new Date().getFullYear()} Roman
          </p>
        </div>

        {/* Social Media Links */}
        <div className="mr-7 flex items-center space-x-6">
          <a
            href="https://www.linkedin.com/in/romanshrr/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-lg transition-all text-text-dark hover:text-primary-light dark:text-text-dark dark:hover:text-primary-dark"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:stha.roman20@outlook.com"
            className="flex items-center space-x-2 text-lg transition-all text-text-dark hover:text-danger-light dark:text-text-dark dark:hover:text-danger-dark"
          >
            <FaEnvelope className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/romanshrestha20"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-lg transition-all text-text-dark hover:text-textSecondary-dark dark:text-text-dark dark:hover:text-textSecondary-dark"
          >
            <FaGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
