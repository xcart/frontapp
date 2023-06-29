import {
  ButtonBase,
  IButtonBase,
  ButtonProps,
} from '~/components/elements/Button/ButtonBase'
import {tailwindMerge} from '~/helpers'

export interface IButton extends IButtonBase {
  variant?: 'primary' | 'secondary' | 'light'
}

export function Button({
  variant = 'primary',
  children,
  onClick,
  className,
  buttonTitle,
  disabled,
  ...props
}: IButton & ButtonProps) {
  const baseStyles =
    'rounded border-2 px-button-horz py-button font-semibold transition lg:text-lg lg:py-unit-3 lg:py-button-lg'
  const primary = 'bg-primary border-primary text-contrast hover:opacity-80'
  const secondary = 'border-primary text-primary bg-contrast hover:opacity-80'
  const light =
    'bg-gray-300 border-gray-300 text-primary hover:bg-gray-500 hover:border-gray-500'
  const secondaryOrLight = variant === 'secondary' ? secondary : light
  const disabledStyles = disabled ? 'opacity-20 pointer-events-none' : ''
  const variantStyles = variant === 'primary' ? primary : secondaryOrLight
  const buttonStyles = tailwindMerge(
    baseStyles,
    variantStyles,
    className,
    disabledStyles,
  )

  return (
    <ButtonBase
      className={buttonStyles}
      buttonTitle={buttonTitle}
      onClick={onClick}
      disabled={disabled}
      aria-label={buttonTitle || undefined}
      {...props}
    >
      {buttonTitle || children}
    </ButtonBase>
  )
}
