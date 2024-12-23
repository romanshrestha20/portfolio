/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#30BCED",
        secondary: "#303036",
        background: "#FFF9FF",
        accent: "#FC5130",
        dark: "#050401",
      },
      fontFamily: {
        mono: ['Roboto Mono', 'monospace'], // Add Roboto Mono font as a monospace option
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
