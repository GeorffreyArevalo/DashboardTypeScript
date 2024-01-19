import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,js}"],
  theme: {
    extend: {
      colors: {
        'primary': '#247B7B',
        'primary-demon': '#0D5C63',
        'primary-thin': '#44A1A0',
        'secondary': '#E9ECEF',
        'secondary-demon': '#DDD',

        'primary-dark': '#14181D',
        'primary-demon-dark': '#07080A',
        'primary-thin-dark': '#212930',
        'secondary-dark': '#3B4956',
        'secondary-demon-dark': '#2E3943'
      },
      margin: {
        'l-5per-n': '0 0 0 -0.5rem'
      },
      height: {
        '9/10': '90%',
        '5rem-n': 'calc(100dvh - 5rem)',
        '112': '28rem'
      },
      translate: {
        '52-n': '-13rem',
        '72-n': '-18rem'
      }
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.menu': {
          with: '20%',
          backgroundColor: '#247B7B',
          padding: '2rem 0rem 2rem 1.25rem',
          borderTopRightRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '300ms',
          position: 'relative',
          color: '#FFFFFF',
          '.btn-menu': {
            padding: '0.5rem',
            borderRadius: '9999px',
            transitionProperty: 'all',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '300ms',
            '&:hover': {
              backgroundColor: '#0D5C63',
            }
          },
          'li': {
            padding: '0.75rem',
            borderTopLeftRadius: '9999px',
            borderBottomLeftRadius: '9999px',
            cursor: 'pointer',
            transitionProperty: 'all',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '300ms',
            marginTop: '0.5rem',
            'a': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '0.5rem',
            }
          },
          'span': {
            scale: '1',
            transitionProperty: 'all',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '150ms',
          },
          'p':{
            scale: '0',
            transitionProperty: 'all',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '150ms',
          },
          'footer':{
            scale: '1',
            transitionProperty: 'all',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '150ms',
          }
        },
        '.menu-sm': {
          width: '5%',
          padding: '2rem 0rem 2rem 1rem',
          margin: '0 auto',
          'span': {
            scale: '0'
          },
          'p': {
            scale: '1'
          },
          'footer': {
            scale: '0'
          }
        }
      })

    }),
  ],
  darkMode: 'class'
}

