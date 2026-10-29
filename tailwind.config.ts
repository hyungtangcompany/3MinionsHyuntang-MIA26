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
          primary: "var(--akar-primary)",
          earth: "var(--akar-earth)",
          accent: "var(--akar-accent)",
          danger: "var(--akar-danger)",
          bg: "var(--akar-bg)",
          ink: "var(--akar-ink)",
        },
      },
    },
  },
  plugins: [],
};

export default config;

