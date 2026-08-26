import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3D",
        navyDeep: "#071528",
        navyLight: "#16305A",
        gold: "#C9A34E",
        goldSoft: "#E9D9AE",
        goldBright: "#E0B84B",
        page: "#F5F4F0",
        ink: "#101826",
        muted: "#5B6472",
        line: "#DFE2E8",
        stageGreen: "#2F6B4F",
        stageRed: "#B4482F",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
