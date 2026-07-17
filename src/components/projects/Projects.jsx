"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectCaseStudyModal from "./ProjectCaseStudyModal";

export default function Projects({ projects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const featured = projects.slice(0, 3);
  const archive = projects.slice(3);

  return (
    <section id="projects" className="signal-section bg-signal-bg">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="mb-16 grid gap-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="signal-kicker">01 / Timeline monitor / selected work</p>
            <h2 className="mt-5 text-[clamp(3.8rem,9vw,8.5rem)] leading-[.82] tracking-[-.075em] text-signal-text">Recorded<br /><em className="text-signal">transmissions.</em></h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-signal-muted lg:col-span-4 lg:pb-2">Three product builds where interface, backend logic, and real user flows had to resolve into one dependable system.</p>
        </div>

        <div>
          {featured.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpenCaseStudy={setSelectedProject} />)}
        </div>

        {archive.length > 0 && (
          <div className="mt-20">
            <p className="signal-kicker mb-6">More from the studio</p>
            <div className="border-t border-signal-line">
              {archive.map((project) => (
                <button key={project.id} type="button" onClick={() => setSelectedProject(project)} className="group grid w-full gap-3 border-b border-signal-line py-6 text-left transition hover:pl-3 sm:grid-cols-[1fr_1fr_auto] sm:items-center">
                  <span className="text-2xl font-semibold tracking-[-.04em] text-signal-text">{project.name}</span>
                  <span className="text-sm text-signal-muted">{project.tags.join(" · ")}</span>
                  <ArrowUpRight className="h-5 w-5 text-signal transition group-hover:rotate-45" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <ProjectCaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
