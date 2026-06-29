import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="flex flex-col items-start">
      <motion.div
        whileHover={{ y: -4 }}
        className="card-frame relative mb-6 h-[15.5rem] w-full overflow-hidden rounded-[28px] bg-surface-light shadow-md dark:bg-surface-dark sm:h-[18rem] lg:h-[20rem]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.75),transparent_42%),linear-gradient(135deg,rgba(245,239,223,0.96),rgba(229,221,204,0.92))] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),linear-gradient(135deg,rgba(36,37,42,1),rgba(27,28,31,1))]" />
        <motion.img
          src="/profile-portrait.png"
          alt="Roman Shrestha portrait"
          loading="eager"
          className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[90%] w-auto max-w-[88%] object-contain object-center saturate-[1.03] contrast-[1.02] transition-transform duration-300 hover:scale-[1.02] sm:h-[88%] lg:h-[85%]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-light via-surface-light/30 to-transparent dark:from-surface-dark dark:via-surface-dark/20" />
        <div className="absolute left-4 top-4 rounded-full bg-background-light/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-text-light shadow-sm dark:bg-background-dark/90 dark:text-text-dark">
          Editorial Profile
        </div>
      </motion.div>

      <div className="flex flex-col w-full gap-3 sm:flex-row">
        <a
          href="https://tinyurl.com/ycyjhkbk"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary-light px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white sm:w-auto"
          aria-label="Download CV"
        >
          <Download className="w-4 h-4" />
          <span>Download CV</span>
        </a>
        <a
          href="mailto:stha.roman20@outlook.com"
          className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-border-light px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-light dark:border-border-dark dark:text-text-dark sm:w-auto"
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </a>
      </div>
    </div>
  );
}
