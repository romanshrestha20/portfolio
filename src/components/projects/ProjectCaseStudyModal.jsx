import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FileText, Github, X } from "lucide-react";

const fallbackImage = "/portfolio-preview.jpeg";

export default function ProjectCaseStudyModal({ project, onClose }) {
  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-text-light/75 px-4 py-6 backdrop-blur-sm dark:bg-black/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="max-h-[92vh] w-full max-w-6xl overflow-hidden border-[4px] border-border-light bg-surface-light text-text-light shadow-[10px_10px_0_0_rgba(18,18,18,0.12)] dark:border-border-dark dark:bg-surface-dark dark:text-text-dark"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-[4px] border-border-light px-4 py-3 dark:border-border-dark sm:px-5">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="type-kicker text-primary-light dark:text-primary-dark">
                  Issue {project.issue}
                </span>
                <span className="hidden h-5 w-px bg-border-light dark:bg-border-dark sm:block" />
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-textSecondary-light dark:text-textSecondary-dark sm:block">
                  {project.caseStudy.kicker}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center border-[3px] border-border-light text-text-light hover:bg-primary-light hover:text-surface-light dark:border-border-dark dark:text-text-dark dark:hover:bg-primary-dark dark:hover:text-background-dark"
                aria-label="Close case study"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(92vh-72px)] overflow-y-auto">
              <div className="grid border-b-[4px] border-border-light lg:grid-cols-[1.05fr_0.95fr] dark:border-border-dark">
                <div className="border-b-[4px] border-border-light dark:border-border-dark lg:border-b-0 lg:border-r-[4px]">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full min-h-[280px] w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>

                <div className="p-5 sm:p-8">
                  <p className="type-kicker text-primary-light dark:text-primary-dark">
                    Project File
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                      Pg. {project.issue}
                    </span>
                    <span className="hidden h-px w-10 bg-border-light dark:bg-border-dark sm:block" />
                    <span className="type-page text-textSecondary-light dark:text-textSecondary-dark">
                      By Roman Shrestha
                    </span>
                  </div>
                  <h3 className="type-display mt-4 max-w-3xl text-4xl text-text-light dark:text-text-dark sm:text-6xl">
                    {project.caseStudy.headline}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-textSecondary-light dark:text-textSecondary-dark">
                    {project.dek}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-[3px] border-border-light px-3 py-2 font-mono text-[10px] uppercase tracking-[0.24em] dark:border-border-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid border-b-[4px] border-border-light sm:grid-cols-3 dark:border-border-dark">
                {project.facts.map((fact, index) => (
                  <div
                    key={fact.label}
                    className={`p-5 ${
                      index < project.facts.length - 1
                        ? "border-b-[3px] border-border-light sm:border-b-0 sm:border-r-[3px] dark:border-border-dark"
                        : ""
                    }`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-textSecondary-light dark:text-textSecondary-dark">
                      {fact.label}
                    </p>
                    <p className="type-display mt-2 text-2xl text-text-light dark:text-text-dark">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-0 lg:grid-cols-[1.45fr_0.55fr]">
                <div className="border-b-[4px] border-border-light p-6 dark:border-border-dark lg:border-b-0 lg:border-r-[4px] lg:p-8">
                  <div className="flex items-center gap-3 border-b-[3px] border-border-light pb-4 dark:border-border-dark">
                    <FileText className="h-5 w-5 text-primary-light dark:text-primary-dark" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-textSecondary-light dark:text-textSecondary-dark">
                      Editorial Copy
                    </p>
                  </div>
                  <div className="editorial-columns mt-6">
                    {project.caseStudy.sections.map((section) => (
                      <p
                        key={section.slice(0, 36)}
                        className="mb-5 break-inside-avoid text-[1.02rem] leading-8 text-textSecondary-light dark:text-textSecondary-dark"
                      >
                        {section}
                      </p>
                    ))}
                  </div>
                </div>

                <aside className="p-6 lg:p-8">
                  <div className="border-[3px] border-border-light p-5 dark:border-border-dark">
                    <p className="type-kicker text-primary-light dark:text-primary-dark">
                      Open Pages
                    </p>
                    <div className="mt-5 space-y-3">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between border-[3px] border-border-light px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] hover:bg-primary-light hover:text-surface-light dark:border-border-dark dark:hover:bg-primary-dark dark:hover:text-background-dark"
                        >
                          Live site
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      {project.links.code && (
                        <a
                          href={project.links.code}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between border-[3px] border-border-light px-4 py-3 font-mono text-[10px] uppercase tracking-[0.24em] hover:bg-accent-light hover:text-surface-light dark:border-border-dark dark:hover:bg-accent-dark dark:hover:text-background-dark"
                        >
                          Source code
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 border-[3px] border-border-light p-5 dark:border-border-dark">
                    <p className="type-byline text-textSecondary-light dark:text-textSecondary-dark">
                      Reading note
                    </p>
                    <p className="mt-4 text-sm leading-7 text-textSecondary-light dark:text-textSecondary-dark">
                      This layout uses narrow columns and strong rules so the project reads
                      more like an editorial spread than a standard portfolio card.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
