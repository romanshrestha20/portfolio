import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, MapPin } from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="signal-hero relative min-h-[100svh] overflow-hidden">
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />
      <div className="signal-grid" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1600px] grid-cols-1 items-end px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pb-12 lg:pt-32">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: reduceMotion ? 0 : 0.1 }}
          className="relative z-20 lg:col-span-8"
        >
          <motion.div variants={reveal} className="signal-label mb-6 flex items-center gap-3">
            <span className="signal-pulse" />
            Available for internships and junior roles
          </motion.div>

          <motion.p variants={reveal} className="mb-3 text-base font-medium text-signal-muted sm:text-lg">
            Roman Shrestha · Software Engineering
          </motion.p>
          <motion.h1 variants={reveal} className="max-w-[11ch] text-[clamp(4.5rem,13vw,11rem)] font-semibold leading-[0.78] tracking-[-0.085em] text-signal-text">
            BUILDING<br />USEFUL<br /><span className="text-signal">SIGNALS.</span>
          </motion.h1>
          <motion.p variants={reveal} className="mt-7 max-w-xl text-lg leading-relaxed text-signal-muted sm:text-xl">
            I design and build clear web and mobile products with React, Django, and a practical product mindset.
          </motion.p>
          <motion.div variants={reveal} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="signal-button signal-button-primary">
              Explore selected work <ArrowDownRight className="h-4 w-4" />
            </a>
            <a href="https://tinyurl.com/ycyjhkbk" target="_blank" rel="noreferrer" className="signal-button">
              Open résumé <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mt-14 h-[48vh] min-h-[360px] lg:col-span-4 lg:mt-0 lg:h-[70vh]"
        >
          <div className="portrait-orbit" aria-hidden="true" />
          <div className="portrait-glow" aria-hidden="true" />
          <img
            src="/profile-portrait.png"
            alt="Roman Shrestha"
            className="absolute bottom-0 left-1/2 z-10 h-full w-auto max-w-none -translate-x-1/2 object-contain grayscale-[18%]"
          />
          <div className="absolute bottom-3 left-0 z-20 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-signal-text lg:-left-12">
            <MapPin className="h-4 w-4 text-signal" /> Helsinki, Finland
          </div>
        </motion.div>

        <div className="absolute bottom-8 right-5 hidden rotate-90 items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-signal-muted xl:flex">
          Scroll to follow the signal <span className="h-px w-16 bg-signal/70" />
        </div>
      </div>
    </section>
  );
}
