module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: { max: "719px" },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
