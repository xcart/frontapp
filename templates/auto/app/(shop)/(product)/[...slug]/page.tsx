import {Suspense} from 'react'
import {notFound} from 'next/navigation'
import {getXCartClient} from 'app/client'
import getInitCart from '~/components/cart/functions/getInitCart'
import PageContent from '~/components/global/PageContent'
import {ProductsGridSkeleton} from '~/components/global/skeleton/ProductsGridSkeleton'
import {getStoredSelectedVehicle} from '~/components/mmy/functions/getStoredSelectedVehicle'
import {RelatedProducts} from '~/components/product/RelatedProducts'
import {ProductPage} from './ProductPage'

function RelatedProductsSkeleton() {
  return (
    <>
      <div className="skeleton skeleton-row w-[74.5%]" />
      <ProductsGridSkeleton count={4} />
    </>
  )
}

async function fetchData(slug: string) {
  const client = await getXCartClient()

  const product = await client.product.getDetailedProductByCleanURL(slug)

  return product
}

export async function generateMetadata({params: {slug}}: any) {
  const product = await fetchData(slug.at(-1))

  return {
    title: product.name,
  }
}

export default async function Page({params: {slug}}: any) {
  const [cart, product] = await Promise.all([
    await getInitCart(),
    fetchData(slug.at(-1)),
  ])

  if (!product.id) {
    notFound()
  }

  return (
    <PageContent>
      <ProductPage
        product={product}
        initCart={cart}
        initSelectedVehicle={getStoredSelectedVehicle()}
      />
      <Suspense fallback={<RelatedProductsSkeleton />}>
        {/* @ts-expect-error Server Component */}
        <RelatedProducts productId={product.id} />
      </Suspense>
    </PageContent>
  )
}
