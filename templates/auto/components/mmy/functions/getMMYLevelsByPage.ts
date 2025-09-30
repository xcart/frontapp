import {Client, MMYLevel} from '@xcart/storefront'

export async function getMMYLevelsByPage({
  client,
  depth,
  parentId,
}: {
  client: Client
  depth: string
  parentId?: number
}) {
  let allRootLevelItemsByPage: MMYLevel[] = []
  const initLevelPage = await client.mmy.getMMYLevel(depth, {
    itemsPerPage: 100,
    ...(parentId ? {'filter.parent': parentId} : null),
  })

  if (
    initLevelPage['hydra:totalItems'] &&
    initLevelPage['hydra:member'].length !== initLevelPage['hydra:totalItems']
  ) {
    const count = Math.ceil(
      initLevelPage['hydra:totalItems'] / initLevelPage['hydra:member'].length,
    )

    allRootLevelItemsByPage = [
      ...allRootLevelItemsByPage,
      ...initLevelPage['hydra:member'],
    ]

    // eslint-disable-next-line no-plusplus
    for (let i = 2; i <= count; i++) {
      // eslint-disable-next-line no-await-in-loop
      const levelItemsByPage = await client.mmy.getMMYLevel('1', {
        page: i,
        itemsPerPage: 100,
      })

      // eslint-disable-next-line no-restricted-syntax
      for (const lvl of levelItemsByPage['hydra:member']) {
        allRootLevelItemsByPage.push(lvl)
      }
    }

    return allRootLevelItemsByPage
  }

  return initLevelPage['hydra:member']
}
