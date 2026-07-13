import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useDarkMode from "../../hooks/useDarkMode";
import DarkModeToggle from "../DarkModeToggle";
import HamburgerMenu from "../HamburgerMenu";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useDarkMode();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-signal-line bg-signal-bg/80 backdrop-blur-xl" aria-label="Main navigation">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="group flex items-center gap-3" aria-label="Roman Shrestha, home">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-signal-line">
            <span className="h-2 w-2 rounded-full bg-signal shadow-[0_0_18px_var(--signal)]" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[-0.02em] text-signal-text">Roman Shrestha</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link, index) => (
            <a key={link.href} href={link.href} className="group text-xs font-medium text-signal-muted transition hover:text-signal-text">
              <span className="mr-2 font-mono text-[9px] text-signal">0{index + 1}</span>{link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
          <div className="md:hidden"><HamburgerMenu isOpen={open} toggleMenu={() => setOpen((value) => !value)} /></div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="border-t border-signal-line bg-signal-bg px-5 py-6 md:hidden">
            <div className="flex flex-col">
              {links.map((link, index) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-signal-line py-4 text-xl font-medium text-signal-text">
                  <span className="mr-4 font-mono text-[10px] text-signal">0{index + 1}</span>{link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
