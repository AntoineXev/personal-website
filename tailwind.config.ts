import typographyPlugin from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'

import typographyStyles from './typography'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  plugins: [typographyPlugin],
  theme: {
    fontSize: {
      xs: ['1rem', { lineHeight: '1.5rem' }],
      sm: ['1.25rem', { lineHeight: '1.5rem' }],
      base: ['1.5rem', { lineHeight: '2rem' }],
      lg: ['1.875rem', { lineHeight: '2rem' }],
      xl: ['1.875rem', { lineHeight: '2.25rem' }],
      '2xl': ['2rem', { lineHeight: '2.25rem' }],
      '3xl': ['3rem', { lineHeight: '3.25rem' }],
      '4xl': ['3.75rem', { lineHeight: '4rem' }],
      '5xl': ['4.5rem', { lineHeight: '4.75rem' }],
      '6xl': ['5.25rem', { lineHeight: '6.25rem' }],
      '7xl': ['8rem', { lineHeight: '8.25rem' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontFamily: {
      'sans': [
          'DM Sans',
        '"Inter"',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    typography: typographyStyles,
  },
} satisfies Config
