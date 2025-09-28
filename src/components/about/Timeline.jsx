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
      color: "bg-purple-500",
      glow: "rgba(168,85,247,0.7)",
    },
    {
      icon: <Laptop className="w-8 h-8 text-white" />,
      title: "Year 2",
      subtitle: "2024–2025",
      text: "Targeting first major internship and expanding skills.",
      color: "bg-blue-500",
      glow: "rgba(59,130,246,0.7)",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-white" />,
      title: "Year 3",
      subtitle: "2025–2026",
      text: "Advanced study and second internship aligned with goals.",
      color: "bg-green-500",
      glow: "rgba(34,197,94,0.7)",
    },
    {
      icon: <Rocket className="w-8 h-8 text-white" />,
      title: "Year 4",
      subtitle: "2026–2027",
      text: "Final year, graduation & traineeship applications.",
      color: "bg-teal-500",
      glow: "rgba(20,184,166,0.7)",
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
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader
          title="Timeline"
          subtitle="Here is a brief overview of my educational path."
        />
      </motion.div>

      {/* Container */}
      <div className="relative flex flex-col items-start w-full max-w-5xl mx-auto md:flex-row md:items-center">
        {/* Horizontal line (desktop) */}
        <div className="absolute left-0 hidden w-full h-1 bg-gray-300 md:block top-10 dark:bg-gray-600"></div>
        {/* Vertical line (mobile) */}
        <div className="absolute top-0 w-1 h-full bg-gray-300 md:hidden left-8 dark:bg-gray-600"></div>

        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center w-full mb-12 text-center md:w-1/4 md:text-center md:mb-0"
          >
            {/* Icon circle */}
            <div className="relative group">
              {/* Tooltip with dynamic color */}
              {event.current && (
                <span
                  className="absolute px-2 py-1 text-xs text-white transition -translate-x-1/2 rounded opacity-0 top-20 group-hover:opacity-100"
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
                className={`flex items-center justify-center w-16 h-16 rounded-full ${event.color}  relative z-10`}
              >
                {event.icon}
              </div>
            </div>

            {/* Title */}
            <h3
              className="mt-1 font-mono text-lg font-semibold dark:text-gray-300"
              style={{ color: event.current ? event.glow : event.color }}
            >
              {event.title}
            </h3>
            <p className="mt-2 font-mono text-lg text-gray-700 dark:text-gray-300">
              {event.subtitle}
            </p>
            <p className="mt-2 font-mono text-sm text-gray-500 dark:text-gray-400 max-w-[180px]">
              {event.text}
            </p>

            {/* Connecting dots for mobile */}
            {index !== timelineEvents.length - 1 && (
              <span className="absolute md:hidden top-16 left-[2.1rem] w-1 h-full bg-gray-300 dark:bg-gray-600"></span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
