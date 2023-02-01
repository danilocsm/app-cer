/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      cerBlue: "#7187F5",
      cerPurple: "#B388EB",
      cerGreen: "#6BDAAA",
      navbarFontColor1: "#1E2564",
      ...colors,
    },
    extend: {
      fontFamily: {
        grandstander: ["grandstander"],
      },
      opacity: {
        cerBgOpacity: "0.19",
      },
      boxShadow: {
        cerShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
