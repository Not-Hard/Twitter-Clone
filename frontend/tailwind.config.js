/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      {
        black: {
          "primary": "rgb(29, 155, 240)",  // Twitter blue
          "secondary": "rgb(24, 24, 24)",  // Dark background
          "accent": "#f0f0f0",             // optional
          "neutral": "#111",
          "base-100": "#1a1a1a",
        },
      },
    ],
  },
};
