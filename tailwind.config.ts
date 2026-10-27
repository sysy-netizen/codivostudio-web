import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFA",
        surface: "#FFFFFF",
        foreground: "#18181B",
        muted: "#71717A",
        accent: { DEFAULT: "#2563EB", hover: "#1D4ED8", soft: "#EFF6FF" },
        border: "#E4E4E7",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Pretendard Variable",
          "Pretendard",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: { content: "1200px" },
      borderRadius: { card: "12px" },
    },
  },
  plugins: [],
};
export default config;
