/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          50: '#FFFFFF',
          950: '#000000',
        },
      }
    },
    // fontFamily: {
    //   kranky: ['kranky', 'serif'],
    // },
  },
  plugins: [],
}