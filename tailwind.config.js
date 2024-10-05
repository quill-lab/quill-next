module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,ts,tsx,jsx}',
    './pages/**/*.{js,ts,tsx,jsx}',
    './components/**/*.{js,ts,tsx,jsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        outline: '0 0 0 1px #D9D9D9',
      },
      fontFamily: {
        hakgyoansim: ['Hakgyoansim', 'sans-serif'],
      },
    },
    colors: {
      white: '#ffffff',
      gray1: '#D9D9D9',
      gray2: '#6C6C6C',
      gray6: '#959595',

      black1: '#2D2D2D',
      white2: '#FFFBF4',
      blue1: '#059EAF',
      blue2: '#1CB09E',

      error: '#EE3C3C',
    },
  },
};
