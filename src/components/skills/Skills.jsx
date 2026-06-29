import { motion } from "framer-motion";
import {
  Boxes,
  Code2,
  Cpu,
  Layers3,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import SectionHeader from "../common/SectionHeader";

const bentoSkills = [
  {
    number: "03.1",
    title: "Frontend Systems",
    eyebrow: "Layout & Interaction",
    icon: MonitorSmartphone,
    copy:
      "React, JavaScript, and Tailwind work shaped around readable hierarchy, faster scanning, and interface rhythm that supports the content instead of burying it.",
    proof:
      "Built an editorial project archive, TOC navigation, and structured portfolio sections with stronger case-study framing.",
    pullQuote: "Clarity beats chrome when the work has to scan fast.",
    chips: ["React", "JavaScript", "Tailwind", "Framer Motion"],
    span: "lg:col-span-7 lg:row-span-2",
    featured: true,
  },
  {
    number: "03.2",
    title: "Backend Logic",
    eyebrow: "CRUD & Auth",
    icon: Boxes,
    copy:
      "Python and Django work focused on structured records, account flows, and application behavior that stays understandable once real states and edits appear.",
    proof:
      "Shipped blog and records-management projects with authentication, profiles, and core create-read-update-delete flows.",
    chips: ["Django", "Python", "CRUD", "Auth"],
    span: "lg:col-span-5",
  },
  {
    number: "03.3",
    title: "Mobile Range",
    eyebrow: "Android",
    icon: Cpu,
    copy:
      "Kotlin and Jetpack Compose work that adapts the same product thinking to smaller screens, service flows, and mobile navigation constraints.",
    proof:
      "Built Android UI around bookings, user management, and notification-driven service steps rather than isolated screens.",
    chips: ["Kotlin", "Compose", "Android"],
    span: "lg:col-span-4",
  },
  {
    number: "03.4",
    title: "Current Learning",
    eyebrow: "In Progress",
    icon: Sparkles,
    copy:
      "Pushing harder on product-level frontend structure, cleaner full-stack integration, and sharper project writing that explains decisions instead of just visuals.",
    proof:
      "Current portfolio work is focused on better case studies, stronger proof copy, and layouts that help recruiters scan quickly.",
    chips: ["Architecture", "UI Systems", "Case Studies"],
    span: "lg:col-span-4",
  },
  {
    number: "03.5",
    title: "Engineering Habits",
    eyebrow: "How I Work",
    icon: Layers3,
    copy:
      "I care about maintainable code, interfaces that scan quickly, and features that justify their complexity before they earn more UI.",
    proof:
      "Most refinements start with structure, naming, spacing, and usability before they move into polish or animation.",
    chips: ["Readable Code", "UX", "Refinement"],
    span: "lg:col-span-4",
  },
  {
    number: "03.6",
    title: "Tools I Reach For",
    eyebrow: "Utility Stack",
    icon: Code2,
    copy:
      "Git, GitHub, Linux, API workflows, and component-driven frontend building across web and mobile projects.",
    proof:
      "Daily workflow is built around version control, local iteration, practical debugging, and keeping delivery friction low.",
    chips: ["Git", "GitHub", "Linux", "APIs"],
    span: "lg:col-span-12",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="section-frame bg-background-light py-14 text-text-light dark:bg-background-dark dark:text-text-dark"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Skills Desk"
          subtitle="A bento-style read on the stack, habits, and areas I am actively sharpening."
          number="03"
          eyebrow="Stack Survey"
          className="mb-8 md:mb-10"
        />

        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <p className="type-kicker text-primary-light dark:text-primary-dark">
            Skill Spread
          </p>
          <p className="mt-3 text-base leading-7 text-textSecondary-light dark:text-textSecondary-dark">
            The cards below work like an editorial index: one lead story, a few supporting columns, and proof for where the stack actually shows up.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-1 gap-6 lg:auto-rows-[minmax(260px,auto)] lg:grid-cols-12"
        >
          {bentoSkills.map((item) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`${item.span} ${item.featured ? "relative" : ""} card-frame overflow-hidden bg-surface-light text-left shadow-[7px_7px_0_0_rgba(16,16,16,0.08)] dark:bg-surface-dark`}
              >
                {item.featured && (
                  <div className="pointer-events-none absolute right-2 top-12 font-display text-[6.5rem] leading-none tracking-[-0.08em] text-border-light/10 dark:text-border-dark/20 sm:right-4 sm:text-[9rem] lg:right-6 lg:top-16 lg:text-[12rem]">
                    {item.number}
                  </div>
                )}
                <div className="flex items-center justify-between border-b-[4px] border-border-light px-4 py-3 dark:border-border-dark">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="type-kicker text-primary-light dark:text-primary-dark">
                      {item.number}
                    </span>
                    <span className="h-4 w-px bg-border-light dark:bg-border-dark" />
                    <span className="type-byline text-textSecondary-light dark:text-textSecondary-dark">
                      {item.eyebrow}
                    </span>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center border-[3px] border-border-light text-primary-light dark:border-border-dark dark:text-primary-dark">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3
                    className={`type-display text-text-light dark:text-text-dark ${
                      item.featured ? "max-w-[10ch] text-4xl sm:text-6xl" : "text-3xl sm:text-4xl"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-base leading-7 text-textSecondary-light dark:text-textSecondary-dark">
                    {item.copy}
                  </p>
                  {item.featured && item.pullQuote && (
                    <div className="mt-6 max-w-xl border-l-[4px] border-primary-light pl-4 dark:border-primary-dark">
                      <p className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                        Pull Quote
                      </p>
                      <p className="mt-2 font-display text-2xl uppercase leading-[0.95] tracking-[-0.05em] text-text-light dark:text-text-dark sm:text-3xl">
                        {item.pullQuote}
                      </p>
                    </div>
                  )}
                </div>

                <div
                  className={`grid border-t-[4px] border-border-light dark:border-border-dark ${
                    item.span === "lg:col-span-12"
                      ? "lg:grid-cols-[0.8fr_1.2fr]"
                      : "sm:grid-cols-[0.9fr_1.1fr]"
                  }`}
                >
                  <div className="border-b-[3px] border-border-light p-5 dark:border-border-dark sm:border-b-0 sm:border-r-[3px]">
                    <p className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                      Proof
                    </p>
                    <p className="mt-3 font-mono text-[11px] uppercase leading-6 tracking-[0.18em] text-textSecondary-light dark:text-textSecondary-dark">
                      {item.proof}
                    </p>
                  </div>

                  <div className="p-5">
                    <p className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                      Stack
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.chips.map((chip) => (
                        <span
                          key={chip}
                          className="border border-border-light px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-textSecondary-light dark:border-border-dark dark:text-textSecondary-dark"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
