"use client";

import { Menu, X } from "lucide-react";

export default function HamburgerMenu({ isOpen, toggleMenu }) {
  return (
    <button type="button" className="flex h-10 w-10 items-center justify-center text-signal-text" onClick={toggleMenu} aria-label={`${isOpen ? "Close" : "Open"} navigation menu`} aria-expanded={isOpen}>
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}
