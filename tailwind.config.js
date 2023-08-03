const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      body: ['var(--font-raleway)', ...defaultTheme.fontFamily.sans],
      display: ['var(--font-raleway)', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}
