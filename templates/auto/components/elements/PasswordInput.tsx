import {forwardRef, ForwardedRef, useState} from 'react'
import {twMerge} from 'tailwind-merge'
import {IButton, ButtonProps, ButtonBase} from '~/components/elements/Button'
import {IconVisible, IconHidden} from '~/components/elements/Icons'
import {InputProps, WrappedInput} from '~/components/elements/Input'

function PasswordVisibilityButton({
  children,
  onClick,
  ...props
}: IButton & ButtonProps) {
  return (
    <ButtonBase
      onClick={onClick}
      tabIndex={-1}
      aria-label="Show password"
      {...props}
    >
      {children}
    </ButtonBase>
  )
}

export const PasswordInput = forwardRef(
  (
    {
      value,
      onChange,
      inputClasses,
      label,
      labelClasses,
      wrapper,
      wrapperClasses,
      error,
      errorText,
      errorTextClasses,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const [type, setType] = useState('password')

    const defaultInputStyles =
      'border border-gray-300 rounded-base transition px-unit-2 py-unit h-unit-8 bg-gray-300 min-w-[280px] w-full max-w-full invalid:border-error invalid:bg-error-alert autofill:bg-gray-300'
    const responsiveStyles = 'lg:h-unit-12 lg:py-unit-3'
    const focusedInputStyles =
      'focus:outline-none focus:bg-contrast focus:border-gray-700 focus:shadow-input'
    const disabledStyles = 'disabled:opacity-20 disabled:pointer-events-none'
    const errorInputStyles = error
      ? 'border-error bg-error-alert focus:border-error'
      : ''
    const inputStyles = twMerge(
      defaultInputStyles,
      responsiveStyles,
      focusedInputStyles,
      disabledStyles,
      inputClasses,
      errorInputStyles,
    )
    const wrapperStyles = label
      ? twMerge('flex flex-col pt-unit-4 relative', wrapperClasses)
      : wrapperClasses

    const labelStyles = twMerge(
      'text-xs text-gray-700 font-medium absolute top-0 left-0',
      labelClasses,
    )

    return (
      <WrappedInput className={wrapperStyles}>
        <span className={labelStyles}>{label}</span>
        <span className="relative">
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={inputStyles}
            {...props}
            ref={ref}
            data-testid="Input"
          />
          <span className="absolute -bottom-[20px] left-0 text-xs text-error">
            {errorText}
          </span>
          <PasswordVisibilityButton
            className="absolute right-unit-2 top-[calc(50%-10px)] outline-none"
            onClick={() => {
              setType(type === 'password' ? 'text' : 'password')
            }}
          >
            {type === 'password' ? <IconVisible /> : <IconHidden />}
          </PasswordVisibilityButton>
        </span>
      </WrappedInput>
    )
  },
)
