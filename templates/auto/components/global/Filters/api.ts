const config = {
  apiKey: process.env.NEXT_PUBLIC_CLOUD_SEARCH_API_KEY,
  apiUrl: process.env.NEXT_PUBLIC_CLOUD_SEARCH_API_URL,
  requestData: {
    lang: 'en',
    membership: null,
    conditions: {
      availability: ['Y'],
      stock_status: ['in', 'low', 'backorder'],
    },
  },
}

type ApiCategoryPath = {
  id: number
  name: string
}

export type ApiCategoryFacetValue = {
  id: string
  path: Array<string>
  detailedPath: Array<ApiCategoryPath>
}

export interface ApiFacetValue {
  value: string | ApiCategoryFacetValue
  count: number
}

export interface ApiFacet {
  id: string
  name: string
  type: 'category' | 'price' | 'default'
  counts: Array<ApiFacetValue>
  expanded: boolean
}

export type ApiFilters = Record<string, Array<string | number>>

export interface ApiRequest {
  q?: string
  idsOnly?: boolean
  categoryId?: number | null
  offset?: number
  limits?: Record<'products' | 'categories' | 'pages' | 'manufacturers', number>
  facet?: boolean
  filters?: ApiFilters
  sort?: string | null
  lang?: string
  membership?: number | null
  conditions?:
    | Record<'availability' | 'stock_status' | 'type', Array<string>>
    | {}
}

export interface ApiResponse {
  products: Record<'id', number>[]
  numFoundProducts: number
  facets?: any
  stats?: any
  haveMoreResults?: boolean
}

const getRequestUrl = () => {
  const {apiKey, apiUrl} = config

  if (apiKey) {
    return `${apiUrl}?apiKey=${apiKey}`
  }

  throw new Error('apiKey not configured in CloudSearch config')
}

const getRequestData = (query: string, requestData: ApiRequest) => {
  const {requestData: defRequestData} = config

  const conditions = {
    ...defRequestData.conditions,
    ...(requestData.conditions ?? {}),
  }

  return {
    q: query,
    ...defRequestData,
    ...requestData,
    conditions,
  }
}

export const requestWithJson = async (
  query: string,
  requestData: ApiRequest = {},
  options: RequestInit = {},
) => {
  let url
  try {
    url = getRequestUrl()
  } catch (e) {
    return null
  }

  const data = getRequestData(query, requestData)

  let result: ApiResponse | undefined

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    })
    result = await response.json()
  } catch (e: any) {
    if (e.name !== 'AbortError') {
      // eslint-disable-next-line no-console
      console.log(e.name)
    }
  }

  return result
}

let controller: AbortController

export const fetchFacets = async (query: string, requestData: ApiRequest) => {
  if (controller) {
    controller.abort()
  }

  controller = new AbortController()

  return requestWithJson(
    query,
    {
      facet: true,
      limits: {
        products: 0,
        categories: 0,
        manufacturers: 0,
        pages: 0,
      },
      ...requestData,
    },
    {
      signal: controller.signal,
    },
  )
}

export const search = async (query: string, requestData: ApiRequest = {}) => {
  if (controller) {
    controller.abort()
  }

  controller = new AbortController()

  return requestWithJson(query, requestData, {
    signal: controller.signal,
  })
}
