/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1D8BD5', // Deep Blue for primary elements
        secondary: '#F4E04D', // Light Yellow for highlights
        accent: '#FFFFFF', // Pure White for clean contrast
        background: '#F7F9FB', // Light Grayish White for backgrounds
        text: '#333333', // Dark Gray for text
        banner: {
          100: '#B6E9FA', // Light Blue
          200: '#8DD7F0', // Soft Blue
          300: '#5CBFE9', // Bright Blue
          400: '#1D8BD5', // Deep Blue
        }
      }
    },
  },
  
  plugins: [daisyui],
}
