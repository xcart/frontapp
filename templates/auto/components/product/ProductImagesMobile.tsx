'use client'

import {ProductImage} from '@xcart/storefront'
import Image from 'next/image'
import {Carousel} from '~/components/product/Carousel'
import {WishlistButton} from '~/components/wishlist/WishlistButton'
import {IMAGES} from '~/constants'

export function ProductImagesMobile({
  images,
  productId,
}: {
  images: ProductImage[]
  productId: number
}) {
  return (
    <div className="relative max-w-full overflow-hidden lg:hidden">
      <WishlistButton
        buttonClasses="top-unit-2 right-unit-2"
        productId={productId}
      />
      {images.length > 1 ? (
        <Carousel>
          {images.map((image, index) => {
            const imageKey = `image-${index}`
            return (
              <Image
                src={image.url as string}
                alt={image.alt as string}
                width={IMAGES.productList.width}
                height={IMAGES.productList.height}
                key={imageKey}
                className="w-full"
                priority={index === 0}
              />
            )
          })}
        </Carousel>
      ) : (
        <div className="bg-gray-300">
          <Image
            src={images[0].url as string}
            alt={images[0].alt as string}
            width={IMAGES.productList.width}
            height={IMAGES.productList.height}
            key="image-0"
            className="w-full"
            priority
          />
        </div>
      )}
    </div>
  )
}
