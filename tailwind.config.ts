import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,html}'],
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['0.8rem', { lineHeight: '1rem' }],
      sm: ['0.9rem', { lineHeight: '1rem' }],
      base: ['1rem', { lineHeight: '1.4rem' }],
      lg: ['1.25rem', { lineHeight: '1.5rem' }],
      xl: ['1.50rem', { lineHeight: '1.8rem' }],
      '2xl': ['2rem', { lineHeight: '2.25rem' }],
      '3xl': ['3rem', { lineHeight: '3.25rem' }],
      '4xl': ['3.75rem', { lineHeight: '4rem' }],
      '5xl': ['4.5rem', { lineHeight: '4.75rem' }],
      '6xl': ['5.25rem', { lineHeight: '6.25rem' }],
      '7xl': ['8rem', { lineHeight: '8.25rem' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['10rem', { lineHeight: '1' }],
    },
    fontFamily: {
      typewriter: ['"Courier Prime"', 'ui-monospace', 'monospace'],
      handwritten: ['Ballet', 'cursive'],
      sans: [
        '"Inter"',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ],
      serif: ['Georgia', 'Times New Roman', 'Times', 'serif'],
    },
  },
} satisfies Config
