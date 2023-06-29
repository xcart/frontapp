import {PaginatedProducts} from '@xcart/storefront'
import {getXCartClient} from 'app/client'
import {requestWithJson} from '~/components/global/Filters/api'
import {getBaseSearchParams} from './helpers'

interface SearchResponse {
  data: PaginatedProducts | null
  error: boolean
}

export async function search({
  searchParams,
  perPage = 12,
  categoryId,
  filter,
}: {
  searchParams: any
  perPage?: number
  categoryId?: number
  filter?: {[key: string]: boolean | number}
}): Promise<SearchResponse> {
  const params = getBaseSearchParams({
    searchParams,
    perPage,
    categoryId,
    filter,
  })

  const response = await requestWithJson('', {
    ...params,
    idsOnly: true,
    facet: false,
  })

  if (response && typeof response.products !== 'undefined') {
    if (response.products.length === 0) {
      return {
        data: {
          products: [],
          total: undefined,
          lastPage: 1,
          nextPage: undefined,
        },
        error: false,
      }
    }

    const pids = response.products.map(p => p.id)
    const client = await getXCartClient()
    const {products, nextPage} = await client.getPaginatedProducts({
      'filter.products': pids.join(','),
    })
    const total = response.numFoundProducts
    const lastPage = Math.ceil(total / perPage)

    return {data: {products, total, lastPage, nextPage}, error: false}
  }

  return {data: null, error: true}
}
