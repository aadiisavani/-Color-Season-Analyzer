/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spring: "#FFA07A",
        summer: "#FFB6C1",
        autumn: "#CD853F",
        winter: "#4169E1",
      },
    },
  },
  plugins: [],
}
