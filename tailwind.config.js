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
      colors: {
        brand: {
          purple: '#957BB4',
          lilac:  '#B0ADD8',
          lime:   '#C5E04C',
          gray:   '#8D939D',
          400: '#917CB0',  // textos & ícones
          500: '#7B5EA0',  // hover
          700: '#492A54',  // telefone
        },
      },
      fontFamily: {
        sans: ['Galano Grotesque', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

