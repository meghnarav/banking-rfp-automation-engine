/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Check if your files are .jsx or .js
  ],
  theme: {
    extend: {
      colors: {
        bankBlue: '#00529b',
        bankNavy: '#003d73',
      }
    },
  },
  plugins: [],
}