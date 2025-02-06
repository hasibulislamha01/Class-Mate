/** @type {import('tailwindcss').Config} */
// import daisyui from 'daisyui';
 
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
          primary: '#4F9FD4', // Soft Sky Blue (professional and calming)
          secondary: '#F6C86D', // Warm Muted Gold for subtle highlights
          accent: '#1F252B', // Deep Charcoal for clean contrast
          background: '#121418', // True Blackish Gray for immersive dark mode
          text: '#D1D5DB', // Soft Light Gray for readability
          banner: {
            100: '#243040', // Dark Teal-Gray (calming and neutral)
            200: '#2B5068', // Muted Ocean Blue
            300: '#3E6D8A', // Soft Cool Blue
            400: '#4F9FD4', // Soft Sky Blue (matches primary)
          },
        },
      },
    },
  },
  // plugins: [daisyui],
};



// Definitions
/*
    1.Primary: Buttons, Navigation links and menues, Headings or Titles, Icons and Logos,Input Fields / Forms, Badges or Tags, Cards or Panels (heading, border, )
    2.
    3. accent: Text on Primary and Secondary Elements,  Background for Cards or Containers, Input Fields and Form Elements,  Cards and Panels, Modal or Popup Backgrounds, Table and List Backgrounds, Hover States for Elements, Shadows and Highlights, Dividers or Borderss 
*/