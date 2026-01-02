/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        // ---------- Brand Colors ----------
        primary: {
          light: "#1A73E8", // Bright Blue
          dark: "#64B5F6",  // Soft Blue for Dark Mode
        },

        accent: {
          light: "#F9A825", // Amber
          dark: "#FFD54F",
        },

        // ---------- Neutrals ----------
        background: {
          light: "#FFFFFF",
          dark: "#0F172A",  // Deep Navy
        },

        surface: {
          light: "#F5F7FA",
          dark: "#1E293B",
        },

        text: {
          light: "#1C1C1C",
          dark: "#F1F5F9",
        },

        textSecondary: {
          light: "#444444",
          dark: "#CBD5E1",
        },

        border: {
          light: "#E1E5ED",
          dark: "#2E3A4F",
        },

        // ---------- Status Colors ----------
        success: {
          light: "#16A34A",
          dark: "#34D399",
        },

        danger: {
          light: "#DC2626",
          dark: "#F87171",
        },

        info: {
          light: "#0284C7",
          dark: "#38BDF8",
        },
      },

      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Primary font
        mono: ["Roboto Mono", "monospace"], // Monospace font for code and technical text
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
