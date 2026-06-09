import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a2540",
          dark: "#061a30",
          light: "#15355c",
        },
        brand: {
          blue: "#1e4d8c",
          green: "#16b378",
          greenDark: "#0e8a5b",
          teal: "#0fb5a8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(10, 37, 64, 0.08)",
        cardHover: "0 8px 32px rgba(10, 37, 64, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
