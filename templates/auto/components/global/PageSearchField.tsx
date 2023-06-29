'use client'

import {useEffect, useState} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {SearchField} from '~/components/elements/SearchField'

export function PageSearchField({
  substring,
  params,
}: {
  substring?: string
  params?: {[key: string]: string | string[] | undefined}
}) {
  const [value, setValue] = useState<string | undefined>(substring)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const searchParams = new URLSearchParams()

    if (params) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, val] of Object.entries(params)) {
        if (Array.isArray(val)) {
          val.map(v => searchParams.append(key, String(v)))
        } else {
          searchParams.set(key, String(val))
        }
      }
    }

    if (value && value.length >= 0) {
      searchParams.set('substring', String(value))
    } else if (value === '') {
      searchParams.delete('substring')
    }

    return router.push(`${pathname}?${searchParams.toString()}`)
  }, [params, pathname, router, value])

  return (
    <div className="mb-unit-8">
      <SearchField value={value} changeHandler={setValue} />
    </div>
  )
}
