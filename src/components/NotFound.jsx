import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightCircle } from "lucide-react"; // Icon
import { FaGhost, FaRegGrinBeam } from "react-icons/fa"; // Ghost & Grinning Face Icons

const NotFound = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Detect system dark mode preference on initial render
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);

    // Listen for changes to the system theme
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        darkMode
          ? "bg-background-dark text-text-dark"
          : "bg-background-light text-text-light"
      } overflow-hidden`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 px-8 py-16 overflow-hidden text-center shadow-2xl rounded-2xl"
      >
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-accent-light to-primary-light"
        >
          404
        </motion.h1>

        {/* Fun Ghost with Animation */}
        <motion.div
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-6"
        >
          <FaGhost
            className={`text-7xl ${
              darkMode ? "text-textSecondary-dark" : "text-textSecondary-light"
            } animate-bounce`}
          />
        </motion.div>

        {/* Informative Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8 text-2xl font-semibold"
        >
          It appears that the page you are looking for does not exist.
        </motion.p>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-8">
          {/* Go Home Button */}
          <motion.a
            href="/"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="inline-flex items-center text-lg font-semibold transition-all transform text-primary-light hover:text-accent-light hover:scale-110"
          >
            <ArrowRightCircle className="w-8 h-8 mr-2" />
            Take me Home
          </motion.a>
        </div>

        {/* Fun Animated Emoji */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6 text-4xl"
        >
          <FaRegGrinBeam />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
