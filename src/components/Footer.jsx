import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                    <a href="/privacy-policy" className="text-sm hover:text-gray-400 transition-all">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="text-sm hover:text-gray-400 transition-all">
                        Terms of Service
                    </a>
                </div>
                <p className="text-center text-sm md:text-base">© {new Date().getFullYear()} Roman. All rights reserved.</p>
                <div className="flex items-center space-x-6">
                    <a
                        href="https://www.linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg hover:text-blue-500 flex items-center space-x-2 transition-all"
                    >
                        <FaLinkedin className="h-6 w-6" />
                        <span>LinkedIn</span>
                    </a>
                    <a
                        href="mailto:your.email@example.com"
                        className="text-lg hover:text-red-500 flex items-center space-x-2 transition-all"
                    >
                        <FaEnvelope className="h-6 w-6" />
                        <span>Email</span>
                    </a>
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg hover:text-gray-400 flex items-center space-x-2 transition-all"
                    >
                        <FaGithub className="h-6 w-6" />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
