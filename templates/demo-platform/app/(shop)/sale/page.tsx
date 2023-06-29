import {getSortedPaginatedProducts} from 'utils/get-sorted-paginated-products'
import PageContent from '~/components/global/PageContent'
import {ProductsList} from '~/components/products/ProductsList'

export async function generateMetadata() {
  return {
    title: 'Sale',
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const pageParams = {
    searchParams: searchParams ?? {},
    filter: {'filter.participateSale': true},
  }

  const {page, products, total, lastPage} = await getSortedPaginatedProducts(
    pageParams,
  )

  return (
    <PageContent pageTitle="On Sale">
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
