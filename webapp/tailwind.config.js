import createPreset from 'tailwindcss-antdesign-preset'

import theme from './src/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.{css,ts,tsx}'],
  presets: [createPreset({ theme })],
  theme: {
    extend: {
      borderRadius: {
        full: '9999px',
      },
      colors: {
        transparent: 'transparent',
        white: '#ffffff',
        primary: {
          1: '#eef2ff',
          2: '#e0e7ff',
          3: '#c7d2fe',
          4: '#a5b4fc',
          5: '#818cf8',
          6: '#6366f1',
          7: '#4f46e5',
          8: '#4338ca',
          9: '#3730a3',
          10: '#312e81',
          11: '#1e1b4b',
        },
        gray: {
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
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
