/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e9ecef', //BG GRAY
        greeno: '#69db7c',// GREEN
        reddo: '#ff8787', //red
        blueo: '#4dabf7', // blue
      }
    },
  },
  plugins: [],
}