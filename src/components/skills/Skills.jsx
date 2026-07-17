"use client";

import { motion } from "framer-motion";

const capabilities = [
  { number: "01", title: "Frontend", copy: "Interfaces with readable hierarchy, responsive behavior, and purposeful interaction.", tools: ["React", "JavaScript", "Tailwind", "Framer Motion"] },
  { number: "02", title: "Backend", copy: "Structured application logic for authentication, records, APIs, and real product states.", tools: ["Django", "Python", "Express", "Prisma"] },
  { number: "03", title: "Mobile", copy: "Service flows and reusable interfaces designed for smaller screens and mobile context.", tools: ["Expo", "React Native", "Kotlin", "Jetpack Compose"] },
  { number: "04", title: "Workflow", copy: "Practical iteration through version control, debugging, API integration, and team delivery.", tools: ["Git", "GitHub", "Linux", "REST APIs"] },
];

export default function Skills() {
  return (
    <section id="skills" className="signal-section bg-signal-bg">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="signal-kicker">03 / Systems capability index</p>
            <h2 className="mt-5 text-6xl leading-[.88] tracking-[-.065em] text-signal-text sm:text-8xl">Field<br /><em className="text-signal">equipment.</em></h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-signal-muted">A compact view of what I use—and the kind of problems I use it for.</p>
          </div>

          <div className="border-t border-signal-line lg:col-span-7 lg:col-start-6">
            {capabilities.map((item, index) => (
              <motion.article key={item.title} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="group grid gap-4 border-b border-signal-line py-8 sm:grid-cols-[50px_1fr]">
                <span className="font-mono text-[10px] text-signal">{item.number}</span>
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-.045em] text-signal-text sm:text-5xl">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-signal-muted sm:text-base">{item.copy}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">{item.tools.map((tool) => <span key={tool} className="font-mono text-[10px] uppercase tracking-[.14em] text-signal-muted transition group-hover:text-signal-text">{tool}</span>)}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
