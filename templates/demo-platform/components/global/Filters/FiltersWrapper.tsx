import {getBaseSearchParams, Params} from 'utils/cloud-search/helpers'
import * as CloudSearch from './api'
import {Filters} from './Components/Filters'

export async function FiltersWrapper({params}: {params: Params}) {
  const defaultParams = getBaseSearchParams(params)

  const response = await CloudSearch.requestWithJson('', {
    ...defaultParams,
    facet: true,
    limits: {
      products: 0,
      categories: 0,
      manufacturers: 0,
      pages: 0,
    },
  })

  if (response && typeof response.stats === 'undefined') {
    return null
  }

  return (
    <Filters
      facets={Object.values(response?.facets ?? {})}
      priceRange={response?.stats.price}
    />
  )
}
