import {useEffect, useRef, useState} from 'react'
import {useSetAtom} from 'jotai'
import {Button} from '~/components/elements/Button'
import {tailwindMerge} from '~/helpers'
import {
  FilterValue,
  Facet,
  toggleFilterValueAtom,
  reloadFacetsAtom,
  showMoreAtom,
} from '../../store'

function Block({value, selected}: {value: FilterValue; selected: boolean}) {
  const toggleFilterValue = useSetAtom(toggleFilterValueAtom)
  const reloadFacets = useSetAtom(reloadFacetsAtom)

  const change = () => {
    toggleFilterValue(value)
    reloadFacets()
  }

  const attributeClasses = selected ? '' : 'border-gray-500'

  return (
    <Button
      variant={selected ? 'primary' : 'secondary'}
      className={tailwindMerge(
        'relative rounded-base border px-unit-4 font-normal lg:py-button-thin lg:text-base',
        attributeClasses,
      )}
      onClick={change}
      aria-label={value.value}
    >
      <span className="block min-w-unit-6 opacity-0">{value.value}</span>
      <span
        className={tailwindMerge(
          '-z-1 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap',
          selected ? 'font-medium' : '',
        )}
      >
        {value.value}
      </span>
    </Button>
  )
}

export function Blocks({
  facet: {id, name, counts, unfolded, expanded},
}: {
  facet: Facet
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasMore, setHasMore] = useState(false)
  const showMore = useSetAtom(showMoreAtom)

  useEffect(() => {
    if (ref.current) {
      setHasMore(ref.current.scrollHeight > 90)
    }
  }, [counts, setHasMore])

  const valueMapper = ({value, selected}: any) => {
    return (
      <Block key={value} value={{facetId: id, value}} selected={selected} />
    )
  }

  return (
    <div>
      <div className="mb-unit-3 text-sm font-medium md:text-base">{name}</div>

      {expanded && (
        <>
          <div
            className={tailwindMerge(
              'flex flex-row flex-wrap gap-unit-2 overflow-hidden',
              !unfolded ? 'max-h-[90px]' : '',
            )}
            ref={ref}
          >
            {counts.map(valueMapper)}
          </div>
          {hasMore && !unfolded && (
            <span className="mt-unit-3 inline-block text-sm">
              <button
                className="underline"
                onClick={() => showMore(id)}
                aria-label="Show more"
              >
                Show more
              </button>
            </span>
          )}
        </>
      )}
    </div>
  )
}
