const {fontFamily} = require('tailwindcss/defaultTheme')

// Basic rhythmic unit
const BASE_UNIT = 5
const BUTTON_BORDER = 2
const PRODUCT_IMAGE_WIDTH = 620

const unitSizes = {
  unit: BASE_UNIT,
  'unit-2': BASE_UNIT * 2,
  'unit-3': BASE_UNIT * 3,
  'unit-4': BASE_UNIT * 4,
  'unit-5': BASE_UNIT * 5,
  'unit-6': BASE_UNIT * 6,
  'unit-7': BASE_UNIT * 7,
  'unit-8': BASE_UNIT * 8,
  'unit-9': BASE_UNIT * 9,
  'unit-10': BASE_UNIT * 10,
  'unit-11': BASE_UNIT * 11,
  'unit-12': BASE_UNIT * 12,
  'unit-13': BASE_UNIT * 13,
  'unit-14': BASE_UNIT * 14,
  'unit-15': BASE_UNIT * 15,
  'unit-16': BASE_UNIT * 16,
  'unit-17': BASE_UNIT * 17,
  'unit-18': BASE_UNIT * 18,
  'unit-19': BASE_UNIT * 19,
  'unit-20': BASE_UNIT * 20,
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{app,components,stories}/**/*.{js,jsx,ts,tsx}',
    '../../packages/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        base: '0.25rem',
      },
      boxShadow: {
        input: '0 0 10px rgba(var(--color-box-shadow), 0.2)',
        overlay: '0px 2px 10px rgba(var(--color-box-shadow), 0.2)',
        top: '5px 0 20px rgba(var(--color-box-shadow), 0.1)',
        bottom: '0 -5px 20px rgba(var(--color-box-shadow), 0.1)',
      },
      dropShadow: {
        checkbox: '0 0 10px rgba(var(--color-checkbox-shadow))',
      },
      lineHeight: {
        base: '1.875rem', // 30px
        sm: '1.25rem', // 20px
        h1: '2.5rem', // 40px
        h2: '1.875rem',
        h3: '1.875rem',
        h4: '1.25rem',
      },
      fontSize: {
        '3xs': ['0.5rem', '1rem'],
        xxs: ['0.625rem', '1rem'],
        xs: ['0.75rem', '1.25rem'],
        base: ['1rem', '1.875rem'],
        lg: ['1.125rem', '1.875rem'],
      },
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans],
      },
      colors: {
        primary: 'var(--color-primary)',
        contrast: 'var(--color-contrast)',
        gray: {
          50: 'var(--color-gray-50)',
          300: 'var(--color-gray-300)',
          500: 'var(--color-gray-500)',
          700: 'var(--color-gray-700)',
        },
        error: 'var(--color-error)',
        'error-alert': 'var(--color-error-alert)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        'invariant-light': 'var(--color-invariant-light)',
        'invariant-dark': 'var(--color-invariant-dark)',
        'light-green': 'var(--color-light-green)',
        violet: 'var(--color-violet)',
        navy: 'var(--color-navy)',
        'fit-green': 'var(--color-fit-green)',
        'fit-custom': 'var(--color-fit-custom)',
        'auto-dark': '#323232',
        'invariant-mmy-dark': 'var(--color-invariant-mmy-dark)',
        'invariant-gray-300': 'var(--color-invariant-gray-300)',
        'invariant-gray-500': 'var(--color-invariant-gray-500)',
      },
      height: {
        header: BASE_UNIT * 12,
        'mmy-filter-lg': BASE_UNIT * 14,
        ...unitSizes,
      },
      width: {
        'product-image': PRODUCT_IMAGE_WIDTH,
        ...unitSizes,
      },
      minHeight: {
        ...unitSizes,
      },
      minWidth: {
        ...unitSizes,
      },
      maxWidth: {
        page: '1920px',
        'page-inner': '1760px',
      },
      padding: {
        'button-thin': BASE_UNIT - 1,
        button: BASE_UNIT - BUTTON_BORDER,
        input: BASE_UNIT - 1,
        'button-lg': BASE_UNIT * 3 - BUTTON_BORDER,
        'input-lg': BASE_UNIT * 3 - 1,
        'button-horz': BASE_UNIT * 8 - BUTTON_BORDER,
        ...unitSizes,
      },
      inset: {
        ...unitSizes,
      },
      margin: {
        ...unitSizes,
      },
      gap: {
        ...unitSizes,
      },
      keyframes: {
        accordionSlideDown: {
          '0%': {
            opacity: 0,
            height: 0,
          },
          '100%': {
            opacity: 1,
            height: 'var(--radix-accordion-content-height)',
          },
        },
        accordionSlideUp: {
          '0%': {
            opacity: 1,
            height: 'var(--radix-accordion-content-height)',
          },
          '100%': {
            opacity: 0,
            height: 0,
          },
        },
        rotate180: {
          '0%': {
            transform: 'rotate(0)',
          },
          '100%': {
            transform: 'rotate(180deg)',
          },
        },
        rotate360: {
          '0%': {
            transform: 'rotate(0)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        searchPanelIn: {
          '0%': {
            flexGrow: 0,
            height: 0,
          },
          '100%': {
            flexGrow: 1,
            height: 'auto',
          },
        },
        searchWrapperOut: {
          '0%': {
            width: '100%',
            height: '100vh',
            opacity: 1,
          },
          '100%': {
            width: 0,
            height: 0,
            opacity: 0,
          },
        },
        skeleton: {
          '0%': {
            backgroundColor: 'var(--color-gray-300)',
          },
          '50%': {
            backgroundColor: 'var(--color-gray-50)',
          },
          '100%': {
            backgroundColor: 'var(--color-gray-300)',
          },
        },
      },
      animation: {
        accordionSlideDown:
          'accordionSlideDown .1s cubic-bezier(0.87, 0, 0.13, 1)',
        accordionSlideUp: 'accordionSlideUp .1s cubic-bezier(0.87, 0, 0.13, 1)',
        rotate180: 'rotate180 .2s ease',
        rotate360: 'rotate360 1s infinite linear',
        searchPanelIn: 'searchPanelIn .6s ease .5s',
        searchPanelOut: 'searchPanelOut .3s cubic-bezier(0.87, 0, 0.13, 1)',
        skeleton: 'skeleton 2s infinite linear',
      },
      zIndex: {
        dropdown: 100,
        'mmy-filter': 180,
        header: 200,
        modal: 300,
      },
      transitionProperty: {
        height: 'height',
      },
      top: {
        header: BASE_UNIT * 12,
        ...unitSizes,
      },
      right: {...unitSizes},
      left: {...unitSizes},
      bottom: {...unitSizes},
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    function ({addBase, theme}) {
      addBase({
        h1: {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.h1'),
          [`@media (min-width: ${theme('screens.lg')})`]: {
            fontSize: '2rem',
          },
        },
        h2: {
          fontSize: theme('fontSize.xl'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.h2'),
          [`@media (min-width: ${theme('screens.lg')})`]: {
            fontSize: theme('fontSize.2xl'),
            lineHeight: theme('lineHeight.h1'),
          },
        },
        h3: {
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.h3'),
          [`@media (min-width: ${theme('screens.lg')})`]: {
            fontSize: theme('fontSize.lg'),
          },
        },
        h4: {
          fontSize: theme('fontSize.xs'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.h4'),
          [`@media (min-width: ${theme('screens.lg')})`]: {
            fontSize: theme('fontSize.base'),
            lineHeight: theme('lineHeight.base'),
          },
        },
      })
    },
  ],
}
