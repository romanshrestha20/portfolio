import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

import SectionHeader from "../common/SectionHeader";
import SocialLinks from "./SocialLinks";
import AboutText from "./AboutText";
import ProfileCard from "./ProfileCard";
import Timeline from "./Timeline";

export default function About() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="about"
      className="w-full py-20 text-text-light bg-background-light dark:bg-background-dark dark:text-text-dark"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader title="About Me" subtitle="Get to know me better 🌟" />
        </motion.div>

        {/* Main Content Section */}
        <div className="flex flex-col items-center gap-16 md:flex-row">
          {/* Left Section: Profile Image and CV Download */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center w-full max-w-sm md:w-1/3"
          >
            <ProfileCard />
            <SocialLinks />
          </motion.div>

          {/* Right Section: About Text */}
          <AboutText />
        </div>

        {/* Timeline Section */}
        <Timeline />

        {/* Arrow Animation */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-16 text-center cursor-pointer"
          onClick={scrollToProjects}
        >
          <ArrowDown className="mx-auto transition-all text-textSecondary-light hover:text-text-light dark:text-textSecondary-dark dark:hover:text-text-dark" />
        </motion.div>
      </div>
    </section>
  );
}
