'use client'

import {SelectBase, IOption} from '~/components/elements/Select/SelectBase'
import {tailwindMerge} from '~/helpers'

export function Select({
  id,
  defaultValue,
  options,
  selectClasses,
  selectWrapperClass,
  selectedOptionClasses,
  optionClasses,
  optionsDropdownClasses,
  handleSelectChange,
  disabledOption,
  placeHolderName,
  hideInitialOption,
  ...props
}: {
  id?: string | number
  defaultValue?: string
  options: IOption[]
  selectClasses?: string
  selectWrapperClass?: string
  selectedOptionClasses?: string
  optionClasses?: string
  optionsDropdownClasses?: string
  handleSelectChange?: (values: any) => void
  disabledOption?: boolean
  placeHolderName?: string
  hideInitialOption?: boolean
}) {
  const baseSelectedOptionClasses =
    'transition bg-gray-300 border border-gray-300 rounded-base py-unit pl-unit-2 pr-unit-8 h-unit-8 lg:py-input-lg lg:h-unit-12 data-[state=open]:bg-contrast data-[state=open]:border-gray-700 data-[state=open]:shadow-[0px_0px_10px_rgba(70,62,62,0.2)]'

  return (
    <span
      className={tailwindMerge(
        'relative flex max-w-[500px]',
        selectWrapperClass,
      )}
    >
      <SelectBase
        id={id}
        defaultValue={defaultValue}
        options={options}
        selectClasses={tailwindMerge('w-full', selectClasses)}
        selectedOptionClasses={tailwindMerge(
          baseSelectedOptionClasses,
          selectedOptionClasses,
          disabledOption ? 'opacity-50' : '',
        )}
        optionClasses={optionClasses}
        optionsDropdownClasses={tailwindMerge('w-full', optionsDropdownClasses)}
        handleChange={handleSelectChange}
        placeHolderName={placeHolderName}
        showArrow
        hideInitialOption={hideInitialOption}
        {...props}
      />
    </span>
  )
}
