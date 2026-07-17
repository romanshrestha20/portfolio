"use client";

import DarkModeToggle from "@/components/DarkModeToggle";
import useDarkMode from "@/hooks/useDarkMode";

export default function AdminThemeToggle() {
  const { theme, toggleTheme } = useDarkMode();
  return <DarkModeToggle theme={theme} toggleTheme={toggleTheme} />;
}
