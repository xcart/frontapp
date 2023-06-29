import {ReadonlyURLSearchParams} from 'next/navigation'

export function getUpdatedSearchParams(
  searchParams: ReadonlyURLSearchParams | null,
  tag: string,
) {
  const newSearchParams = new URLSearchParams()

  if (searchParams?.toString()) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of searchParams.entries()) {
      if (Array.isArray(value)) {
        value.map(v => newSearchParams.append(key, String(v)))
      } else {
        newSearchParams.set(key, String(value))
      }
    }
  }

  if (tag === '') {
    newSearchParams.delete('tag')
  } else {
    newSearchParams.set('tag', tag)
  }

  return newSearchParams
}
