export const parseFilters = (searchParams?: {
  [key: string]: string | string[] | undefined
}) => {
  const filters: Record<string, Array<string>> = {}

  if (typeof searchParams !== 'undefined') {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(searchParams as object)) {
      if (key.startsWith('filter_')) {
        filters[key.replace('filter_', '')] =
          typeof value === 'string' ? [value] : value
      }
    }
  }

  return filters
}

export interface Params {
  searchParams: {[key: string]: string | string[] | undefined}
  perPage?: number
  categoryId?: number
  filter?: {[key: string]: boolean}
}

export function getBaseSearchParams({
  searchParams,
  perPage = 12,
  categoryId,
  filter,
}: Params) {
  const sorting = searchParams?.sort
    ? (() => {
        const mapping = new Map([
          ['arrivalDate', 'sort_int_arrival_date'],
          ['price', 'sort_float_price'],
          ['name', 'sort_str_name'],
          ['sales', 'sort_int_sales'],
        ])
        const [orderBy, direction] = (searchParams.sort as string).split('-')
        return mapping.has(orderBy)
          ? `${mapping.get(orderBy)} ${direction}`
          : null
      })()
    : null

  const conditions = filter
    ? (() => {
        const result = {type: []}
        const mapping = new Map([
          ['filter.participateSale', 'sale'],
          ['filter.bestsellers', 'bestseller'],
          ['filter.newArrivals', 'new'],
          ['filter.comingSoon', 'upcoming'],
        ])

        // eslint-disable-next-line no-restricted-syntax
        for (const f of Object.keys(filter)) {
          if (mapping.has(f)) {
            // @ts-ignore
            result.type.push(mapping.get(f))
          }
        }

        return result
      })()
    : {}

  const page = searchParams?.page ? Number(searchParams.page) : 1
  const filters = parseFilters(searchParams)
  return {
    q: searchParams?.q ? (searchParams.q as string) : '',
    offset: (page - 1) * perPage,
    sort: sorting,
    limits: {
      products: perPage,
      categories: 0,
      manufacturers: 0,
      pages: 0,
    },
    categoryId: categoryId ?? null,
    filters,
    conditions,
  }
}
