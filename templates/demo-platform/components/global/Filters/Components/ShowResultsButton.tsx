'use client'

import {useAtomValue, useSetAtom} from 'jotai'
import {Button} from '~/components/elements/Button'
import {useDrawer} from '~/components/elements/Drawer'
import {useApplyFilters} from '../hooks/use-apply-filters'
import {
  dirtyAtom,
  filtersAtom,
  numFiltersAppliedAtom,
  numFoundAtom,
} from '../store'

export function ShowResultsButton() {
  const numFound = useAtomValue(numFoundAtom)
  const filters = useAtomValue(filtersAtom)
  const dirty = useAtomValue(dirtyAtom)
  const setNumFiltersApplied = useSetAtom(numFiltersAppliedAtom)
  const applyFilters = useApplyFilters()

  const {setOpen} = useDrawer()

  return (
    <Button
      variant="secondary"
      className="w-full"
      onClick={() => {
        applyFilters(filters)
        setNumFiltersApplied(Object.keys(filters).length)
        setOpen(false)
      }}
      disabled={!dirty}
      aria-label={`Show Results${
        numFound !== null && dirty ? ` (${numFound})` : ''
      }`}
    >
      {`Show Results${numFound !== null && dirty ? ` (${numFound})` : ''}`}
    </Button>
  )
}
