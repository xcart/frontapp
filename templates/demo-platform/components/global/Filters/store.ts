import {produce} from 'immer'
import {atom} from 'jotai'
import {getBaseSearchParams, Params} from 'utils/cloud-search/helpers'
import type {
  ApiFacet,
  ApiFacetValue,
  ApiCategoryFacetValue,
  ApiFilters,
} from './api'
import {fetchFacets} from './api'

// -------------
// types
// -------------

export interface FacetValue extends ApiFacetValue {
  selected: boolean
}

export interface Facet extends ApiFacet {
  unfolded: boolean
  counts: Array<FacetValue>
}

export interface FilterValue {
  facetId: string
  value: string
}

// -------------
// store
// -------------

export const paramsAtom = atom({})
export const facetsAtom = atom<Array<ApiFacet>>([])
export const priceRangeAtom = atom({min: null, max: null})
export const filtersAtom = atom<ApiFilters>({})
export const numFiltersAppliedAtom = atom<number>(0)
export const unfoldedAtom = atom<Set<string>>(new Set<string>())
export const numFoundAtom = atom<number | null>(null)
export const dirtyAtom = atom(false)

// -------------
// selectors
// -------------

export const getFacets = atom(get =>
  get(facetsAtom).map(facet => ({
    ...facet,
    unfolded: get(unfoldedAtom).has(facet.id),
    counts: facet.counts.map(count => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const selected = isFacetCountSelected(facet, count, get(filtersAtom))

      return {...count, selected}
    }),
  })),
)

export const numFiltersSelectedAtom = atom(
  get => Object.keys(get(filtersAtom)).length,
)

export const filterPricesAtom = atom(get => {
  const filters = get(filtersAtom)
  return {
    min: filters?.min_price?.[0] ?? '',
    max: filters?.max_price?.[0] ?? '',
  }
})

// -------------
// actions
// -------------

export const reloadFacetsAtom = atom(
  null,
  async (get, set, params: Object = {}) => {
    const pageParams = getBaseSearchParams(get(paramsAtom) as Params)
    const response = await fetchFacets('', {
      ...pageParams,
      filters: get(filtersAtom),
      ...params,
    })

    if (response) {
      set(numFoundAtom, response.numFoundProducts)
      set(facetsAtom, Object.values(response.facets))
      set(priceRangeAtom, response.stats.price)
    }
  },
)

export const toggleFilterValueAtom = atom(
  null,
  (get, set, {facetId, value}: FilterValue) => {
    set(
      filtersAtom,
      produce(get(filtersAtom), draft => {
        if (!draft[facetId]) {
          // eslint-disable-next-line no-param-reassign
          draft[facetId] = []
        }

        if (draft[facetId].indexOf(value) !== -1) {
          // eslint-disable-next-line no-param-reassign
          draft[facetId] = draft[facetId].filter(
            (v: string | number) => v !== value,
          )
        } else {
          draft[facetId].push(value)
        }

        if (draft[facetId].length === 0) {
          // eslint-disable-next-line no-param-reassign
          delete draft[facetId]
        }
      }),
    )
    set(dirtyAtom, true)
  },
)

export const updatePriceAtom = atom(
  null,
  (get, set, {facetId, value}: FilterValue) => {
    set(
      filtersAtom,
      produce(get(filtersAtom), draft => {
        const v = value.replace(/[^\d.]/g, '')
        if (v.length && !Number.isNaN(Number(v))) {
          // eslint-disable-next-line no-param-reassign
          draft[facetId] = [Number(v)]
        } else {
          // eslint-disable-next-line no-param-reassign
          delete draft[facetId]
        }
      }),
    )
    set(dirtyAtom, true)
  },
)

export const showMoreAtom = atom(null, (get, set, facetId: string) => {
  set(unfoldedAtom, structuredClone(get(unfoldedAtom)).add(facetId))
})

export const resetFiltersAtom = atom(null, (get, set) => {
  set(filtersAtom, {})
})

// -------------
// helpers
// -------------

const isFacetCountSelected = (
  facet: ApiFacet,
  facetCount: ApiFacetValue,
  filters: ApiFilters,
) => {
  const facetId = facet.id
  const value =
    facet.type === 'category'
      ? (facetCount.value as ApiCategoryFacetValue).id
      : (facetCount.value as string)

  return (
    // eslint-disable-next-line no-prototype-builtins
    filters.hasOwnProperty(facetId) && filters[facetId].indexOf(value) !== -1
  )
}
