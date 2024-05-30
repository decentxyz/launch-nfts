const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8246E5'
      },
      fontFamily: {
        sfPro: ['var(--font-sfPro)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}