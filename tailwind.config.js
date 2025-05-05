/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './node_modules/@premieroctet/next-admin/dist/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,tsx,jsx,mdx}',
    './pages/**/*.{js,ts,tsx,jsx}',
    './components/**/*.{js,ts,tsx,jsx}',
    './node_modules/@premieroctet/next-admin/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        outline: '0 0 0 1px #D9D9D9',
      },
      fontFamily: {
        hakgyoansim: ['Hakgyoansim', 'sans-serif'],
        spoqa: ['Spoqa Han Sans Neo', 'sans-serif'],
      },
      screens: {
        sm: '800px',
        md: '1048px',
        lg: '1140px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        nextadmin: {
          background: {
            default: '#FEFEFE',
          },
        },
        'dark-nextadmin': {
          background: {
            default: '#2F2F2F',
          },
        },

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
    },
    colors: {
      white: '#ffffff',
      gray1: '#D9D9D9',
      gray2: '#6C6C6C',
      gray6: '#959595',
      neutral: '#F8F8F8',
      black1: '#2D2D2D',
      black2: '#333333',
      white2: '#FFFBF4',
      white3: '#E7F6F8',
      blue1: '#059EAF',
      blue2: '#1CB09E',
      error: '#EE3C3C',
      'white-opacity-50': 'rgba(255, 255, 255, 0.5)',
    },
  },
  presets: [require('@premieroctet/next-admin/preset')],
  plugins: [require('tailwind-scrollbar'), require('tailwindcss-animate')],
};
