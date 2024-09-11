/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
  daisyui: {
    // themes: [
    //   {
    //     light: {
    //       "primary": "#e63946", // Coral Red
    //       "secondary": "#f1faee", // Off-White
    //       "accent": "#a8dadc", // Light Grayish Blue
    //       "neutral": "#a0aec0", // Neutral Gray
    //       "base-100": "#ffffff", // Background (White)
    //       "info": "#3abff8",
    //       "success": "#36d399",
    //       "warning": "#fbbd23",
    //       "error": "#f87272",
    //     },
    //     dark: {
    //       "primary": "#e63946", // Coral Red
    //       "secondary": "#f1faee", // Off-White
    //       "accent": "#a8dadc", // Light Grayish Blue
    //       "neutral": "#1f2937", // Dark Neutral
    //       "base-100": "#1d3557", // Deep Navy Blue
    //       "info": "#3abff8",
    //       "success": "#36d399",
    //       "warning": "#fbbd23",
    //       "error": "#f87272",
    //     }
    //   }
    // ],
  },
  plugins: [daisyui],
}
