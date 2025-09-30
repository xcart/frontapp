import {AlphabeticalSearch} from '~/components/elements/AlphabeticalSearch'
import {getMMYLevelsByPage} from '~/components/mmy/functions/getMMYLevelsByPage'
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

  const levelItems = await getMMYLevelsByPage({
    client,
    depth,
    parentId: Number(parentId) || undefined,
  })

  let levelsFirstLetters: (string | undefined)[] = []

  if (levelItems && levelItems.length) {
    levelsFirstLetters = getLevelsFirstLetters(levelItems)
  }

  return (
    <AlphabeticalSearch
      firstLetter={firstLetter}
      itemsFirstLetters={levelsFirstLetters}
      params={searchParams}
    />
  )
}
