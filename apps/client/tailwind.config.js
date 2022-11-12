/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['lobster', 'arial', 'sans-serif'],
      },
      gridTemplateColumns: {
        '3/4': '3fr 1fr',
      },
    },
  },
  plugins: [],
};
