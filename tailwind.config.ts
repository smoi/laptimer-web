import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pit: {
          950: '#050905',
          900: '#080d08',
          800: '#0f160f',
          700: '#172117',
          600: '#1e2b1e',
          500: '#2a3d2a',
          400: '#3d5a3d',
        },
        lap: {
          DEFAULT: '#4ade80',
          dim: '#2d8a4e',
          bright: '#86efac',
        },
        amber: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
          light: '#FCD34D',
        },
        data: '#7aae8a',
      },
      fontFamily: {
        display: ['var(--font-barlow)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'scan': 'scan 3s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'stripe': 'stripe 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        stripe: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 -200px' },
        },
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #1e2b1e 1px, transparent 1px)',
        'track-lines': 'repeating-linear-gradient(0deg, transparent, transparent 38px, #1e2b1e 38px, #1e2b1e 40px)',
      },
      backgroundSize: {
        'dot-24': '24px 24px',
      },
    },
  },
  plugins: [],
}

export default config
