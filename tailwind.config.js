/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: {
          light: "#c9332e",
          dark: "#ff8b80",
        },

        accent: {
          light: "#1f4dd8",
          dark: "#8fb4ff",
        },

        background: {
          light: "#f5efdf",
          dark: "#121315",
        },

        surface: {
          light: "#fff9ef",
          dark: "#1b1d21",
        },

        text: {
          light: "#121212",
          dark: "#f5efdf",
        },

        textSecondary: {
          light: "#51483e",
          dark: "#d8cebe",
        },

        border: {
          light: "#1c1a17",
          dark: "#5b564e",
        },

        success: {
          light: "#177245",
          dark: "#6ed9a0",
        },

        danger: {
          light: "#9f1f1a",
          dark: "#ff8e83",
        },

        info: {
          light: "#2352b0",
          dark: "#9fc1ff",
        },
      },

      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        display: ["Oswald", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },

  plugins: [require("@tailwindcss/forms")],
};
