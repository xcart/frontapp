'use client'

import {useAtomValue} from 'jotai'
import {useHydrateAtoms} from 'jotai/utils'
import {Filter} from './Filter'
import {facetsAtom, getFacets, priceRangeAtom} from '../store'

export function Filters(props: any) {
  useHydrateAtoms([
    [facetsAtom, props?.facets],
    [priceRangeAtom, props?.priceRange],
  ])

  const facets = useAtomValue(getFacets)

  return (
    <>
      {facets
        ? facets.map(facet => <Filter key={facet.id} facet={facet} />)
        : null}
    </>
  )
}
