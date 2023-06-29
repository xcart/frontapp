import {AlphabeticalSearch} from '~/components/elements/AlphabeticalSearch'
import {getXCartClient} from '../../app/client'

export async function AlphabeticalSearchByBrand({
  searchParams,
}: {
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const client = await getXCartClient()

  const firstLetter = (searchParams?.firstLetter as string) || undefined

  const brands = await client.other.getBrandCompactCollection()

  let brandsFirstLetters: (string | undefined)[] = []

  if (brands && brands['hydra:member']) {
    brandsFirstLetters = brands['hydra:member'].map(item =>
      item.name?.charAt(0).toUpperCase(),
    )
  }

  return (
    <AlphabeticalSearch
      firstLetter={firstLetter}
      itemsFirstLetters={brandsFirstLetters}
    />
  )
}
