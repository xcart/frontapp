import {addons} from '@storybook/addons'
import {AppRouterContext} from 'next/dist/shared/lib/app-router-context'
import {UPDATE_GLOBALS} from '@storybook/core-events'
import {COLORS} from '../components/theme/colors'
import './preview.css'
import '../styles/index.css'

export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: COLORS.contrast.light,
      },
      {
        name: 'dark',
        value: COLORS.contrast.dark,
      },
    ],
  },
  nextRouter: {
    Provider: AppRouterContext.Provider,
  },
}

let channel = addons.getChannel()
let colorMode = 'light'

function addCssVariables() {
  const root = document.documentElement
  root.style.setProperty('--initial-color-mode', colorMode)
  Object.entries(COLORS).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`

    root.style.setProperty(cssVarName, colorByTheme[colorMode as any])
  })
}

addCssVariables()

channel.addListener(UPDATE_GLOBALS, function () {
  colorMode = 'light'

  if (this.args[0].globals.backgrounds.value === COLORS.contrast.dark) {
    colorMode = 'dark'
  }

  addCssVariables()
})
