import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        akar: {
          primary: {
            DEFAULT: "var(--akar-primary)",
            hover: "var(--akar-primary-hover)",
            light: "var(--akar-primary-light)",
          },
          earth: {
            DEFAULT: "var(--akar-earth)",
            hover: "var(--akar-earth-hover)",
            light: "var(--akar-earth-light)",
          },
          accent: {
            DEFAULT: "var(--akar-accent)",
            hover: "var(--akar-accent-hover)",
            light: "var(--akar-accent-light)",
          },
          danger: {
            DEFAULT: "var(--akar-danger)",
            light: "var(--akar-danger-light)",
          },
          bg: "var(--akar-bg)",
          ink: "var(--akar-ink)",
          muted: "var(--akar-muted)",
          border: "var(--akar-border)",
          card: "var(--akar-card)",
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          '"Inter"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
