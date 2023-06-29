import {Product} from '@xcart/storefront'
import {ButtonWithSpinner} from '~/components/elements/Button'
import {Section} from '~/components/elements/Section'
import {ProductsGrid} from '~/components/products/ProductsGrid'

export function ProductsListWithLoader({
  products,
  gridClasses,
  hasNextPage,
  fetchNextPage,
  isFetching,
}: {
  products: Product[]
  gridClasses?: string
  hasNextPage: boolean
  fetchNextPage: () => void
  isFetching: boolean
}) {
  return (
    <Section>
      <ProductsGrid products={products} gridClasses={gridClasses} />
      {hasNextPage && (
        <div className="mt-unit-8 text-center lg:mt-unit-12">
          <ButtonWithSpinner
            variant="secondary"
            onClick={() => fetchNextPage()}
            buttonTitle="Show More"
            showSpinner={isFetching}
          />
        </div>
      )}
    </Section>
  )
}
