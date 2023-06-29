'use client'

import {ButtonIcon} from '~/components/elements/Button'
import {IconClose, IconSearch} from '~/components/elements/Icons'
import {Input} from '~/components/elements/Input'
import {tailwindMerge} from '~/helpers'

export function SearchField({
  value,
  changeHandler,
  placeholder = 'Search',
}: {
  value?: string
  placeholder?: string
  changeHandler: (value: string) => void
}) {
  return (
    <span className="relative block w-full">
      <IconSearch className="absolute left-[12px] top-1/2 z-[1] flex -translate-y-1/2 items-center justify-center" />
      <Input
        className={tailwindMerge(
          'relative h-unit-8 w-full rounded-base border border-gray-300 bg-gray-300 pl-unit-8 text-left text-gray-700 transition-colors placeholder:text-gray-700 hover:bg-gray-500 lg:block lg:h-unit-12',
          value !== '' ? 'border-gray-500 pr-unit-8' : '',
        )}
        onChange={event => changeHandler(event.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        value={value || ''}
      />
      {value && value.length > 0 && (
        <ButtonIcon
          className="absolute right-0 top-0 z-[1] bg-transparent hover:bg-transparent lg:top-unit-2"
          onClick={() => changeHandler('')}
        >
          <IconClose className="w-unit-3" />
        </ButtonIcon>
      )}
    </span>
  )
}
