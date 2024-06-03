const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  prefix: 't-',
  important: true,
  theme: {
    extend: {
      screens: {
        375: '220px',
        400: '400px',
        440: '440px',
        500: '500px',
        760: '760px',
        991: '991px',
        1110: '1110px',
        1320: '1320px',
        1440: '1440px',
        1620: '1620px',
        1720: '1720px',
      },
      colors: {
        primaryblue: '#1D59F9',
        primary: 'rgba(58, 87, 236, 1)',
        secondary: 'rgba(207, 213, 255, 1)',
        purple: 'rgba(127, 106, 255, 1)',
        t1: '#52525B',
        t2: '#303038',
        grey: 'rgba(217, 217, 217, 1)',
        light: 'rgba(248, 250, 252, 1)',
        red: '#FD264E',
        brown: '#B03D41',
        lightGrey: '#CBD5E1',
      },
      borderRadius: {
        primary: '20px',
      },
      fontSize: {
        heading: '32px',
      },
      boxShadow: {
        main: '0px 2px 4px rgba(0, 0, 0, 0.15), 0px -2px 4px rgba(0, 0, 0, 0.15)',
        secondary: '0px -2px 4px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)',
        inner: 'inset 0px 1px 2px rgba(97, 97, 97, 0.2), inset 0px 2px 4px rgba(97, 97, 97, 0.2)',
        thin: '0px 1px 4px rgba(0, 0, 0, 0.05), 0px 0px 4px rgba(0, 0, 0, 0.01)',
      },
    },
  },

  plugins: [],
}
