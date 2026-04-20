/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#7ED9A4",
          purple: "#EAA4E8",
          text: "#1F2937",
          muted: "#9CA3AF",
        },
      },
    },
  },
  plugins: [],
};
