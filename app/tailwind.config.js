/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/(tabs)/home/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "#99A3FF",
      secondary: "#BD91CE",
      background: "#FFF7ED",
      clickable: "#2832f1",
      white: "#FFFFFF",
    },
    extend: {},
  },
  plugins: [],
};
