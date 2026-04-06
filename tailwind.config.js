/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { 
  DarkBlue: '#0E2A47',     // основний темно-синій (замість фіолетового)
  borderBlue: '#1F3F66',   // глибокий синій для бордерів і тексту
  morange: '#3E6EA8',      // акцентний синій (замість оранжевого)
  
},
      fontFamily: {
        primary: ['var(--font-primary)'],
        helvetica: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
    variants: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar'), require('tailwindcss-animate')],
};
