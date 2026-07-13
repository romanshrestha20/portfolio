import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";

export default function ProjectCaseStudyModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const previous = document.activeElement;
    const handleKey = (event) => event.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      previous?.focus?.();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[80] overflow-y-auto bg-signal-bg/90 p-3 backdrop-blur-xl sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="case-study-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onMouseDown={(event) => event.stopPropagation()} className="mx-auto min-h-full max-w-6xl bg-signal-surface">
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-signal-line bg-signal-surface/90 px-5 py-4 backdrop-blur-xl sm:px-8">
              <p className="signal-kicker">Project transmission · {project.issue}</p>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close case study" className="flex h-11 w-11 items-center justify-center rounded-full border border-signal-line text-signal-text hover:border-signal"><X className="h-5 w-5" /></button>
            </div>

            <div className="grid lg:grid-cols-2">
              <img src={project.image} alt={`${project.name} interface`} className="h-full min-h-[320px] w-full object-cover" />
              <div className="p-6 sm:p-10 lg:p-14">
                <p className="signal-kicker">{project.caseStudy.kicker}</p>
                <h2 id="case-study-title" className="mt-5 text-5xl font-semibold leading-[.9] tracking-[-.06em] text-signal-text sm:text-7xl">{project.name}</h2>
                <p className="mt-6 text-xl leading-snug text-signal-muted">{project.caseStudy.headline}</p>
                <dl className="mt-10 border-t border-signal-line">
                  {project.facts.map((fact) => <div key={fact.label} className="grid grid-cols-[100px_1fr] border-b border-signal-line py-4"><dt className="font-mono text-[9px] uppercase tracking-[.16em] text-signal">{fact.label}</dt><dd className="text-sm text-signal-text">{fact.value}</dd></div>)}
                </dl>
              </div>
            </div>

            <div className="grid border-t border-signal-line lg:grid-cols-[1fr_320px]">
              <div className="p-6 sm:p-10 lg:p-14">
                <p className="signal-kicker mb-8">Build notes</p>
                <div className="max-w-3xl space-y-7">
                  {project.caseStudy.sections.map((section) => <p key={section.slice(0, 40)} className="text-base leading-8 text-signal-muted sm:text-lg">{section}</p>)}
                </div>
              </div>
              <aside className="border-t border-signal-line p-6 lg:border-l lg:border-t-0 lg:p-8">
                <p className="signal-kicker mb-5">Open project</p>
                <div className="flex flex-col gap-3">
                  {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer" className="signal-button signal-button-primary">Live product <ArrowUpRight className="h-4 w-4" /></a>}
                  {project.links.code && <a href={project.links.code} target="_blank" rel="noreferrer" className="signal-button">Source code <Github className="h-4 w-4" /></a>}
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
