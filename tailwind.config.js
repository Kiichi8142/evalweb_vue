/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Sarabun', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
}

