/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "surface-raised": "var(--surface-raised)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-3": "var(--accent-3)",
        border: "var(--border)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: [
          "var(--font-space-grotesk)",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
      },
      spacing: {
        "3xs": "0.125rem",
        "2xs": "0.25rem",
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1.25rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4.5rem",
        "3xl": "6rem",
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
      },
    },
  },
  plugins: [],
};

module.exports = config;
