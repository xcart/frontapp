import {useId} from 'react'
import * as CheckboxBase from '@radix-ui/react-checkbox'
import {IconCheckMark} from './Icons'

export function Checkbox({
  label,
  checked,
  onChange,
  name,
}: {
  label: React.ReactElement | string
  checked: boolean
  onChange: (checked: CheckboxBase.CheckedState) => void
  name?: string
}) {
  const id = useId()
  return (
    <div className="flex items-center">
      <CheckboxBase.Root
        className="min-h-unit-4 group relative mr-unit h-unit-4 w-unit-4 min-w-unit-4 overflow-hidden rounded-base"
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        name={name}
        aria-label={label.toString()}
      >
        <span className="absolute bottom-[2px] left-[2px] right-[2px] top-[2px] flex justify-center rounded-sm border border-gray-700 bg-contrast hover:drop-shadow-checkbox group-data-[state=checked]:border-primary">
          <CheckboxBase.Indicator className="flex w-full justify-center bg-primary">
            <IconCheckMark className="fill-contrast" />
          </CheckboxBase.Indicator>
        </span>
      </CheckboxBase.Root>
      <label className="Label cursor-pointer select-none" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
