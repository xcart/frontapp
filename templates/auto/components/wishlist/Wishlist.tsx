'use client'

import {useQuery} from '@tanstack/react-query'
import {Product} from '@xcart/storefront'
import {useAtomValue} from 'jotai'
import {getClient} from 'lib/getClient'
import {Button} from '~/components/elements/Button'
import {useDrawer} from '~/components/elements/Drawer'
import {ProductsGridSkeleton} from '~/components/global/skeleton/ProductsGridSkeleton'
import {ProductsGrid} from '~/components/products/ProductsGrid'
import {wishlistItems} from '~/components/wishlist/store'

async function fetchWishlistProducts(productIds: number[]) {
  if (!productIds.length) {
    return false
  }

  const client = await getClient()

  const products = await client.getProductsByIds({
    productIds: productIds.toString(),
  })

  return products
}

export function Wishlist() {
  const wishlistIds = useAtomValue(wishlistItems)
  const drawer = useDrawer()

  const filtered = wishlistIds.filter(
    id => id !== null && typeof id !== 'undefined',
  )

  const {data, isFetching} = useQuery(['wishlist', filtered], () =>
    fetchWishlistProducts(filtered),
  )

  const wishlistProducts: Product[] = data || []

  const renderWishlistProducts = () => {
    return isFetching ? (
      <ProductsGridSkeleton
        gridClasses="md:grid-cols-2 lg:grid-cols-2 lg:gap-y-unit-8"
        count={wishlistIds.length}
      />
    ) : (
      <ProductsGrid
        gridClasses="md:grid-cols-2 lg:grid-cols-2 lg:gap-y-unit-8"
        products={wishlistProducts}
        isDrawer
      />
    )
  }

  return (wishlistIds.length && wishlistProducts && wishlistProducts.length) ||
    isFetching ? (
    renderWishlistProducts()
  ) : (
    <div>
      <p>Keep an eye on products you like by adding them to your wishlist.</p>
      <Button
        buttonTitle="Continue Shopping"
        className="mt-unit-4 w-full"
        onClick={() => drawer.setOpen(false)}
      />
    </div>
  )
}
