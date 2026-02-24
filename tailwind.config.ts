import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'text-primary': 'var(--text)',
        'text-muted': 'var(--text-muted)',
        glass: 'var(--glass)',
        'glass-border': 'var(--glass-border)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'var(--font-body)', 'system-ui', 'sans-serif'],
        loading: ['var(--font-loading)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.24)',
        'glow': '0 0 40px rgba(255,255,255,0.08)',
      },
      backdropBlur: {
        card: '12px',
        strong: '20px',
      },
      keyframes: {
        'loading-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        'vhs-slide': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0% 0 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'flame-flicker': {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1) translateY(0)' },
          '50%': { opacity: '0.4', transform: 'scale(1.15) translateY(-2px)' },
        },
        'flame-rise': {
          '0%': { opacity: '0.8', transform: 'translateY(0) scale(0.8)' },
          '100%': { opacity: '0', transform: 'translateY(-20px) scale(1.2)' },
        },
        'spark': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 6px 2px rgba(251,191,36,0.6)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 12px 4px rgba(251,191,36,0.9)' },
        },
      },
      animation: {
        'loading-bar': 'loading-bar 1.5s ease-in-out infinite',
        'vhs-slide': 'vhs-slide 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
        'flame-flicker': 'flame-flicker 0.4s ease-in-out infinite',
        'flame-rise': 'flame-rise 1.2s ease-out infinite',
        'spark': 'spark 0.8s ease-in-out infinite',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
