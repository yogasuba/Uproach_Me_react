/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this based on your file types
  ],
  theme: {
    screens: {
      'sm': '360px',
      'md': '375px',
      'lg': '425px',
      'xl': '768px',
      'xxl':'1280px',
      'xxxl':'1440px'
    },
    extend: {
      fontFamily: {
        helvetica: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.66px', // Add your custom spacing
      },
      colors: {
        customPurple: '#562CE6',
      },
    },
  },
  plugins: [],
};
