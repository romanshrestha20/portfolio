import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, BriefcaseBusiness, Code2, Compass, Newspaper } from "lucide-react";

import SectionHeader from "../common/SectionHeader";
import SocialLinks from "./SocialLinks";
import AboutText from "./AboutText";
import ProfileCard from "./ProfileCard";
import Timeline from "./Timeline";

const features = [
  {
    icon: BriefcaseBusiness,
    label: "Current Focus",
    title: "Internships and junior software roles.",
    copy:
      "Looking for real product environments where I can ship, learn, and get stronger at frontend and full-stack engineering.",
    span: "lg:col-span-4",
  },
  {
    icon: Code2,
    label: "Working Stack",
    title: "React, Django, Python, JavaScript, Kotlin.",
    copy:
      "Most of my recent work combines interface design, CRUD backend logic, API integration, and practical case-study thinking.",
    span: "lg:col-span-4",
  },
  {
    icon: Compass,
    label: "Outside Code",
    title: "Football, travel, and team environments.",
    copy:
      "I like work that mixes technical craft with momentum, collaboration, and a strong sense of progress.",
    span: "lg:col-span-4",
  },
];

const cardClass =
  "card-frame rounded-[24px] bg-surface-light p-4 shadow-sm dark:bg-surface-dark sm:rounded-[30px] sm:p-6";

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
      className="section-frame w-full bg-background-light py-16 text-text-light dark:bg-background-dark dark:text-text-dark md:py-18"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="About Me"
            subtitle="A personal feature spread about my work, direction, and the kind of engineering I want to keep growing into."
            number="01"
            eyebrow="Cover Feature"
            className="mb-8 md:mb-10"
          />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`${cardClass} lg:col-span-4`}
          >
            <ProfileCard />
            <div className="mt-6">
              <p className="type-byline text-textSecondary-light dark:text-textSecondary-dark">
                Social Desk
              </p>
              <div className="mt-4">
                <SocialLinks />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`${cardClass} relative overflow-hidden lg:col-span-8`}
          >
            <div className="absolute right-5 top-5 hidden rounded-full border-[3px] border-border-light px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-textSecondary-light dark:border-border-dark dark:text-textSecondary-dark sm:block">
              Vol. 01
            </div>
            <p className="type-kicker text-primary-light dark:text-primary-dark">
              Cover Story
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                By Roman Shrestha
              </span>
              <span className="hidden h-px w-10 bg-border-light dark:bg-border-dark sm:block" />
              <span className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                Software Engineering Student
              </span>
            </div>
            <h3 className="type-display mt-4 max-w-4xl text-4xl text-text-light dark:text-text-dark sm:text-6xl lg:text-7xl">
              Building software with an editorial eye for structure.
            </h3>
            <div className="mt-6 max-w-3xl">
              <AboutText />
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className={`${cardClass} ${feature.span}`}
              >
                <div className="inline-flex rounded-full border border-border-light p-3 text-primary-light dark:border-border-dark dark:text-primary-dark">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="type-byline mt-5 text-textSecondary-light dark:text-textSecondary-dark">
                  {feature.label}
                </p>
                <h4 className="type-display mt-3 text-3xl text-text-light dark:text-text-dark">
                  {feature.title}
                </h4>
                <p className="mt-4 text-base leading-7 text-textSecondary-light dark:text-textSecondary-dark">
                  {feature.copy}
                </p>
              </motion.article>
            );
          })}

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className={`${cardClass} lg:col-span-12`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="type-kicker text-primary-light dark:text-primary-dark">
                  Editorial Note
                </p>
                <h4 className="type-display mt-3 text-3xl text-text-light dark:text-text-dark">
                  I care about code that reads clearly and interfaces that scan quickly.
                </h4>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border-[3px] border-border-light px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-textSecondary-light dark:border-border-dark dark:text-textSecondary-dark">
                <Newspaper className="h-4 w-4" />
                Layout Meets Engineering
              </div>
            </div>
          </motion.article>
        </div>

        <Timeline />

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
