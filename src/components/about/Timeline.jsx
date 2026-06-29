import { motion } from "framer-motion";
import { GraduationCap, Laptop, Briefcase, Rocket } from "lucide-react";
import SectionHeader from "../common/SectionHeader";

export default function Timeline() {
  // --- 1. Detect current academic year automatically ---
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 1–12

  // Academic year runs Aug → Jul
  let currentAcademicYearStart = year;
  if (month < 8) currentAcademicYearStart = year - 1;
  const currentAcademicYearEnd = currentAcademicYearStart + 1;
  const currentSubtitle = `${currentAcademicYearStart}–${currentAcademicYearEnd}`;

  // --- 2. Timeline data ---
  const rawTimelineEvents = [
    {
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      title: "Year 1",
      subtitle: "2023–2024",
      text: "Foundations & coursework in software engineering.",
      colorClass: "bg-accent-light dark:bg-accent-dark",
      colorHex: "#F9A825",
      glow: "rgba(249,168,37,0.7)",
    },
    {
      icon: <Laptop className="w-8 h-8 text-white" />,
      title: "Year 2",
      subtitle: "2024–2025",
      text: "Targeting first major internship and expanding skills.",
      colorClass: "bg-primary-light dark:bg-primary-dark",
      colorHex: "#1A73E8",
      glow: "rgba(26,115,232,0.7)",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-white" />,
      title: "Year 3",
      subtitle: "2025–2026",
      text: "Advanced study and second internship aligned with goals.",
      colorClass: "bg-success-light dark:bg-success-dark",
      colorHex: "#16A34A",
      glow: "rgba(22,163,74,0.7)",
    },
    {
      icon: <Rocket className="w-8 h-8 text-white" />,
      title: "Year 4",
      subtitle: "2026–2027",
      text: "Final year, graduation & traineeship applications.",
      colorClass: "bg-info-light dark:bg-info-dark",
      colorHex: "#0284C7",
      glow: "rgba(2,132,199,0.7)",
    },
  ];

  // Automatically mark current year
  const timelineEvents = rawTimelineEvents.map((event) => ({
    ...event,
    current: event.subtitle === currentSubtitle,
  }));

  // --- 3. Render ---
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader
          title="Timeline"
          subtitle="Here is a brief overview of my educational path."
          eyebrow="Academic Track"
        />
      </motion.div>

      {/* Container */}
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-start md:flex-row md:items-center">
        {/* Horizontal line (desktop) */}
        <div className="absolute left-0 hidden w-full h-1 bg-border-light md:block top-10 dark:bg-border-dark"></div>
        {/* Vertical line (mobile) */}
        <div className="absolute top-0 w-1 h-full bg-border-light md:hidden left-8 dark:bg-border-dark"></div>

        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className="relative mb-12 flex w-full flex-col items-start pl-20 text-left md:mb-0 md:w-1/4 md:items-center md:pl-0 md:text-center"
          >
            {/* Icon circle */}
            <div className="relative group">
              {/* Tooltip with dynamic color */}
              {event.current && (
                <span
                  className="absolute top-20 rounded px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 md:-translate-x-1/2"
                  style={{
                    backgroundColor: event.glow,
                  }}
                >
                  Current Academic Year
                </span>
              )}

              {/* Border-only glow (dynamic color) */}
              {event.current && (
                <motion.div
                  className="absolute border-4 rounded-full -inset-1"
                  style={{
                    borderColor: event.glow,
                    boxShadow: `0 0 15px 4px ${event.glow}`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 10px 2px ${event.glow}`,
                      `0 0 20px 6px ${event.glow}`,
                      `0 0 10px 2px ${event.glow}`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Icon circle */}
              <div
                className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full ${event.colorClass}`}
              >
                {event.icon}
              </div>
            </div>

            {/* Title */}
            <h3
              className="mt-2 font-display text-3xl uppercase tracking-[-0.05em] text-text-dark dark:text-text-dark"
              style={{ color: event.current ? event.glow : event.colorHex }}
            >
              {event.title}
            </h3>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-textSecondary-light dark:text-textSecondary-dark">
              {event.subtitle}
            </p>
            <p className="mt-3 max-w-[180px] font-mono text-[11px] uppercase tracking-[0.18em] text-textSecondary-light dark:text-textSecondary-dark">
              {event.text}
            </p>

            {/* Connecting dots for mobile */}
            {index !== timelineEvents.length - 1 && (
              <span className="absolute left-[2.1rem] top-16 h-full w-1 bg-border-light dark:bg-border-dark md:hidden"></span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
