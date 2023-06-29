/*
This code inspired by (and mostly taken from) https://joshwcomeau.com/gatsby/dark-mode/
*/

// import Terser from 'terser'
import {COLORS} from './colors'

export function setColorsByTheme() {
  const colors = '_COLORS_PLACEHOLDER_'

  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkFromMQ = mql.matches
  const persistedPreference = localStorage.getItem('color-mode')

  let colorMode = 'light'

  const hasUsedToggle = typeof persistedPreference === 'string'

  if (hasUsedToggle) {
    colorMode = persistedPreference
  } else {
    colorMode = prefersDarkFromMQ ? 'dark' : 'light'
  }

  const root = document.documentElement

  root.style.setProperty('--initial-color-mode', colorMode)

  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`

    root.style.setProperty(cssVarName, colorByTheme[colorMode as any])
  })
}

export function MagicScriptTag() {
  const boundFn = String(setColorsByTheme).replace(
    '"_COLORS_PLACEHOLDER_"',
    JSON.stringify(COLORS),
  )

  const calledFunction = `(${boundFn})()`

  // Terser.minify(calledFunction).then(res => {
  //   if (res.code) {
  //     calledFunction = res.code
  //   }
  // })

  return <script dangerouslySetInnerHTML={{__html: calledFunction}} />
}
