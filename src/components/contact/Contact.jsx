import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="signal-section overflow-hidden bg-signal-surface">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative border-b border-signal-line pb-14">
          <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-signal/10 blur-3xl" aria-hidden="true" />
          <p className="signal-kicker">04 · Open channel</p>
          <h2 className="mt-6 max-w-[12ch] text-[clamp(4rem,11vw,10rem)] font-semibold leading-[.8] tracking-[-.08em] text-signal-text">LET’S MAKE<br /><span className="text-signal">SOMETHING REAL.</span></h2>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="mailto:stha.roman20@outlook.com" className="signal-button signal-button-primary"><Mail className="h-4 w-4" /> Email Roman</a>
            <a href="https://www.linkedin.com/in/romanshrr/" target="_blank" rel="noreferrer" className="signal-button">Connect on LinkedIn <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </motion.div>

        <div className="grid gap-12 py-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-2xl font-medium leading-snug tracking-[-.03em] text-signal-text">Have a role, collaboration, or product idea in mind?</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-signal-muted">Send a short note. I usually respond within a couple of days.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6"><ContactForm /></div>
        </div>
      </div>
    </section>
  );
}
