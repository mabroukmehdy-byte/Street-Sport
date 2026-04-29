/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Anton', 'sans-serif'],
        subheading: ['"Cormorant Garamond"', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      colors: {
        barber: {
          bg: '#111111',
          bgSoft: '#1A1A1A',
          text: '#F4EBD0',
          textMuted: '#A19D94',
          gold: '#C5A059',
          goldLight: '#E6C57A',
          accent: '#4A0404',
        },
      },
      backdropBlur: {
        xl: '22px',
      },
    },
  },
  plugins: [],
};
