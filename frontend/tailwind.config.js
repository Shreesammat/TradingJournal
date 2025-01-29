/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF', // White
        secondary: '#040403', // Black
        tertiary: '#EFEFEF', // Magnolia
        reddo: '#F72C25', // Red
        greeno: '#65B891', // Green
      }
    },
  },
  plugins: [],
}