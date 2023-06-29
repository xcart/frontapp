import {getSortedPaginatedProducts} from 'utils/get-sorted-paginated-products'
import PageContent from '~/components/global/PageContent'
import {TopBanner} from '~/components/global/TopBanner'
import {ProductsList} from '~/components/products/ProductsList'
import bestsellersBanner from '../../../public/bestsellers.jpeg'

export async function generateMetadata() {
  return {
    title: 'Bestsellers',
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const pageParams = {
    searchParams: searchParams ?? {},
    filter: {'filter.bestsellers': true},
  }

  const {page, products, total, lastPage} = await getSortedPaginatedProducts(
    pageParams,
  )

  return (
    <>
      {bestsellersBanner?.src?.length > 0 && (
        <TopBanner
          image={bestsellersBanner}
          alt="Bestsellers"
          additionalClasses="mb-0"
        />
      )}
      <PageContent pageTitle="Bestsellers">
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
