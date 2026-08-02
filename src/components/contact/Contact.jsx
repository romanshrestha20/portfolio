"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import ContactForm from "./ContactForm";

export default function Contact({
  name = "Roman Shrestha",
  email = "stha.roman20@outlook.com",
  linkedinUrl = "https://www.linkedin.com/in/romanshrr/",
  prompt = "Have a role, collaboration, or product idea in mind?",
  responseTime = "Send a short note. I usually respond within a couple of days.",
}) {
  return (
    <section id="contact" className="signal-section overflow-hidden bg-signal-surface">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative border-b border-signal-line pb-14">
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-signal/10 blur-3xl" aria-hidden="true" />
          <p className="signal-kicker">04 / Open transmission channel</p>
          <h2 className="mt-6 max-w-[12ch] text-[clamp(4rem,11vw,10rem)] leading-[.8] tracking-[-.08em] text-signal-text">Send a<br /><em className="text-signal">new signal.</em></h2>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={`mailto:${email}`} className="signal-button signal-button-primary"><Mail className="h-4 w-4" /> Email {name.split(" ")[0]}</a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="signal-button">Connect on LinkedIn <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </motion.div>

        <div className="grid gap-12 py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-2xl font-medium leading-snug tracking-[-.03em] text-signal-text">{prompt}</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-signal-muted">{responseTime}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6"><ContactForm /></div>
        </div>
      </div>
    </section>
  );
}
