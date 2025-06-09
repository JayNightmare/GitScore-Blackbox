/**
 * Tailwind CSS configuration
 * Configures content paths, theme extensions, and plugins
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#24292e',
          light: '#fafbfc',
        }
      },
      animation: {
        'score-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
