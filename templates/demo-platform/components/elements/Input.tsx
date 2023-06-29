/* eslint-disable react/prop-types */

'use client'

import {forwardRef, ForwardedRef} from 'react'
import {tailwindMerge} from '~/helpers'

export type InputProps = JSX.IntrinsicElements['input'] & {
  inputClasses?: string
  wrapper?: React.ElementType
  wrapperClasses?: string
  label?: string
  labelClasses?: string
  labelFirst?: boolean
  error?: boolean
  errorText?: string
  errorTextClasses?: string
}

export function WrappedInput({
  wrapper: Component = 'div',
  className,
  children,
}: {
  wrapper?: React.ElementType
  className?: string
  children: React.ReactNode
}) {
  return <Component className={className}>{children}</Component>
}

export const Input = forwardRef(
  (
    {
      type = 'text',
      value,
      onChange,
      inputClasses,
      label,
      labelClasses,
      labelFirst = false,
      wrapper,
      wrapperClasses,
      error,
      errorText,
      errorTextClasses = 'absolute -bottom-[20px] left-0 text-xs text-error',
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const defaultInputStyles =
      'border border-gray-300 rounded-base transition px-unit-2 py-unit h-unit-8 bg-gray-300 min-w-[280px] w-full max-w-full invalid:border-error invalid:bg-error-alert autofill:bg-gray-300'
    const responsiveStyles = 'lg:h-unit-12 lg:py-unit-3'
    const focusedInputStyles =
      'focus:outline-none focus:bg-contrast focus:border-gray-700 focus:shadow-input'
    const disabledStyles = 'disabled:opacity-20 disabled:pointer-events-none'
    const errorInputStyles = error
      ? 'border-error bg-error-alert focus:border-error'
      : ''
    const inputStyles = tailwindMerge(
      defaultInputStyles,
      responsiveStyles,
      focusedInputStyles,
      disabledStyles,
      inputClasses,
      errorInputStyles,
    )

    const labelStyles = tailwindMerge(
      'text-xs text-gray-700 font-medium absolute top-0 left-0',
      labelClasses,
    )

    const wrapperStyles = label
      ? tailwindMerge('flex flex-col pt-unit-4 relative', wrapperClasses)
      : wrapperClasses

    const renderInputField = () => (
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
        <span className={errorTextClasses}>{errorText}</span>
      </span>
    )

    const renderLabel = () => <span className={labelStyles}>{label}</span>

    const renderWrapped = () => {
      return (
        <WrappedInput className={wrapperStyles}>
          {labelFirst && renderLabel()}
          {renderInputField()}
          {!labelFirst && renderLabel()}
        </WrappedInput>
      )
    }

    return label ? renderWrapped() : renderInputField()
  },
)
