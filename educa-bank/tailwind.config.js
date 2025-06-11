import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
         shine: {
           '0%': { 'background-position': '100%' },
           '100%': { 'background-position': '-100%' },
         },
       },
       animation: {
         shine: 'shine 5s linear infinite',
       },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;