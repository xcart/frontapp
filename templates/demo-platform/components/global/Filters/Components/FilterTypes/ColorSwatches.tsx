import {useEffect, useRef, useState} from 'react'
import {useSetAtom} from 'jotai'
import {ButtonBase} from '~/components/elements/Button'
import {tailwindMerge} from '~/helpers'
import {
  FilterValue,
  Facet,
  toggleFilterValueAtom,
  reloadFacetsAtom,
  showMoreAtom,
} from '../../store'

const colorMap = {
  Black: '#191B1F',
  Red: '#CB0000',
  White: '#FFFFFF',
  Grey: '#C4C2C2',
  Cedar: '#EF4F4F',
  Shimmer: '#F5C860',
  Blue: '#1E3877',
  Mint: '#C0E8CF',
  'Valerian Blue': '#047892',
  'Dark Beetroot': '#740B0B',
  'Golden Moss': '#C29B0B',
  'Medium Olive': '#B0B40D',
  'Team Red': '#CB0000',
  'Wolf Grey': '#C4C2C2',
  'Ale Brown': '#E1A803',
  'Gorge Green': '#357459',
  'Deep Royal Blue': '#1E3877',
  'Gym Red': '#E22937',
  'Pearl White': '#DED0B8',
  'Barely Rose': '#E4D7D6',
  'Total Orange': '#F96144',
  'Orange Trance': '#C26041',
  'Vivid Purple': '#79376B',
}

type ColorMap = typeof colorMap
type Color = keyof ColorMap

function ColorSwatch({
  value,
  selected,
}: {
  value: FilterValue
  selected: boolean
}) {
  const toggleFilterValue = useSetAtom(toggleFilterValueAtom)
  const reloadFacets = useSetAtom(reloadFacetsAtom)

  const change = () => {
    toggleFilterValue(value)
    reloadFacets()
  }

  const attributeClasses = selected ? 'border-primary' : 'border-gray-500'

  const color = Object.keys(colorMap).includes(value.value)
    ? colorMap[value.value as Color]
    : 'fff'

  return (
    <ButtonBase
      className={tailwindMerge(
        'relative h-unit-8 w-unit-8 rounded-full border border-gray-300 transition',
        attributeClasses,
      )}
      onClick={change}
      aria-label={color}
    >
      <div
        className={tailwindMerge(
          'absolute top-0 left-0 right-0 bottom-0 rounded-full',
        )}
        style={{backgroundColor: `${color}`}}
      />
      {selected && (
        <div className="relative h-full w-full rounded-full border border-primary">
          <div className="h-full w-full rounded-full border-2 border-contrast" />
        </div>
      )}
    </ButtonBase>
  )
}

export function ColorSwatches({
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
      <ColorSwatch
        key={value}
        value={{facetId: id, value}}
        selected={selected}
      />
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
