'use client'

import {Button, IButton} from '~/components/elements/Button/Button'
import {ButtonProps} from '~/components/elements/Button/ButtonBase'
import {Spinner} from '~/components/elements/Spinner'
import {tailwindMerge} from '~/helpers'

export function ButtonWithSpinner({
  variant = 'primary',
  children,
  onClick,
  className,
  buttonTitle,
  disabled,
  showSpinner,
  ...props
}: {showSpinner: boolean} & IButton & ButtonProps) {
  return (
    <Button
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <div className="relative">
        <span className={showSpinner ? 'invisible' : ''}>{buttonTitle}</span>
        {showSpinner && (
          <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-center">
            <Spinner
              size="w-[14px] h-[14px] lg:w-[22px] lg:h-[22px]"
              spinnerClasses={tailwindMerge(
                variant === 'primary' ? 'border-contrast' : 'border-primary',
                'border-r-transparent',
              )}
            />
          </div>
        )}
      </div>
    </Button>
  )
}
