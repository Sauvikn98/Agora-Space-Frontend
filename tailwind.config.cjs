/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom': '0.9fr 2fr 0.7fr',
        'custom2': '2fr 1.1fr',
        'custom3': '0.4fr 2fr',
      },
    },
  },
  plugins: [],
}