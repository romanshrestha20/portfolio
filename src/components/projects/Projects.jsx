import { useState } from "react";
import SectionHeader from "../common/SectionHeader";
import ProjectCard from "./ProjectCard";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";
import { projects } from "../../data/projects";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="section-frame bg-background-light py-16 text-text-light dark:bg-background-dark dark:text-text-dark"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <SectionHeader
          title="Project Archive"
          subtitle="A table of contents for the work: framed layouts, case-study reading, and narrow editorial columns instead of generic cards."
          number="02"
          eyebrow="Feature Index"
        />

        <div className="mb-8 flex flex-col gap-4 border-y-[4px] border-border-light py-4 dark:border-border-dark md:flex-row md:items-center md:justify-between">
          <p className="type-kicker text-primary-light dark:text-primary-dark">
            Table of Features
          </p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-textSecondary-light dark:text-textSecondary-dark">
            <span>{projects.length} archive entries</span>
            <span className="hidden h-4 w-px bg-border-light dark:bg-border-dark sm:block" />
            <span>Read by issue number</span>
          </div>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
