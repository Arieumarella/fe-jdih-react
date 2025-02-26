/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#333333",
        bluePu : '#233b74',
        kuningButton : `#FFE54E`,
        gradiankuning : `#09A8D4`,
        gradianBiru : `#FFE54E`
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'onest': ['Onest', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
