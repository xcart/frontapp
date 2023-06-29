import {getSortedPaginatedProducts} from 'utils/get-sorted-paginated-products'
import PageContent from '~/components/global/PageContent'
import {TopBanner} from '~/components/global/TopBanner'
import {ProductsList} from '~/components/products/ProductsList'
import recentArrivalsBanner from '../../../public/recent_arrivals.jpeg'

export async function generateMetadata() {
  return {
    title: 'Resent Arrivals',
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const pageParams = {
    searchParams: searchParams ?? {},
    filter: {'filter.newArrivals': true},
  }

  const {page, products, total, lastPage} = await getSortedPaginatedProducts(
    pageParams,
  )

  return (
    <>
      {recentArrivalsBanner?.src?.length > 0 && (
        <TopBanner
          image={recentArrivalsBanner}
          alt="Recent Arrivals"
          additionalClasses="mb-0"
        />
      )}
      <PageContent pageTitle="Recent Arrivals">
        <ProductsList
          page={page}
          products={products}
          total={total}
          lastPage={lastPage}
          params={pageParams}
        />
      </PageContent>
    </>
  )
}
