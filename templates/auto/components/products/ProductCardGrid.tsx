import type {Product} from '@xcart/storefront'
import {ProductSkeleton} from '~/components/global/skeleton/ProductSkeleton'
import {DiscountedPrice} from '~/components/product/DiscountedPrice'
import {Label} from '~/components/product/Label'
import {WishlistButton} from '~/components/wishlist/WishlistButton'
import {ProductCard} from './ProductCard'
import {ProductCardTitle} from './ProductCardTitle'
import {ProductImage} from './ProductImage'

export function ProductCardGrid({
  product,
  isFetching,
  isDrawer,
}: {
  product: Product
  isFetching?: boolean
  isDrawer?: boolean
}) {
  return isFetching ? (
    <ProductSkeleton />
  ) : (
    <ProductCard productCardClasses="group relative">
      {product.id && (
        <WishlistButton productId={product.id} isDrawer={isDrawer} />
      )}
      <ProductImage
        product={product}
        imageClasses="relative p-[50%] mb-unit-2 bg-gray-300 overflow-hidden"
        hasLink
      />
      <Label
        productPrice={product.price}
        productSalePrice={product.salePrice}
      />
      <h3 className="mb-unit-2">
        <ProductCardTitle
          product={product}
          titleClasses="font-medium"
          linkClasses="no-underline group-hover:underline"
        />
      </h3>
      <DiscountedPrice
        productPrice={product.price}
        productSalePrice={product.salePrice}
        productMarketPrice={product.marketPrice}
        baseStyles="lg:text-lg lg:leading-base"
      />
    </ProductCard>
  )
}
