/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables dark mode using 'class' strategy
  theme: {
    extend: {
      colors: {
        // Light Theme Colors
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
        },

        // Dark Theme Colors
        dark: {
          primary: '#4AADEB', // Soft Light Blue
          secondary: '#FFD95A', // Warm Yellow
          accent: '#E1E2DB', // Light Off-White
          background: '#1A1D23', // Dark Grayish-Black
          text: '#EDEDED', // Light Gray
          banner: {
            100: '#30495E', // Muted Teal
            200: '#2D6A8B', // Deep Soft Blue
            300: '#23618C', // Bright Blue-Teal Tone
            400: '#1D8BD5', // Deep Blue (matches light theme primary)
          },
        },
      },
    },
  },
  plugins: [daisyui],
};



// Definitions
/*
    1.Primary: Buttons, Navigation links and menues, Headings or Titles, Icons and Logos,Input Fields / Forms, Badges or Tags, Cards or Panels (heading, border, )
    2.
    3. accent: Text on Primary and Secondary Elements,  Background for Cards or Containers, Input Fields and Form Elements,  Cards and Panels, Modal or Popup Backgrounds, Table and List Backgrounds, Hover States for Elements, Shadows and Highlights, Dividers or Borderss 
*/