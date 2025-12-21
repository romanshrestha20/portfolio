import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-6 text-text-dark bg-surface-dark dark:bg-background-dark dark:text-text-dark">
      <div className="container flex flex-col items-center justify-between mx-auto space-y-4 md:flex-row md:space-y-0">
        {/* Privacy and Terms Links */}
        <div className="flex items-center ml-6 space-x-4">
          <a
            href="/privacy-policy"
            className="text-sm transition-all text-textSecondary-dark hover:text-text-dark dark:text-textSecondary-dark dark:hover:text-text-dark"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-sm transition-all text-textSecondary-dark hover:text-text-dark dark:text-textSecondary-dark dark:hover:text-text-dark"
          >
            Terms of Service
          </a>
        </div>

        {/* Copyright Info */}
        <p className="font-mono text-sm text-center md:text-base text-text-dark dark:text-text-dark">
          © {new Date().getFullYear()} Roman. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex items-center space-x-6 mr-7">
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
