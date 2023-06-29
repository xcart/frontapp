'use client'

export type ButtonProps = JSX.IntrinsicElements['button']

export interface IButtonBase {
  buttonTitle?: string
  children?: React.ReactNode
}

export function ButtonBase({
  type = 'button',
  buttonTitle,
  children,
  onClick,
  disabled,
  ...props
}: ButtonProps & IButtonBase) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} {...props}>
      {buttonTitle || children}
    </button>
  )
}
