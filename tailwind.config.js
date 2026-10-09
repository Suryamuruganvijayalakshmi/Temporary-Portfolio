/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iris: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          glow: 'rgba(124, 58, 237, 0.25)',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle: '#fafbfe',
          muted: '#f4f6fa',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'iris-sm': '0 2px 10px -2px rgba(124, 58, 237, 0.12)',
        'iris': '0 8px 30px -6px rgba(124, 58, 237, 0.16)',
        'iris-lg': '0 20px 40px -12px rgba(124, 58, 237, 0.25)',
        'card': '0 4px 24px -2px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 20px 40px -8px rgba(15, 23, 42, 0.08), 0 0 20px 0 rgba(124, 58, 237, 0.12)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
