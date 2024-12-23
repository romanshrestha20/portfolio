import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = (event) => {
    const newDarkModeState = event.target.checked;
    setDarkMode(newDarkModeState);
    document.documentElement.classList.toggle("dark", newDarkModeState);
    Cookies.set("theme", newDarkModeState ? "dark" : "light", { expires: 365 });
  };

  return { darkMode, toggleDarkMode };
};

export default useDarkMode;
