'use client'

import {
  ButtonBase,
  IButtonBase,
  ButtonProps,
} from '~/components/elements/Button/ButtonBase'
import {tailwindMerge} from '~/helpers'

export function ButtonIcon({
  children,
  className,
  onClick,
  disabled,
  ...props
}: IButtonBase & ButtonProps) {
  const disabledStyles = disabled ? 'opacity-20 pointer-events-none' : ''
  const buttonStyles = tailwindMerge(
    'transition w-unit-8 rounded h-unit-8 border-0 hover:bg-gray-300 flex items-center justify-center',
    className,
    disabledStyles,
  )

  return (
    <ButtonBase
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonBase>
  )
}
