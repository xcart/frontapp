import {notFound} from 'next/navigation'
import {getXCartClient} from 'app/client'
import {getSortedPaginatedProducts} from 'utils/get-sorted-paginated-products'
import {Section} from '~/components/elements/Section'
import PageContent from '~/components/global/PageContent'
import Subcategories from '~/components/global/Subcategories'
import {TopBanner} from '~/components/global/TopBanner'
import {ProductsGrid} from '~/components/products/ProductsGrid'
import {ProductsList} from '~/components/products/ProductsList'

async function getCategory(cleanUrl: string) {
  const client = await getXCartClient()

  const category = await client.category.getDetailedCategoryByCleanURL(cleanUrl)

  return {category}
}

export async function generateMetadata({params}: {params: {slug: any}}) {
  const cleanUrl = params.slug.join('/')

  const {category} = await getCategory(cleanUrl)

  return {
    title: category.name,
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {slug: any}
  searchParams?: {[key: string]: string | string[] | undefined}
}) {
  const client = await getXCartClient()

  const cleanUrl = params.slug.join('/')

  const {category} = await getCategory(cleanUrl)

  if (!category?.id) {
    notFound()
  }

  const categoryId = category.id as number
  const pageParams = {
    searchParams: searchParams ?? {},
    categoryId,
  }

  const dataPromises: Array<Promise<any>> = [
    client.getFeaturedProducts({categoryId}),
    getSortedPaginatedProducts(pageParams),
  ]

  let categoryCleanUrl = cleanUrl

  if (category.hasSubcategories) {
    dataPromises.push(client.getSubcategories(categoryId))
  } else if (
    !category.hasSubcategories &&
    category.path &&
    category.path.length > 1
  ) {
    // eslint-disable-next-line no-restricted-syntax
    for (const path of category.path) {
      const index = category.path.indexOf(path)
      if (category.path && path.cleanUrl === category.cleanUrl) {
        categoryCleanUrl = category.cleanUrl?.length
          ? // eslint-disable-next-line no-unsafe-optional-chaining
            cleanUrl.slice(0, -(category.cleanUrl?.length + 1))
          : category.path[index - 1].cleanUrl

        dataPromises.push(
          client.getSubcategories(Number(category.path[index - 1].id)),
        )
      }
    }
  }

  const [featured, {page, products, total, lastPage}, subcategories] =
    await Promise.all(dataPromises)

  return (
    <>
      {category.banner && (
        <TopBanner image={category.banner} alt={category.name} />
      )}
      <PageContent
        pageTitle={category.showTitle ? category.name : undefined}
        hasSubcategories={category.hasSubcategories}
        topPadding={!category.banner}
      >
        {subcategories && categoryCleanUrl && (
          <Subcategories
            items={subcategories}
            categoryCleanUrl={categoryCleanUrl}
            currentPath={cleanUrl}
          />
        )}
        <div>
          {products && products.length > 0 && (
            <ProductsList
              page={page}
              products={products}
              total={total}
              lastPage={lastPage}
              params={pageParams}
            />
          )}
          {featured && featured.length > 0 && (
            <Section heading="Featured products">
              <ProductsGrid products={featured} />
            </Section>
          )}
        </div>
      </PageContent>
    </>
  )
}
