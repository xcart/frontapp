import {Suspense} from 'react'
import {Params} from 'utils/cloud-search/helpers'
import FiltersPane from './FiltersPane'
import {FiltersWrapper} from './FiltersWrapper'

export function FiltersDrawerWrapper({params}: {params: Params}) {
  if (!process.env.NEXT_PUBLIC_CLOUD_SEARCH_API_KEY) {
    return null
  }

  return (
    <FiltersPane params={params}>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <FiltersWrapper params={params} />
      </Suspense>
    </FiltersPane>
  )
}
