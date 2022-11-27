/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#facc15',
        primary: '#fb923c',
        inputFocus: '#fed7aa',
        lightGrey: '#6b7280',
        placeholderGrey: '#9ca3af',
      },
      fontFamily: {
        lobster: ['lobster', 'arial', 'sans-serif'],
      },
      gridTemplateColumns: {
        '3/4': '3fr 1fr',
      },
      width: {
        '9/10': '90%',
      },
    },
  },
  plugins: [],
};
