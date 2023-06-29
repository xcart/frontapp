import PageContent from '~/components/global/PageContent'
import {VehiclePageTitle} from '~/components/mmy/VehiclePageTitle'
import {ProductsList} from '~/components/products/ProductsList'
import {getSortedPaginatedProducts} from '../../../../utils/get-sorted-paginated-products'

export default async function Page({
  params,
  searchParams,
}: {
  params: {slug: any}
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const name = params.slug.join(' ').replaceAll('__', ' ')

  const pageParams = {
    searchParams: searchParams ?? {},
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
