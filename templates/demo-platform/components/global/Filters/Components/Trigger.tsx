import {useAtomValue} from 'jotai'
import {Badge} from '~/components/elements/Badge'
import {ButtonIcon} from '~/components/elements/Button'
import {IconFilter} from '~/components/elements/Icons'
import {tailwindMerge} from '~/helpers'
import {numFiltersAppliedAtom} from '../store'

export function Trigger(props: any) {
  const numFiltersApplied = useAtomValue(numFiltersAppliedAtom)
  return (
    <div className="relative">
      <ButtonIcon
        {...props}
        className={tailwindMerge(
          'bg-gray-300 transition-none md:w-auto md:gap-[3px] md:px-unit-4',
          numFiltersApplied ? 'w-auto pl-unit-2 pr-unit-9 md:pr-unit-9' : '',
        )}
        aria-label="Filter"
      >
        <IconFilter />
        <span className="hidden font-semibold md:block">Filters</span>
      </ButtonIcon>
      {!!numFiltersApplied && (
        <Badge className="bottom-unit-2 right-[12px] h-unit-4 w-unit-4 border-none text-sm leading-sm">
          {numFiltersApplied}
        </Badge>
      )}
    </div>
  )
}
