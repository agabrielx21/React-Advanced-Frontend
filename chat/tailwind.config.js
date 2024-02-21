const fonts = require("./utils/general/fonts");
const colors = require("./utils/general/colors");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      md: "846px",
      lg: "1300px",
      xl: "1580px"
    },
    extend: {
      colors: colors,
    },
  },
  plugins: [],
}

