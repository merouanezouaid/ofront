/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      keyframes: {
        change: {
          'to': { backgroundPosition: '-100px calc(100vh - 380px)' },
          'from': { backgroundPosition: '0 calc(100vh - 450px)' },
        },
        fade: {
          'to': { opacity: '0' },
          'from': { opacity: '1' },
        },
      },
      animation: {
        change: 'change 3s ease-in-out alternate-reverse infinite',
        fade: 'fade 1s ease-in alternate-reverse infinite',
      },
    },
  },
  plugins: [],
}

