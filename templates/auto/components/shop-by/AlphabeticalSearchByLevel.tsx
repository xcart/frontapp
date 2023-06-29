import {AlphabeticalSearch} from '~/components/elements/AlphabeticalSearch'
import {getLevelsFirstLetters} from '~/components/shop-by/functions/getLevelsFirstLetters'
import {getXCartClient} from '../../app/client'

export async function AlphabeticalSearchByLevel({
  depth,
  parentId,
  searchParams,
}: {
  depth: string
  parentId?: string
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const client = await getXCartClient()

  const firstLetter = (searchParams?.firstLetter as string) || undefined

  const levelItems = await client.mmy.getMMYLevel(String(depth), {
    ...(parentId ? {'filter.parent': Number(parentId)} : null),
  })

  let levelsFirstLetters: (string | undefined)[] = []

  if (levelItems && levelItems['hydra:member']) {
    levelsFirstLetters = getLevelsFirstLetters(levelItems['hydra:member'])
  }

  return (
    <AlphabeticalSearch
      firstLetter={firstLetter}
      itemsFirstLetters={levelsFirstLetters}
      params={searchParams}
    />
  )
}
