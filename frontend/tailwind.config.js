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
        tertiary: '#F5F0F6', // Magnolia 
        reddo: '#F72C25', // Red
        greeno: '#65B891', // Green
      }
    },
  },
  plugins: [],
}