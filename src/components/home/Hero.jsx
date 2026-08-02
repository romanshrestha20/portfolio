"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero({
  profileImageUrl = "/profile-portrait.png",
  profileImageAlt = "Roman Shrestha",
  resumeUrl = "https://tinyurl.com/ycyjhkbk",
  name = "Roman Shrestha",
  role = "Software Engineer",
  location = "Helsinki, Finland",
  availability = "Available for internship",
  intro = "Full-stack web and mobile products—engineered for clear flows, dependable systems, and actual people.",
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="signal-hero relative min-h-[100svh] overflow-hidden">
      <div className="studio-scribble" aria-hidden="true">ARCHIVE / 2026 / HEL</div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-1 items-end px-5 pb-6 pt-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pb-12 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: reduceMotion ? 0 : 0.1 }}
          className="relative z-20 lg:col-span-7 lg:pb-5 lg:pr-12"
        >
          <motion.div variants={reveal} className="signal-label mb-7 flex items-center gap-3 text-signal">
            <span className="studio-mark">●</span>
            [VARIANT STATUS: UNPRUNED / {availability}]
          </motion.div>

          <motion.p variants={reveal} className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-signal-muted sm:text-sm">
            {name} / {role} / {location}
          </motion.p>
          <motion.h1 variants={reveal} className="studio-hero-title max-w-[9ch] text-[clamp(3.6rem,15vw,6rem)] leading-[0.82] tracking-[-0.065em] text-signal-text lg:text-[clamp(5rem,8vw,9rem)]">
            Building<br /><span className="studio-italic">useful signals.</span>
          </motion.h1>
          <motion.p variants={reveal} className="mt-7 max-w-xl text-sm leading-7 text-signal-muted sm:text-base">
            {intro}
          </motion.p>
          <motion.div variants={reveal} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="signal-button signal-button-primary">
              See selected work <ArrowDownRight className="h-4 w-4" />
            </a>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="signal-button">
              Open résumé <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="timeline-monitor relative mt-12 h-[38vh] min-h-[290px] lg:col-span-5 lg:mt-0 lg:h-[68vh]"
        >
          <div className="absolute inset-[13px] z-10">
            <Image
              src={profileImageUrl}
              alt={profileImageAlt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="portrait-image"
            />
          </div>
          <span className="monitor-corner left-3 top-3 border-l border-t" aria-hidden="true" />
          <span className="monitor-corner right-3 top-3 border-r border-t" aria-hidden="true" />
          <span className="monitor-corner bottom-3 right-3 border-b border-r" aria-hidden="true" />
          <div className="absolute right-6 top-6 z-30 flex items-center gap-2 bg-signal-bg px-2 py-1 text-[8px] font-bold uppercase tracking-[.16em] text-signal">
            <span className="studio-mark">●</span> Signal stable
          </div>
        </motion.div>

        <div className="absolute bottom-5 right-5 hidden items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-signal-muted xl:flex">
          Timeline continues <span className="h-px w-16 bg-signal/70" /> ↓
        </div>
      </div>
    </section>
  );
}
