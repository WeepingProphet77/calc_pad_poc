/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wells: {
          DEFAULT: '#003C71',
          dark: '#002A52',
          light: '#1E5A94',
        },
      },
      fontFamily: {
        serif: ['"STIX Two Text"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
