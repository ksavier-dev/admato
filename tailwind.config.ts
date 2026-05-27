import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        admato: {
          black: '#000000',
          dark: '#0A0A0A',
          'dark-2': '#111111',
          'dark-3': '#1A1A1A',
          border: '#222222',
          'border-light': '#2A2A2A',
          silver: '#C0C0C0',
          'silver-light': '#E8E8E8',
          white: '#FFFFFF',
          cyan: '#00D4FF',
          purple: '#8B5CF6',
          gold: '#C9A84C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'border-rotate': 'borderRotate 4s linear infinite',
        'light-sweep': 'lightSweep 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        borderRotate: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        lightSweep: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(300%) skewX(-15deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-cyan-lg': '0 0 60px rgba(0, 212, 255, 0.2)',
        'glow-silver': '0 0 20px rgba(192, 192, 192, 0.2)',
        'glow-silver-lg': '0 0 60px rgba(192, 192, 192, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.6)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.8)',
        'premium': '0 0 0 1px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}

export default config
