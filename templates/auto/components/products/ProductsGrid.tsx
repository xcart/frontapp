import {ForwardedRef, forwardRef} from 'react'
import type {Product} from '@xcart/storefront'
import {Grid} from '~/components/elements/Grid'
import {ProductCardGrid} from './ProductCardGrid'

export const ProductsGrid = forwardRef(
  (
    {
      products,
      gridClasses,
      isFetching,
      isDrawer,
    }: {
      products: Product[]
      gridClasses?: string
      isFetching?: boolean
      isDrawer?: boolean
    },
    forwardedRef: ForwardedRef<HTMLElement>,
  ) => {
    return (
      <Grid layout="products" gridClasses={gridClasses} ref={forwardedRef}>
        {products.map(product => (
          <ProductCardGrid
            product={product}
            isFetching={isFetching}
            key={product.id}
            isDrawer={isDrawer}
          />
        ))}
      </Grid>
    )
  },
)
