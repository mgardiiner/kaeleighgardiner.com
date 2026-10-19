import plugin from 'tailwindcss/plugin'

// Shared redesign patterns. Registered as components so utility classes
// (e.g. a different tracking on .mono-label) still win.
const patterns = plugin(({ addComponents }) => {
  addComponents({
    '.container-x': {
      maxWidth: '1440px',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 'clamp(20px, 4.4vw, 64px)',
      paddingRight: 'clamp(20px, 4.4vw, 64px)',
    },
    '.mono-label': {
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: '12px',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    // Marker highlight behind TL;DR lines.
    '.marker': {
      background: 'linear-gradient(transparent 56%, #FFE58F 56%)',
      padding: '0 2px',
    },
    // A masked headline line; the inner [data-reveal="mask"] slides up into it.
    '.mask-line': {
      display: 'block',
      overflow: 'hidden',
      paddingBottom: '0.14em',
      marginBottom: '-0.1em',
    },
    // Text that fills ink-over-faded in reading order as --e (useScrollFx) grows.
    '.scroll-fill': {
      backgroundImage:
        'linear-gradient(90deg, #24163A calc((var(--e, 1) * 2.6 - 0.45) * 100%), var(--fill-faded, rgba(36,22,58,0.16)) calc((var(--e, 1) * 2.6 - 0.45) * 100%))',
      '-webkit-background-clip': 'text',
      backgroundClip: 'text',
      color: 'transparent',
    },
    // Masking-tape strip centred on a figure's top edge.
    '.tape': {
      position: 'absolute',
      left: '50%',
      background: 'rgba(194,181,214,0.8)',
      pointerEvents: 'none',
    },
  })
})

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [patterns],
  // JSON is scanned because data carries class names (e.g. about.json whatIDo[].bg).
  content: ['./app/**/*.{vue,js,ts}', './app/data/**/*.json'],
  theme: {
    extend: {
      screens: {
        // Home nav links + Résumé button appear from 900px.
        nav: '900px',
        // Case-study "Contents" side nav appears from 1000px.
        toc: '1000px',
      },
      colors: {
        ink: '#24163A',
        deep: '#352452',
        // DEFAULT is the redesign's plum; the numbered shades are kept for
        // the admin editor and its preview components.
        plum: {
          DEFAULT: '#533A71',
          900: '#0A0414',
          700: '#533A71',
          500: '#A799B7',
          400: '#C2B5D6',
          50:  '#FEF9FF',
          25:  '#FDF3FF',
        },
        lavender: '#D4C1F4',
        'lavender-2': '#C2B5D6',
        'lavender-bg': '#F1EAFA',
        'lavender-hover': '#E6DAFA',
        paper: '#FBF6FD',
        sage: '#E8F1E5',
        sky: '#E7F0F7',
        cream: '#FFF7E8',
        butter: '#FFF8D6',
        highlighter: '#FFE58F',
        text: '#43345A',
        muted: '#66577A',
        'on-dark': '#DCD1E8',
        'on-dark-muted': '#B6A7C9',
        'status-green': '#9BE3A4',
        'issue-red': '#B0444A',
        chip: {
          orange: '#FFF0D9',
          purple: '#F0E7FC',
          blue:   '#E7F4FC',
          green:  '#E7FFE4',
          yellow: '#FCFFD2',
        },
      },
      fontFamily: {
        sans:    ['Figtree', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
        serif:   ['Playfair Display', 'Georgia', 'serif'],
        script:  ['Arizonia', 'cursive'],
      },
      fontSize: {
        'hero-h1': 'clamp(27px, 3.9vw, 60px)',
        'case-h1': 'min(clamp(34px, 5.4vw, 92px), calc((100vw - 40px) / 8.8))',
        'home-h2': 'clamp(30px, 3.4vw, 52px)',
        'case-h2': 'clamp(23px, 2.1vw, 30px)',
        lede: 'clamp(17px, 1.4vw, 20px)',
        'stat-home': 'clamp(48px, 4.6vw, 72px)',
        'stat-case': 'clamp(34px, 3vw, 46px)',
        'stat-result': 'clamp(40px, 3.8vw, 58px)',
        numeral: 'clamp(44px, 4.4vw, 64px)',
      },
      boxShadow: {
        note:   '0 10px 24px rgba(36,22,58,0.08)',
        taped:  '0 18px 40px rgba(36,22,58,0.12)',
        panel:  '0 30px 60px rgba(36,22,58,0.18)',
        'card-home':  '0 6px 64px rgba(112,144,176,0.10)',
        'card-proto': '0 6px 32px rgba(112,144,176,0.10)',
        'hero-img':   '0 24px 48px rgba(0,0,0,0.25)',
        'card-img':   '0 12px 24px rgba(0,0,0,0.18)',
      },
      transitionTimingFunction: {
        fx: 'cubic-bezier(.16,.84,.24,1)',
      },
    },
  },
}
