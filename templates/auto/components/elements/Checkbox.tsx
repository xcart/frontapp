import {useId} from 'react'
import * as CheckboxBase from '@radix-ui/react-checkbox'
import {tailwindMerge} from '~/helpers'
import {IconCheckMark} from './Icons'

export function Checkbox({
  label,
  checked,
  onChange,
  wrapperClasses,
  checkboxBaseClasses,
  checkboxIndicatorClasses,
  checkMarkClasses,
  labelClasses,
  name,
}: {
  label: React.ReactElement | string
  checked: boolean
  onChange: (checked: CheckboxBase.CheckedState) => void
  wrapperClasses?: string
  checkboxBaseClasses?: string
  checkboxIndicatorClasses?: string
  checkMarkClasses?: string
  labelClasses?: string
  name?: string
}) {
  const id = useId()
  return (
    <div className={tailwindMerge('flex items-center', wrapperClasses)}>
      <CheckboxBase.Root
        className="min-h-unit-4 group relative mr-unit h-unit-4 w-unit-4 min-w-unit-4 overflow-hidden rounded-base"
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        name={name}
        aria-label={label.toString()}
      >
        <span
          className={tailwindMerge(
            'absolute bottom-[2px] left-[2px] right-[2px] top-[2px] flex justify-center rounded-sm border border-gray-700 bg-contrast hover:drop-shadow-checkbox group-data-[state=checked]:border-primary',
            checkboxBaseClasses,
          )}
        >
          <CheckboxBase.Indicator
            className={tailwindMerge(
              'flex w-full justify-center bg-primary',
              checkboxIndicatorClasses,
            )}
          >
            <IconCheckMark
              className={tailwindMerge('fill-contrast', checkMarkClasses)}
            />
          </CheckboxBase.Indicator>
        </span>
      </CheckboxBase.Root>
      <label
        className={tailwindMerge(
          'Label cursor-pointer select-none',
          labelClasses,
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}
