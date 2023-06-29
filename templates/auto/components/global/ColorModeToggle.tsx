'use client'

import {useContext, useEffect, useRef, useState} from 'react'
import {ButtonIcon} from '~/components/elements/Button'
import {IconDark, IconLight} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'
import {ColorModeContext} from '../providers/ColorModeContext'

export function ColorModeToggle() {
  const [mounted, setMounted] = useState(false)
  const darkMode = useContext(ColorModeContext)

  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!darkMode?.colorMode) {
    return null
  }

  const {colorMode, setColorMode} = darkMode

  const iconStyles = 'transition fill-current w-unit-4'
  const disabledIconStyles = tailwindMerge(
    iconStyles,
    'opacity-20 group-hover:opacity-100',
  )
  const buttonStyles =
    'group bg-contrast w-unit-10 h-unit-8 flex items-center justify-center py-unit px-unit-2 rounded-none hover:bg-gray-500'
  const unselected = !mounted ? {opacity: '0.2'} : undefined

  return (
    <div className="mb-unit-8 flex w-fit items-center rounded-base bg-contrast lg:mb-auto lg:mr-unit-8">
      <ButtonIcon
        className={tailwindMerge(
          buttonStyles,
          'rounded-bl-base rounded-tl-base',
          colorMode === 'light' ? 'pointer-events-none' : '',
        )}
        onClick={() => setColorMode('light')}
        onMouseEnter={() => {
          if (ref.current) {
            ref.current.style.height = '40px'
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.style.removeProperty('height')
          }
        }}
        aria-label="Light"
      >
        <IconLight
          className={colorMode === 'dark' ? disabledIconStyles : iconStyles}
          style={unselected}
        />
      </ButtonIcon>
      <span ref={ref} className="h-unit-4 w-px bg-gray-500 transition-height" />
      <ButtonIcon
        className={tailwindMerge(
          buttonStyles,
          'rounded-br-base rounded-tr-base',
          colorMode === 'dark' ? 'pointer-events-none' : '',
        )}
        onClick={() => setColorMode('dark')}
        onMouseEnter={() => {
          if (ref.current) {
            ref.current.style.height = '40px'
          }
        }}
        onMouseLeave={() => {
          if (ref.current) {
            ref.current.style.removeProperty('height')
          }
        }}
        aria-label="Dark"
      >
        <IconDark
          className={
            colorMode === 'light'
              ? tailwindMerge(disabledIconStyles, 'h-unit-3')
              : tailwindMerge(iconStyles, 'h-unit-3')
          }
          style={unselected}
        />
      </ButtonIcon>
    </div>
  )
}
