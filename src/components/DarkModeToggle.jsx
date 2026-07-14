"use client";

import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle({ theme, toggleTheme }) {
  const dark = theme === "dark";
  return (
    <button type="button" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} theme`} className="flex h-10 w-10 items-center justify-center rounded-full border border-signal-line text-signal-muted transition hover:border-signal hover:text-signal-text">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
