import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        /* Navy korporat: warna dasar dominan website (sesuai company profile). */
        brand: {
          50: '#eef4f9',
          100: '#d6e3ee',
          200: '#aec7dc',
          300: '#7fa4c2',
          400: '#4d7aa3',
          500: '#2b5580',
          600: '#133a5f',
          700: '#082c49',
          800: '#062238',
          900: '#041828',
          950: '#02101c'
        },
        /* Kuning/emas korporat: warna logo, aksen dan ajakan bertindak. */
        accent: {
          50: '#fffbe6',
          100: '#fff3bf',
          200: '#ffe680',
          300: '#ffd633',
          400: '#ffc61a',
          500: '#fcbf01',
          600: '#d9a300',
          700: '#a67a00',
          800: '#7a5a00',
          900: '#5c4300'
        },
        /* Oranye korporat: aksen sekunder sesuai company profile. */
        orange: {
          50: '#fff4e8',
          100: '#ffe1c4',
          200: '#ffc48a',
          300: '#ff9f47',
          400: '#f4841c',
          500: '#e07800',
          600: '#b85f00',
          700: '#8f4900',
          800: '#6b3700',
          900: '#4d2800'
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#475569',
          mute: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora var', 'Sora', 'Inter var', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        container: '80rem'
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.15)'
      }
    }
  },
  plugins: []
}