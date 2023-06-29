'use client'

import {SetStateAction, useEffect} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {IconSolidArrow} from '~/components/elements/Icons'
import {SelectBase} from '~/components/elements/Select'

export const SortingOptions = [
  {name: 'Recommended', value: 'default'},
  {name: 'Newest first', value: 'arrivalDate-desc'},
  {name: 'Price Low - High', value: 'price-asc'},
  {name: 'Price High - Low', value: 'price-desc'},
  {name: 'Name A - Z', value: 'name-asc'},
  {name: 'Name Z - A', value: 'name-desc'},
  {name: 'Sales', value: 'sales-desc'},
]

function Label({children}: any) {
  return (
    <>
      <span className="font-medium text-gray-700">
        Sort by: <span className="text-primary">{children}</span>
      </span>
      <IconSolidArrow className="ml-[2.5px] mb-[2px]" />
    </>
  )
}

export function SortingSelector({
  initialValue,
  setIsFetching,
  params,
}: {
  initialValue: string
  setIsFetching?: (value: boolean) => void
  params?: any
}) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (setIsFetching) {
      setIsFetching(false)
    }
  }, [params, setIsFetching])

  const url = (sorting: string) => {
    const searchParams = new URLSearchParams()

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.map(v => searchParams.append(key, String(v)))
      } else {
        searchParams.set(key, String(value))
      }
    }

    if (sorting !== 'default') {
      searchParams.set('sort', sorting)
    } else {
      searchParams.delete('sort')
    }

    return `${pathname}?${searchParams.toString()}`
  }

  const handleChange = (value: SetStateAction<any>) => {
    router.push(url(value.value))
    if (setIsFetching) {
      setIsFetching(true)
    }
  }

  return (
    <SelectBase
      wrapper="span"
      tag="span"
      label={Label}
      defaultValue={params?.sort || initialValue}
      options={SortingOptions}
      optionClasses="text-sm py-unit-2 px-unit-4 whitespace-nowrap hover:bg-gray-300"
      handleChange={handleChange}
    />
  )
}
