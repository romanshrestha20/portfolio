import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import {  ArrowDown } from "lucide-react";

import SectionHeader from "../common/SectionHeader"; // Importing a common section header component
import SocialLinks from "./SocialLinks";
import AboutText from "./AboutText"; // Importing a component for the about text
import ProfileCard from "./ProfileCard"; // Importing a component for the profile card
export default function About() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Scroll to the top of the element
        inline: "nearest", // Scroll horizontally to the nearest edge
      });
    }
  };

  return (
    <section
      id="about"
      className="py-20 bg-background dark:bg-gray-900 text-gray-900 w-full dark:text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader title="About Me" subtitle="Get to know me better 🌟" />
        </motion.div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left Section: Profile Image and CV Download */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center w-full md:w-1/3 max-w-sm"
          >

            {/* Profile Image */}
          <ProfileCard />  
            {/* Social Links */}
          <SocialLinks/>
          </motion.div>

          {/* Right Section: About Text */}
          <AboutText />
        </div>

        {/* Arrow Animation */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-16 text-center"
          onClick={scrollToProjects}
        >
          <ArrowDown className="mx-auto text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-all" />
        </motion.div>
      </div>
    </section>
  );
}
