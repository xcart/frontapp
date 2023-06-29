'use client'

import {useAtomValue, useSetAtom} from 'jotai'
import {SecondaryAction} from '~/components/elements/Drawer'
import {useApplyFilters} from '../hooks/use-apply-filters'
import {
  resetFiltersAtom,
  reloadFacetsAtom,
  numFiltersAppliedAtom,
  numFiltersSelectedAtom,
} from '../store'

export function Reset({withDelimiter = false}: {withDelimiter?: boolean}) {
  const resetFilters = useSetAtom(resetFiltersAtom)
  const reloadFacets = useSetAtom(reloadFacetsAtom)
  const setNumFiltersApplied = useSetAtom(numFiltersAppliedAtom)
  const numFiltersSelected = useAtomValue(numFiltersSelectedAtom)
  const applyFilters = useApplyFilters()

  function handleReset() {
    setNumFiltersApplied(0)
    resetFilters()
    reloadFacets()
    applyFilters({})
  }
  return (
    <SecondaryAction
      withDelimiter={withDelimiter}
      handleAction={() => handleReset()}
      count={numFiltersSelected}
      aria-label="Reset"
    >
      Reset
    </SecondaryAction>
  )
}
