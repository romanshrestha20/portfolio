import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const fallbackImage = "/portfolio-preview.jpeg";

export default function ProjectCard({ project, onOpenCaseStudy }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
      className="overflow-hidden border-[4px] border-border-light bg-surface-light text-text-light shadow-[8px_8px_0_0_rgba(18,18,18,0.08)] dark:border-border-dark dark:bg-surface-dark dark:text-text-dark"
    >
      <div className="flex items-center justify-between border-b-[4px] border-border-light px-4 py-3 dark:border-border-dark">
        <div className="flex flex-wrap items-center gap-3">
          <span className="type-kicker text-primary-light dark:text-primary-dark">
            {project.issue}
          </span>
          <span className="h-4 w-px bg-border-light dark:bg-border-dark" />
          <span className="type-byline text-textSecondary-light dark:text-textSecondary-dark">
            Archive Entry
          </span>
        </div>

        <div className="hidden flex-wrap gap-2 sm:flex">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-border-light px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] dark:border-border-dark"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr]">
        <div className="border-b-[4px] border-border-light dark:border-border-dark lg:border-b-0 lg:border-r-[4px]">
          <img
            src={project.image}
            alt={project.name}
            className="h-full min-h-[220px] w-full object-cover"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = fallbackImage;
            }}
          />
        </div>

        <div className="flex flex-col">
          <div className="border-b-[4px] border-border-light p-4 dark:border-border-dark sm:p-6">
            <p className="type-kicker text-primary-light dark:text-primary-dark">
              {project.caseStudy.kicker}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                Pg. {project.issue}
              </span>
              <span className="hidden h-px w-10 bg-border-light dark:bg-border-dark sm:block" />
              <span className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                By Roman Shrestha
              </span>
            </div>
            <h3 className="type-display mt-3 text-[2.3rem] sm:text-[2.9rem]">
              {project.name}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-7 text-textSecondary-light dark:text-textSecondary-dark">
              {project.dek}
            </p>
          </div>

          <div className="grid border-b-[4px] border-border-light sm:grid-cols-3 dark:border-border-dark">
            {project.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={`px-5 py-4 ${
                  index < project.facts.length - 1
                    ? "border-b-[3px] border-border-light sm:border-b-0 sm:border-r-[3px] dark:border-border-dark"
                    : ""
                }`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-textSecondary-light dark:text-textSecondary-dark">
                  {fact.label}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.02em]">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <button
              type="button"
              onClick={() => onOpenCaseStudy(project)}
              className="inline-flex items-center justify-center gap-2 border-[3px] border-border-light bg-primary-light px-5 py-3 font-mono text-[10px] uppercase tracking-[0.26em] text-surface-light hover:translate-x-1 dark:border-border-dark dark:bg-primary-dark dark:text-background-dark"
            >
              Read case study
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="flex flex-wrap gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 border-[3px] border-border-light px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] hover:bg-surface-light/40 dark:border-border-dark sm:w-auto"
                >
                  Live
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.links.code && (
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 border-[3px] border-border-light px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] hover:bg-surface-light/40 dark:border-border-dark sm:w-auto"
                >
                  Code
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
