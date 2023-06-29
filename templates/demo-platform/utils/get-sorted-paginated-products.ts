import {getXCartClient} from 'app/client'
import {CacheParams} from '~/constants'
import {search} from './cloud-search/search'

export const getSortedPaginatedProducts = async ({
  searchParams,
  perPage = 12,
  categoryId,
  filter,
  requestOptions,
}: {
  searchParams: any
  perPage?: number
  categoryId?: number
  filter?: {[key: string]: boolean}
  requestOptions?: CacheParams
}) => {
  const page = Number(searchParams?.page ?? 1)

  const {data, error} = await search({
    searchParams,
    perPage,
    categoryId,
    filter,
  })

  if (!error && data !== null) {
    return {page, ...data}
    // eslint-disable-next-line no-else-return
  } else {
    const sorting = searchParams?.sort
      ? (() => {
          const [orderBy, direction] = (searchParams.sort as string).split('-')
          return {[`order_by.${orderBy}`]: direction}
        })()
      : {}

    const client = await getXCartClient()

    const response = await client.getPaginatedProducts(
      {
        itemsPerPage: perPage,
        page,
        ...filter,
        ...(categoryId ? {'filter.categories': String(categoryId)} : {}),
        ...(searchParams?.q
          ? {'filter.substring': String(searchParams?.q)}
          : {}),
        ...sorting,
      },
      {...requestOptions},
    )

    return {
      page,
      ...response,
    }
  }
}
