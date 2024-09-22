/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#5b21b6',
        secondary: '#f3f4f6',
        darkGray: '#374151',
        mediumGray: '#d1d5db',
        lightGray: '#6b7280',
        overlayOrange: '#f97316',
        overlayBlue: '#0284c7',
        overlayGreen: '#16a34a',
        success: "#16a34a",
        error: "#dc2626",

      }
    },
  },
  plugins: [],
}

