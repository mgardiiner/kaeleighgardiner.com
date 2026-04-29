/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        plum: {
          900: '#0A0414',
          700: '#533A71',
          500: '#A799B7',
          400: '#C2B5D6',
          50:  '#FEF9FF',
          25:  '#FDF3FF',
        },
        paper:  '#FCFBFB',
        cream:  '#FFF7E8',
        sage:   '#E8F1E5',
        sky:    '#E7F0F7',
        butter: '#FFF8D6',
        chip: {
          orange: '#FFF0D9',
          purple: '#F0E7FC',
          blue:   '#E7F4FC',
          green:  '#E7FFE4',
          yellow: '#FCFFD2',
        },
      },
      fontFamily: {
        sans:    ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Roboto', 'sans-serif'],
        serif:   ['Playfair Display', 'Georgia', 'serif'],
        script:  ['Arizonia', 'cursive'],
      },
      boxShadow: {
        'card-home':  '0 6px 64px rgba(112,144,176,0.10)',
        'card-proto': '0 6px 32px rgba(112,144,176,0.10)',
        'hero-img':   '0 24px 48px rgba(0,0,0,0.25)',
        'card-img':   '0 12px 24px rgba(0,0,0,0.18)',
      },
    },
  },
}
