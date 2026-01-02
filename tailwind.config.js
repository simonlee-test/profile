/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          100: '#0a0a0a',
          200: '#0f0f0f',
          300: '#141414',
          400: '#1a1a1a',
          500: '#202020',
          600: '#050505',
          700: '#040404',
          800: '#030303',
          900: '#020202',
          950: '#010101'
        },
        neon: {
          mint: '#00FFCC',
          purple: '#7000FF',
          green: '#32CD32'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif']
      },
      backgroundImage: {
        'glass-gradient':
          'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'neon-glow':
          'radial-gradient(circle, rgba(0, 255, 204, 0.3) 0%, transparent 70%)'
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-mint': '0 0 20px rgba(0, 255, 204, 0.5)',
        'neon-purple': '0 0 20px rgba(112, 0, 255, 0.5)',
        'neon-green': '0 0 20px rgba(50, 205, 50, 0.5)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
};
