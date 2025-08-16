/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#165a4a',
        secondary: '#2e8b57',
        accent: '#9bd5b0',
        background: '#0b3d2e',
        foreground: '#e8f5f0'
      }
    }
  },
  plugins: []
};