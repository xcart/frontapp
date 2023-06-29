import {Grid} from '~/components/elements/Grid'
import {ProductSkeleton} from '~/components/global/skeleton/ProductSkeleton'

export function ProductsGridSkeleton({
  count = 9,
  gridClasses,
}: {
  count?: number
  gridClasses?: string
}) {
  return (
    <Grid layout="products" gridClasses={gridClasses}>
      {[...Array(count)].map((item, index) => {
        const itemKey = `${item}-${index}`
        return <ProductSkeleton key={itemKey} />
      })}
    </Grid>
  )
}
