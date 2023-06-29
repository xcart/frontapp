import {useSetAtom} from 'jotai'
import {Checkbox} from '~/components/elements/Checkbox'
import {
  Facet,
  toggleFilterValueAtom,
  reloadFacetsAtom,
  showMoreAtom,
  FacetValue,
} from '../../store'

export const contractedValueLimit = 10

type PlainValueProps = {
  value: string
  caption: string
  count: number
  id: string
  selected: boolean
}

function PlainValue({
  value,
  caption,
  count,
  id,
  selected = false,
}: PlainValueProps) {
  const toggleFilterValue = useSetAtom(toggleFilterValueAtom)
  const reloadFacets = useSetAtom(reloadFacetsAtom)

  const change = () => {
    toggleFilterValue({facetId: id, value})
    reloadFacets()
  }

  return (
    <Checkbox
      label={
        <>
          <span>{caption}</span>
          {!!count && (
            <>
              {' '}
              <span className="text-gray-700">({count})</span>
            </>
          )}
        </>
      }
      checked={selected}
      onChange={change}
    />
  )
}

export function RefinementList({
  facet: {id, name, counts, unfolded, expanded},
}: {
  facet: Facet
}) {
  const showMore = useSetAtom(showMoreAtom)

  const valueMapper = ({value, count, selected}: FacetValue) => {
    return (
      <PlainValue
        key={value as string}
        id={id}
        value={value as string}
        caption={value as string}
        count={count}
        selected={selected}
      />
    )
  }

  return (
    <div>
      <div className="mb-unit-3 text-sm font-medium md:text-base">{name}</div>

      {expanded && (
        <div className="flex flex-col gap-unit-2">
          {counts.length > contractedValueLimit + 1 && !unfolded ? (
            <>
              {counts.slice(0, contractedValueLimit).map(valueMapper)}

              <span className="mt-[5px] inline-block text-sm">
                <button
                  className="underline"
                  onClick={() => showMore(id)}
                  aria-label="Show more"
                >
                  Show more
                </button>
              </span>
            </>
          ) : (
            counts.map(valueMapper)
          )}
        </div>
      )}
    </div>
  )
}
