/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        signal: {
          DEFAULT: "var(--signal)",
          bg: "var(--signal-bg)",
          surface: "var(--signal-surface)",
          text: "var(--signal-text)",
          muted: "var(--signal-muted)",
          line: "var(--signal-line)",
        },
        primary: {
          light: "#6d28d9",
          dark: "#8b5cf6",
        },
        accent: {
          light: "#2563eb",
          dark: "#60a5fa",
        },
        background: {
          light: "#f8f8fa",
          dark: "#09090b",
        },
        surface: {
          light: "#ffffff",
          dark: "#111114",
        },
        text: {
          light: "#111114",
          dark: "#f5f5f7",
        },
        textSecondary: {
          light: "#60606b",
          dark: "#a1a1aa",
        },
        border: {
          light: "#e2e2e8",
          dark: "#27272a",
        },
        success: {
          light: "#15803d",
          dark: "#4ade80",
        },
        danger: {
          light: "#b91c1c",
          dark: "#f87171",
        },
        info: {
          light: "#1d4ed8",
          dark: "#60a5fa",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space_Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains_Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
