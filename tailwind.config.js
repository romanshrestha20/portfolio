/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#4361ee",
        secondary: "#303036",
        background: "#f3f4f6",
        accent: "#FC5130",
        dark: "#050401",
        blue: {
          600: "#1D4ED8", // Light mode blue
          400: "#60A5FA", // Dark mode blue
        },
        gray: {
          800: "#1F2937", // Light mode gray
          200: "#E5E7EB", // Dark mode gray
          600: "#4B5563", // Light mode gray
          300: "#D1D5DB", // Dark mode gray
          400: "#9CA3AF", // For ArrowDown icon in light mode
          700: "#374151", // For ArrowDown hover in light mode
        },
        pink: {
          600: "#EC4899", // Light mode pink for Instagram
          400: "#F472B6", // Dark mode pink for Instagram
        },
        green: {
          600: "#16A34A", // Light mode green for football
          400: "#34D399", // Dark mode green for football
        },
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
