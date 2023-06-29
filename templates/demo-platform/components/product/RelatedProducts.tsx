import {getXCartClient} from 'app/client'
import {Section} from '~/components/elements/Section'
import {ProductsGrid} from '~/components/products/ProductsGrid'

export async function RelatedProducts({productId}: {productId: number}) {
  const client = await getXCartClient()

  const products = await client.getRelatedProducts({
    productId,
  })

  if (products.length === 0) {
    return null
  }

  return (
    <Section heading="Related products">
      <ProductsGrid products={products} />
    </Section>
  )
}
