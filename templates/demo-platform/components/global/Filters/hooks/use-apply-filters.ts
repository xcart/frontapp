import {useCallback} from 'react'
import {useSetAtom} from 'jotai'
import {useRouter, usePathname, useSearchParams} from 'next/navigation'
import {ApiFilters} from '../api'
import {dirtyAtom} from '../store'

export function useApplyFilters() {
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDirty = useCallback(useSetAtom(dirtyAtom), [])

  return useCallback(
    (filters: ApiFilters) => {
      const url = () => {
        // @ts-ignore
        const searchParams = new URLSearchParams(params)

        // Remove existing filters and reset current page
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Array.from(searchParams.keys())) {
          if (key.startsWith('filter_') || key === 'page') {
            searchParams.delete(key)
          }
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(filters)) {
          value.map(v => searchParams.append(`filter_${key}`, String(v)))
        }

        return `${pathname}?${searchParams.toString()}`
      }

      router.push(url())
      setDirty(false)
    },
    [router, params, pathname, setDirty],
  )
}
