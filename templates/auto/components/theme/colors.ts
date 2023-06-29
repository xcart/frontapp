interface LightDarkColor {
  light: string
  dark: string
}

export type ColorMode = keyof LightDarkColor

export const COLORS: Record<string, LightDarkColor> = {
  primary: {
    light: '#463E3E',
    dark: '#f6f6f6',
  },
  contrast: {
    light: '#ffffff',
    dark: '#292929',
  },
  'gray-50': {
    light: '#fdfdfd',
    dark: '#463E3E',
  },
  'gray-300': {
    light: '#F6F6F6',
    dark: '#323232',
  },
  'gray-500': {
    light: '#DEDEDE',
    dark: '#6E6E6E',
  },
  'gray-700': {
    light: '#6E6E6E',
    dark: '#a1a1a1',
  },
  error: {
    light: '#D92020',
    dark: '#FF7D7D',
  },
  'error-alert': {
    light: '#FEE9E9',
    dark: '#432C2C',
  },
  warning: {
    light: '#FFF1D9',
    dark: '#46361B',
  },
  success: {
    light: '#D4F9DC',
    dark: '#24341D',
  },
  'box-shadow': {
    light: '70, 62, 62',
    dark: '246, 246, 246',
  },
  'invariant-light': {
    light: '#ffffff',
    dark: '#ffffff',
  },
  'invariant-dark': {
    light: '#463E3E',
    dark: '#463E3E',
  },
  'invariant-mmy-dark': {
    light: '#323232',
    dark: '#323232',
  },
  'invariant-gray-300': {
    light: '#f6f6f6',
    dark: '#f6f6f6',
  },
  'invariant-gray-500': {
    light: '#DEDEDE',
    dark: '#DEDEDE',
  },
  'checkbox-shadow': {
    light: '110, 110, 110',
    dark: '161, 161, 161',
  },
  'light-green': {
    light: '#D4F9DC',
    dark: '#D4F9DC',
  },
  violet: {
    light: '#872B9A',
    dark: '#D473E7',
  },
  'fit-green': {
    light: '#427C03',
    dark: '#64A71B',
  },
  navy: {
    light: '#057A8F',
    dark: '#139EB5',
  },
  'fit-custom': {
    light: '#A85F43',
    dark: '#DB8461',
  },
}
