"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";
import useDarkMode from "../../hooks/useDarkMode";
import DarkModeToggle from "../DarkModeToggle";
import HamburgerMenu from "../HamburgerMenu";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ name = "Roman Shrestha" }) {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useDarkMode();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-signal-line bg-signal-bg/90 backdrop-blur-xl" aria-label="Main navigation">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="flex items-center gap-3 group" aria-label={`${name}, home`}>
          <img
            src={theme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg"}
            alt=""
            aria-hidden="true"
            className="size-9 shrink-0"
          />
          <span className="text-[11px] font-bold uppercase tracking-[.13em] text-signal-text">{name}</span>
        </a>

        <div className="items-center hidden gap-8 md:flex">
          {links.map((link, index) => (
            <a key={link.href} href={link.href} className="group text-[10px] font-bold uppercase tracking-[.12em] text-signal-muted transition hover:text-signal">
              <span className="mr-2 font-mono text-[9px] text-signal">[{index + 1}]</span>{link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="signal-icon-button"
            aria-label="Open admin workspace"
            title="Open admin workspace"
          >
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          </Link>
          <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />
          <div className="md:hidden"><HamburgerMenu isOpen={open} toggleMenu={() => setOpen((value) => !value)} /></div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="px-5 py-6 border-t border-signal-line bg-signal-bg md:hidden">
            <div className="flex flex-col">
              {links.map((link, index) => (
                <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="py-4 text-xl font-medium border-b border-signal-line text-signal-text">
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
