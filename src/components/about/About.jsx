"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const facts = [
  ["Based", "Helsinki, Finland"],
  ["Study", "Software Engineering · 2023—2027"],
  ["Focus", "Frontend and full-stack product work"],
  ["Outside code", "Football, travel, strong team environments"],
];

export default function About() {
  return (
    <section id="about" className="signal-section bg-signal-surface">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <p className="signal-kicker">02 / Personnel archive</p>
          <h2 className="mt-5 text-5xl leading-[.92] tracking-[-.06em] text-signal-text sm:text-7xl">Curious by nature.<br /><em className="text-signal">Practical by design.</em></h2>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} className="lg:col-span-7 lg:col-start-6">
          <p className="max-w-3xl text-2xl leading-snug tracking-[-.03em] text-signal-text sm:text-4xl">
            I’m Roman, a software engineering student who likes turning complex flows into products that feel direct and dependable.
          </p>
          <p className="max-w-2xl text-base leading-8 mt-7 text-signal-muted sm:text-lg">
            My recent work spans React interfaces, Django backends, API-driven products, and mobile applications. I care about readable code, calm interfaces, and understanding the reason behind every feature I build.
          </p>

          <dl className="mt-12 border-t border-signal-line">
            {facts.map(([term, detail]) => (
              <div key={term} className="grid gap-2 border-b border-signal-line py-5 sm:grid-cols-[150px_1fr]">
                <dt className="font-mono text-[10px] uppercase tracking-[.18em] text-signal">{term}</dt>
                <dd className="text-sm text-signal-text sm:text-base">{detail}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href="https://www.linkedin.com/in/romanshrr/" target="_blank" rel="noreferrer" className="signal-button">
            LinkedIn <ArrowUpRight className="w-4 h-4" /></a>
            <a href="https://github.com/romanshrestha20" target="_blank" rel="noreferrer" className="signal-button">GitHub <ArrowUpRight className="w-4 h-4" /></a>
            <span className="inline-flex items-center gap-2 px-3 text-xs text-signal-muted">
              <MapPin className="w-4 h-4 text-signal" /> 60.1699° N, 24.9384° E</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
