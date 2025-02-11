/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          teal: 'var(--color-primary-teal, #008080)',
          blue: 'var(--color-primary-blue, #007BFF)',
        },
        accent: {
          cyan: 'var(--color-accent-cyan, #00F0FF)',
          coral: 'var(--color-accent-coral, #FF6B6B)',
        },
        background: {
          light: '#F9F9F9',
          mint: '#E6F9F5',
          dark: '#121A2A',
        },
        text: {
          heading: '#102A43',
          body: '#34495E',
          light: '#E0FFFF',
        },
        glow: {
          teal: '#00C2CB',
        },
        input: {
          bg: '#ECEFF4',
        },
        status: {
          error: '#E63946',
          success: '#2ECC71',
        },
      },
      transitionProperty: {
        'glow': 'box-shadow, transform, background-color',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 194, 203, 0.5)',
      },
    },
  },
  plugins: [],
};