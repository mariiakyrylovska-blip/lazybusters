/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        mint: {
          50: 'var(--color-mint-50)',
          100: 'var(--color-mint-100)',
          200: 'var(--color-mint-200)',
          300: 'var(--color-mint-300)',
        },
        peach: {
          50: 'var(--color-peach-50)',
          100: 'var(--color-peach-100)',
          200: 'var(--color-peach-200)',
        },
        fog: {
          50: 'var(--color-fog-50)',
          100: 'var(--color-fog-100)',
          200: 'var(--color-fog-200)',
        },
        font: {
          primary: 'var(--font-color-primary)',
          muted: 'var(--font-color-muted)',
          soft: 'var(--font-color-soft)',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive'],
        body: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 12px 24px rgba(94, 66, 40, 0.12)',
        soft: '0 8px 16px rgba(94, 66, 40, 0.08)',
      },
    },
  },
  plugins: [],
}
