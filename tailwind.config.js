// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['text-center', 'align-text-bottom', 'inline'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: ['dark'],
      spacing: {
        7.5: '1.875rem', // 30px
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '26px',
        15: '15px',
        28: '28px',
        30: '30px',
        32: '32px',
        34: '34px',
        64: '64px',
      },
      lineHeight: {
        48: '48px',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      base: {
        DEFAULT: '#fafafa',
        light: '#fafafa',
        dark: '#141414',
        1: '#ffffff',
        2: '#fafafa',
        3: '#f5f5f5',
        4: '#f0f0f0',
        5: '#d9d9d9',
        6: '#bfbfbf',
        7: '#8c8c8c',
        8: '#595959',
        9: '#434343',
        10: '#262626',
        11: '#1f1f1f',
        12: '#141414',
        13: '#000000',
      },

      second: {
        avax: '#e84143',
        error: '#fa3c58',
        success: '#0ecc83',
      },
    },
    boxShadowDark: {
      sm: '0 1px 2px 0 rgba(255,255,255 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(255,255,255 0.1), 0 1px 2px 0 rgba(255,255,255 0.06)',
      md: '0 4px 6px -1px rgba(255,255,255 0.1), 0 2px 4px -1px rgba(255,255,255 0.06)',
      lg: '0 10px 15px -3px rgba(255,255,255 0.1), 0 4px 6px -2px rgba(255,255,255 0.05)',
      xl: '0 20px 25px -5px rgba(255,255,255 0.1), 0 10px 10px -5px rgba(255,255,255 0.04)',
      '2xl': '0 25px 50px -12px rgba(255,255,255 0.25)',
      '3xl': '0 35px 60px -15px rgba(255,255,255 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(255,255,255 0.06)',
      none: 'none',
    },
  },
  variants: {
    extend: {},
  },
  daisyui: {
    themes: [
      // 'light',
      {
        dark: {
          'color-scheme': 'dark',
          primary: '#2d42fc',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
