/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.tsx", "./public/index.html"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    extend: {
      colors: {
        dark: {
          100: "var(--color-dark-100)",
          200: "var(--color-dark-200)",
          300: "var(--color-dark-300)",
          400: "var(--color-dark-400)",
          500: "var(--color-dark-500)",
          600: "var(--color-dark-600)",
          700: "var(--color-dark-700)",
          800: "var(--color-dark-800)",
          900: "var(--color-dark-900)",
        },
        accent: "var(--color-accent)",
        brand: "var(--color-brand)",
      },
      outline: {
        "no-chrome": "none",
      },
      transitionTimingFunction: {
        "in-out-hard": "cubic-bezier(.77, 0, .175, 1)",
      },
      transitionDuration: {
        400: "400ms",
      },
      keyframes: {
        breathe: {
          "0%, 100%": {
            boxShadow: "0 0 20px 2px var(--color-dark-100-translucent)",
            borderColor: "var(--color-dark-300)",
          },
          "50%": {
            boxShadow: "0 0 20px 2px transparent",
            borderColor: "var(--color-dark-700)",
          },
        },
      },
      animation: {
        DEFAULT: "1s ease-in-out infinite",
        "breathe-slow": "breathe 5s infinite ease-in-out",
      },
    },
  },
};