'use client'

import {createContext, useState, useEffect, useMemo} from 'react'
import {COLORS} from '../theme/colors'
import type {ColorMode} from '../theme/colors'

interface ColorModeContextInterface {
  colorMode: string
  setColorMode: (newValue: ColorMode) => void
}

export const ColorModeContext = createContext<
  ColorModeContextInterface | undefined
>(undefined)

export function ColorModeProvider({children}: {children: React.ReactNode}) {
  const [colorMode, rawSetColorMode] = useState('')

  useEffect(() => {
    const root = window.document.documentElement

    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode',
    )

    rawSetColorMode(initialColorValue)
  }, [])

  const contextValue: ColorModeContextInterface = useMemo(() => {
    function setColorMode(newValue: ColorMode) {
      const root = window.document.documentElement

      localStorage.setItem('color-mode', newValue)

      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`

        root.style.setProperty(cssVarName, colorByTheme[newValue])
      })

      rawSetColorMode(newValue)
    }

    return {
      colorMode,
      setColorMode,
    }
  }, [colorMode, rawSetColorMode])

  return (
    <ColorModeContext.Provider value={contextValue}>
      {children}
    </ColorModeContext.Provider>
  )
}
