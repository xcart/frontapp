import {getXCartClient} from '../../../app/client'

export async function getShopByPaginatedLevelItems(
  depth: string,
  page: number,
  perPage?: number,
  parentId?: string,
  firstLetter?: string,
  substring?: string,
) {
  const client = await getXCartClient()

  const data = await client.getMMYLevelsPaginated(String(depth), {
    page,
    ...(parentId ? {'filter.parent': Number(parentId)} : null),
    ...(firstLetter ? {'filter.firstLetter': firstLetter} : null),
    ...(substring ? {'filter.substring': substring} : null),
    ...(perPage ? {itemsPerPage: perPage} : null),
  })

  return data
}
