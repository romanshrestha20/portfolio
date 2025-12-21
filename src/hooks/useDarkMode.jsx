import { useState, useEffect, useCallback } from "react";

export function useDarkMode() {
  const getInitialTheme = useCallback(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }, []);

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const stored = localStorage.getItem("theme");
      if (!stored) {
        setTheme(mq.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  return { theme, toggleTheme };
}

export default useDarkMode;
