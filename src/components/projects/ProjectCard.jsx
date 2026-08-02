"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project, index }) {
  const projectHref = `/projects/${project.slug ?? project.id}`;

  return (
    <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} className="project-row grid gap-7 border-t border-signal-line py-12 lg:grid-cols-12 lg:gap-12 lg:py-20">
      <div className={`project-media relative aspect-[16/11] lg:col-span-7 ${index % 2 ? "lg:order-2" : ""}`}>
        <Image src={project.image} alt={`${project.name} interface`} fill sizes="(max-width: 1023px) 100vw, 58vw" className="object-cover" />
        <span className="absolute left-4 top-4 z-20 bg-signal px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-[.16em] text-signal-bg">CASE FILE / 0{index + 1}</span>
      </div>

      <div className={`flex flex-col justify-between lg:col-span-5 ${index % 2 ? "lg:order-1" : ""}`}>
        <div>
          <p className="signal-kicker">{project.caseStudy.kicker}</p>
          <h3 className="mt-4 text-5xl font-semibold leading-[.88] tracking-[-.06em] text-signal-text sm:text-7xl">{project.name}</h3>
          <p className="mt-6 max-w-xl text-base leading-7 text-signal-muted sm:text-lg">{project.dek}</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {project.tags.map((tag) => <span key={tag} className="font-mono text-[10px] uppercase tracking-[.16em] text-signal-muted">{tag}</span>)}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={projectHref} className="signal-button signal-button-primary">Read case study <ArrowUpRight className="h-4 w-4" /></Link>
          {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="signal-button">Live site <ArrowUpRight className="h-4 w-4" /></a>}
          {project.links.code && <a href={project.links.code} target="_blank" rel="noreferrer" className="signal-button" aria-label={`${project.name} source code`}><Github className="h-4 w-4" /></a>}
        </div>
      </div>
    </motion.article>
  );
}
