import {client} from 'utils/unauthenticated-client'
import PageContent from '~/components/global/PageContent'
import {VehiclePageTitle} from '~/components/mmy/VehiclePageTitle'
import {ProductsList} from '~/components/products/ProductsList'
import {getSortedPaginatedProducts} from '../../../../utils/get-sorted-paginated-products'

async function getSelectedMMYFromPath({params}: {params: string[]}) {
  let selectedLevelId: number | undefined

  let depthCounter = 1

  async function getNextLevel() {
    if (depthCounter <= params.length) {
      const levels = await client.mmy.getMMYLevel(
        String(depthCounter),
        depthCounter === 1 ? {} : {'filter.parent': selectedLevelId},
      )

      const currentLevel = levels['hydra:member'].find(
        item => item.name === params[depthCounter - 1].replaceAll('__', ' '),
      )

      if (currentLevel) {
        selectedLevelId = currentLevel.id as number
      }

      depthCounter += 1
      await getNextLevel()
    }
  }

  if (depthCounter < params.length) {
    await getNextLevel()
  }

  return depthCounter - 1 === params.length && selectedLevelId
    ? selectedLevelId
    : null
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {slug: any}
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const name = params.slug.join(' ').replaceAll('__', ' ')

  const selectedLevelId = await getSelectedMMYFromPath({params: params.slug})

  const pageParams = {
    searchParams: searchParams ?? {},
    filter: selectedLevelId ? {'filter.levelId': selectedLevelId} : undefined,
  }

  const {page, products, total, lastPage} = await getSortedPaginatedProducts(
    pageParams,
  )

  return (
    <PageContent>
      <VehiclePageTitle title={name} total={total} />
      <ProductsList
        page={page}
        products={products}
        total={total}
        lastPage={lastPage}
        params={pageParams}
      />
    </PageContent>
  )
}
