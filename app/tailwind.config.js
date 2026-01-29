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
      primary: "#6B6DFF",
      secondary: "#BD91CE",
      background: "#FFFBF4",
      clickable: "#6B6DFF",
      white: "#FFFFFF",
    },
    extend: {},
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      md: "1rem", // 16px - base
      lg: "1.5rem", // 24px
      xl: "1.75rem", // 28px
    },
  },
  plugins: [],
};
