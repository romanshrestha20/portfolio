"use client";

import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle({ theme, toggleTheme }) {
  const dark = theme === "dark";
  return (
    <button type="button" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} theme`} className="signal-icon-button">
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
