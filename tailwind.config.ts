import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: "#0D0D0D",
        paper: "#F5F0E8",
        gold: "#C9A84C",
        "gold-light": "#E8D5A3",
        "gold-dark": "#8B6914",
        rust: "#8B3A2A",
        stone: "#6B6560",
        "stone-light": "#B5AFA8",
        "stone-dark": "#3D3A36",
      },
    },
  },
  plugins: [],
};
export default config;
