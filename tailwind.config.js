/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fade: 'fadeIn 2s ease-in',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      }),
    },
  },
  plugins: [],
}
