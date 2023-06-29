import {getSortedPaginatedProducts} from 'utils/get-sorted-paginated-products'
import {Section} from '~/components/elements/Section'
import PageContent from '~/components/global/PageContent'
import {ProductsList} from '~/components/products/ProductsList'

export async function generateMetadata() {
  return {
    title: 'Search results',
  }
}

export default async function Search({
  searchParams,
}: {
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const pageParams = {
    searchParams: searchParams ?? {},
  }

  const {page, products, total, lastPage} = await getSortedPaginatedProducts(
    pageParams,
  )

  const searchSubstring = searchParams?.q ? ` for “${searchParams?.q}”` : ''

  return (
    <PageContent
      pageTitle={`Search Results${searchSubstring}`}
      titleDetails={total && total > 0 ? `(${total})` : undefined}
      noItems={total === 0}
    >
      {total === 0 ? (
        <Section>No items found.</Section>
      ) : (
        <ProductsList
          page={page}
          products={products}
          total={total}
          lastPage={lastPage}
          params={pageParams}
        />
      )}
    </PageContent>
  )
}
