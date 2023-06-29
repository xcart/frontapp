import {notFound} from 'next/navigation'
import PageContent from '~/components/global/PageContent'
import {ProductsList} from '~/components/products/ProductsList'
import {getSortedPaginatedProducts} from '../../../../utils/get-sorted-paginated-products'
import {getXCartClient} from '../../../client'

async function fetchBrandData(slug: string) {
  const client = await getXCartClient()

  const brand = await client.other.getByCleanURLBrandDetailedItem(slug)

  return brand
}

export async function generateMetadata({params: {slug}}: any) {
  const brand = await fetchBrandData(slug.at(-1))

  return {
    title: brand.name,
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {slug: any}
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const brand = await fetchBrandData(params.slug.at(-1))

  if (!brand.id) {
    return notFound()
  }

  const pageParams = {
    searchParams: searchParams ?? {},
    filter: {'filter.brandId': brand.id},
  }

  const {page, lastPage, total, products} = await getSortedPaginatedProducts(
    pageParams,
  )

  return (
    <>
      <PageContent pageTitle={brand.name}>
        {brand.description && (
          <div
            className="mb-unit-8"
            dangerouslySetInnerHTML={{__html: brand.description}}
          />
        )}
        {products && (
          <ProductsList
            page={page}
            products={products}
            lastPage={lastPage}
            params={pageParams}
            total={total}
          />
        )}
      </PageContent>
    </>
  )
}
