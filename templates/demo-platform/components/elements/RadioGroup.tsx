import {useId} from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import {IconCheckMark} from './Icons'

function RadioOption({option}: {option: any}) {
  const id = useId()

  return (
    <div className="flex items-start">
      <RadixRadioGroup.Item
        className="min-h-unit-4 group relative top-[4.5px] mr-unit h-unit-4 w-unit-4 min-w-unit-4 overflow-hidden"
        value={String(option.value)}
        id={id}
      >
        <span className="absolute bottom-[2px] left-[2px] right-[2px] top-[2px] flex justify-center rounded-full border border-gray-700 bg-contrast hover:drop-shadow-checkbox group-data-[state=checked]:border-primary">
          <RadixRadioGroup.Indicator className="flex w-full justify-center rounded-full bg-primary">
            <IconCheckMark className="fill-contrast" />
          </RadixRadioGroup.Indicator>
        </span>
      </RadixRadioGroup.Item>
      <label htmlFor={id}>{option.name}</label>
    </div>
  )
}

export function RadioGroup({
  value,
  onChange,
  name,
  options,
}: {
  value: string
  onChange?: (v: string) => void
  name?: string
  options: any[]
}) {
  return (
    <RadixRadioGroup.Root
      onValueChange={onChange}
      name={name}
      defaultValue={value}
      className="flex flex-col gap-unit-3"
    >
      {options.map((o: any) => {
        return <RadioOption key={o.value} option={o} />
      })}
    </RadixRadioGroup.Root>
  )
}
